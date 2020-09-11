package handlers

import (
	"testing"

	"net/http"
	"webapp/src/utils"
)

func TestRoot(t *testing.T) {
	r, _ := http.NewRequest("GET", "/health-check", nil)
	w := utils.MockResponseWriter()
	Root.ServeHTTP(w, r)
}
