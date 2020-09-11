package utils

import (
	"bytes"
	"io"
	"os"

	"encoding/hex"
)

var debug = false
var files = map[string][]byte{}

// Open opens a file by name from disk or embedded storage
func Open(name string) io.Reader {
	if debug {
		file, _ := os.Open(name)
		return file
	}
	buf, ok := files[name]
	if !ok {
		return nil
	}
	return bytes.NewBuffer(buf)
}

func decode(s string) []byte {
	buf, err := hex.DecodeString(s)
	if err != nil {
		panic(err)
	}
	return buf
}
