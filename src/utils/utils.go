package utils

import (
	"bytes"
	"net/http"
)

type mockWriter struct {
	header http.Header
	buffer bytes.Buffer
}

func (w mockWriter) Header() http.Header {
	return w.header
}

func (w mockWriter) Write(value []byte) (int, error) {
	return w.buffer.Write(value)
}

func (w mockWriter) WriteHeader(statusCode int) {
}

func MockResponseWriter() http.ResponseWriter {
	return &mockWriter{header: http.Header{}}
}
