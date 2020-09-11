package handlers

import (
	"io"
	"strings"
	"time"

	"compress/gzip"
	"net/http"
	"webapp/src/config"
	"webapp/utils"
)

var files = map[string]string{
	"/app.js":      "static/app.min.js.gz",
	"/app.css":     "static/app.css.gz",
	"/favicon.ico": "static/img/favicon.ico",
}

var commit = config.BuildCommit
var prefix = "/static/" + commit

func staticHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "GET" && r.Method != "HEAD" {
		methodNotAllowed(w, "GET, HEAD")
		return
	}

	cacheControl(w.Header())

	if r.Header.Get("If-None-Match") == commit {
		w.WriteHeader(http.StatusNotModified)
		return
	}

	path, ok := files[cleanPrefix(r.URL.Path)]
	if !ok {
		fileNotFound(w, r)
		return
	}

	fileReader := utils.Open(path)
	if fileReader == nil {
		fileNotFound(w, r)
		return
	}

	if strings.HasSuffix(path, ".gz") {
		setContentType(path, w)
		fileReader = encoding(fileReader, w, r)
	}
	io.Copy(w, fileReader)
}

func cleanPrefix(path string) string {
	if len(path) > len(prefix) {
		return path[len(prefix):]
	}
	return path
}

func setContentType(path string, w http.ResponseWriter) {
	if strings.HasSuffix(path, ".css.gz") {
		w.Header().Set("Content-Type", "text/css; charset=utf-8")
	} else if strings.HasSuffix(path, ".js.gz") {
		w.Header().Set("Content-Type", "text/javascript; charset=utf-8")
	}
}

func encoding(file io.Reader, w http.ResponseWriter, r *http.Request) io.Reader {
	if strings.Contains(r.Header.Get("Accept-Encoding"), "gzip") {
		w.Header().Set("Content-Encoding", "gzip")
	} else {
		file, _ = gzip.NewReader(file)
	}
	return file
}

func cacheControl(header http.Header) {
	expiration := time.Duration(7*24) * time.Hour
	dateTime := time.Now().UTC().Add(expiration)
	header.Set("Expires", dateTime.Format("Mon, 02 Jan 2006 15:04:05 GMT"))
	header.Set("Cache-Control", "private, max-age=604800")
	header.Set("ETag", commit)
}

func fileNotFound(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/plain; charset=utf-8")
	w.WriteHeader(http.StatusNotFound)
	w.Write([]byte("Error 401: Not Found\n"))
}

func methodNotAllowed(w http.ResponseWriter, allow string) {
	w.Header().Set("Allow", allow)
	w.Header().Set("Content-Type", "text/plain; charset=utf-8")
	w.WriteHeader(http.StatusMethodNotAllowed)
	w.Write([]byte("Error 405: Method not allowed. Allow: " + allow + "\n"))
}
