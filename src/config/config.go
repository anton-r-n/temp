package config

// BuildDate hold date of the build
var BuildDate string

// BuildCommit holds commit hash of the build
var BuildCommit string

// BuildVersion holds app version of the build
var BuildVersion string

// Config provides values for application config
var Config = map[string]string{
	"http_addr":        ":3000",
	"mysql_dsn":        "webappuser:webapppwd@unix(/tmp/mysql.sock)/webappdb",
	"server_render_js": "static/utils.min.js.gz",
}
