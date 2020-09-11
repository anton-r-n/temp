BIN := ./bin
STATIC := ./static

SERVER := $(BIN)/webapp
SOURCE := $(shell find ./src -type f -name '*.go' -not -name '*_test.go')

APP_CSS := $(STATIC)/app.css
APP_CSS_GZ := $(STATIC)/app.css.gz
APP_CSS_FILES := $(shell find js/client -type f -name '*.css' | sort)

APP_JS := $(STATIC)/app.js
APP_JS_MIN := $(STATIC)/app.min.js
APP_JS_GZ := $(STATIC)/app.min.js.gz
APP_FILES := \
  $(shell find js/client -type f -name '*.js' -not -name '*_test.js' | sort)

UTILS_JS := $(STATIC)/utils.js
UTILS_JS_MIN := $(STATIC)/utils.min.js
UTILS_GZ := $(STATIC)/utils.min.js.gz
UTILS_FILES := \
  $(shell find js/utils -type f -name '*.js' -not -name '*_test.js' | sort)

TEST_JS := $(STATIC)/test.js
TEST_FILES := $(shell find js -type f -name '*_test.js' | sort)

BLOB := $(STATIC)/img
BLOB_FILES := $(shell find img -type f)

EMBED := utils/files.go

LD_FLAGS := -ldflags "\
  -X 'webapp/src/config.BuildCommit=$(shell git rev-list -1 HEAD)' \
  -X 'webapp/src/config.BuildDate=$(shell date)' \
  -X 'webapp/src/config.BuildVersion=0.0.1'"

all: $(SERVER) $(STATIC)

run: all
	$(SERVER)

$(SERVER): $(SOURCE) $(EMBED)
	go fmt ./... && mkdir -p $(@D) && go build $(LD_FLAGS) -o $@ ./src/main.go

$(STATIC): $(APP_JS_GZ) $(UTILS_GZ) $(TEST_JS) $(APP_CSS_GZ) $(BLOB)

$(APP_CSS): $(APP_CSS_FILES)
	mkdir -p $(@D) && cat $^ > $@

$(APP_CSS_GZ): $(APP_CSS)
	gzip -cn $^ > $@

$(APP_JS): $(APP_FILES)
	mkdir -p $(@D) && echo "'use strict';" > $@ && cat $^ >> $@

$(APP_JS_MIN): $(APP_JS)
	esbuild --minify --target=es5 --outfile=$@ $^

$(APP_JS_GZ): $(APP_JS_MIN)
	gzip -cn $^ > $@

$(UTILS_JS): $(UTILS_FILES) $(APP_FILES)
	echo "'use strict';" > $@ && cat $^ >> $@

$(UTILS_JS_MIN): $(UTILS_JS)
	esbuild --minify --target=es5 --outfile=$@ $^

$(UTILS_GZ): $(UTILS_JS_MIN)
	gzip -fk $^

$(TEST_JS): $(UTILS_FILES) $(APP_FILES) $(TEST_FILES)
	echo "'use strict';" > $@ && cat $^ >> $@ && echo 'this.runTests();' >> $@

$(BLOB): $(BLOB_FILES)
	mkdir -p $@ && cp -r img/* $@/

$(EMBED): $(APP_JS_GZ) $(UTILS_GZ) $(TEST_JS) $(APP_CSS_GZ) $(BLOB)
	go run utils/gen/main.go $(APP_JS_GZ) $(UTILS_GZ) $(APP_CSS_GZ) $(BLOB)

fmt: fmt_go fmt_js

fmt_go:
	go fmt ./...

fmt_js: $(APP_FILES) $(UTILS_FILES) $(TEST_FILES) $(APP_CSS_FILES)
	prettier --config js/.prettier.json --write $^

lint: $(APP_FILES) $(UTILS_FILES) $(TEST_FILES)
	eslint -c js/.eslint.json $^

test: test_js test_go

test_js: $(TEST_JS)
	time node $^ $(filter)

test_go:
	go test ./src/...

wc:
	@wc -l $(shell find js src sql -type f | sort)

clean:
	go clean
	go clean -testcache
	rm -rf $(BIN) $(STATIC) $(EMBED)

.PHONY: run fmt clean test lint test_go wc
