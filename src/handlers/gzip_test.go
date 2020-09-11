package handlers

import (
	"testing"

	"net/http"
	"webapp/src/utils"
)

func exampleHandler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("example handler"))
}

func TestGzipWrapper(t *testing.T) {
	r, _ := http.NewRequest("GET", "/health-check", nil)
	r.Header.Set("Accept-Encoding", "gzip, deflate")
	w := utils.MockResponseWriter()
	gzipWrapper(exampleHandler)(w, r)
	encoding := w.Header().Get("Content-Encoding")
	if encoding != "gzip" {
		t.Error("Content-Encoding is not gzip")
	}
}
