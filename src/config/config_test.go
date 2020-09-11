package config

import "testing"

func TestConfig(t *testing.T) {
	if len(Config) == 0 {
		t.Error("Empty config")
	}
}
