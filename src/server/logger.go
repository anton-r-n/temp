package server

import (
	"log"
	"net/http"
	"time"
)

type logRecord struct {
	writer http.ResponseWriter
	start  time.Time
	status int
	size   int
}

func (r *logRecord) Header() http.Header {
	return r.writer.Header()
}

func (r *logRecord) Write(p []byte) (int, error) {
	written, err := r.writer.Write(p)
	r.size += written
	return written, err
}

func (r *logRecord) WriteHeader(status int) {
	r.status = status
	r.writer.WriteHeader(status)
}

func requestLogger(handler http.Handler) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		record := &logRecord{w, time.Now(), http.StatusOK, 0}
		handler.ServeHTTP(record, r)
		timeSpent := int64(time.Now().Sub(record.start) / time.Microsecond)
		log.Printf(
			"%s %d %dµs %db %s\n",
			r.Method, record.status, timeSpent, record.size, r.RequestURI)
	}
}
