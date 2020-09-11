package controllers

import (
	"testing"

	"net/http"
)

func TestConfig(t *testing.T) {
	r, _ := http.NewRequest("GET", "/health-check", nil)
	out := Index(r)
	if out == nil {
		t.Error("response should not be nil")
	}
}
