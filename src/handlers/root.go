package handlers

import (
	"strings"

	"encoding/json"
	"net/http"
	"webapp/src/controllers"
)

type handlerFn = func(http.ResponseWriter, *http.Request)

// Root HTTP handler
var Root = http.HandlerFunc(
	func(w http.ResponseWriter, r *http.Request) {
		path := r.URL.Path
		if path == "/favicon.ico" || strings.HasPrefix(path, "/static/") {
			staticHandler(w, r)
		} else {
			r.URL.Path = trailingSlash(r.URL.Path)
			contentHandler(w, r)
		}
	})

var contentHandler = gzipWrapper(
	func(w http.ResponseWriter, r *http.Request) {
		data := controllers.Index(r)
		if acceptJSON(r) {
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(data)
		} else {
			w.Header().Set("Content-Type", "text/html; charset=utf-8")
			script, _ := json.Marshal(data)
			w.Write(html(script))
		}
	})

func acceptJSON(r *http.Request) bool {
	header := r.Header["Accept"]
	if len(header) > 0 {
		return header[0] == "application/json"
	}
	return false
}

func trailingSlash(path string) string {
	if path[len(path)-1] != '/' {
		return path + "/"
	}
	return path
}
