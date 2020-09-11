package handlers

import (
	"log"
	"strings"
	"sync"

	"compress/gzip"
	"io/ioutil"
	"rogchap.com/v8go"
	"webapp/src/config"
	"webapp/utils"
)

var render = func(path string) string {
	if path == "" {
		log.Println("-- err config value 'server_render_js' does not exist")
		return ""
	}

	fileSource := utils.Open(path)
	if fileSource == nil {
		log.Println("-- err file does not exist", path)
		return ""
	}

	fileReader, err := gzip.NewReader(fileSource)
	if err != nil {
		log.Println("-- gzip.NewReader err", err)
		return ""
	}

	fileContent, err := ioutil.ReadAll(fileReader)
	if err != nil {
		log.Println("-- ioutil.ReadAll err", err)
		return ""
	}

	commit := "\n$.commit = '" + config.BuildCommit + "';"

	return string(fileContent) + commit
}(config.Config["server_render_js"])

// var renderSource, _ = ioutil.ReadFile("static/utils.js")
// var render = string(renderSource)

// Default content to write in a case of an error
var fallbackHTML = []byte(strings.ReplaceAll(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>App title</title>
    <link rel="stylesheet" href="/static/###/app.css" />
    <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
  </head>
  <body>
    <script src="/static/###/app.js"></script>
    <script>$.app("")</script>
  </body>
</html>`, "###", config.BuildCommit))

// Init new sync pool of JS contexts
var jsPool = sync.Pool{New: newContext}

// New JS context with js code
func newContext() interface{} {
	if render == "" {
		return nil
	}

	// Init a new JS context within new VM
	ctx, err := v8go.NewContext(nil)
	if err != nil {
		log.Println("-- new ctx err", err)
		return nil
	}

	// Init JS code
	if _, err = ctx.RunScript(render, "render.js"); err != nil {
		log.Println("-- init script", err)
		return nil
	}
	return ctx
}

func html(data []byte) []byte {
	obj := jsPool.Get()
	if obj == nil {
		return fallbackHTML
	}
	defer jsPool.Put(obj)
	ctx := obj.(*v8go.Context)

	val, err := ctx.RunScript("$.server("+string(data)+")", "server.js")
	if err != nil || val == nil {
		log.Println("-- js err", err)
		return fallbackHTML
	} else {
		return []byte(val.String())
	}
}
