// +build ignore
package main

import (
	"fmt"
	"io/ioutil"
	"os"
	"path/filepath"
)

const out = "utils/files.go"
const tpl = "\tfiles[%q] = decode(\"%x\")\n"
const header = `package utils

func init() {
`

func main() {
	file, err := os.Create(out)
	check(err)
	defer file.Close()

	walkFn := func(path string, info os.FileInfo, err error) error {
		if !info.IsDir() {
			data, err := ioutil.ReadFile(path)
			check(err)

			path = filepath.Clean(path)
			_, err = fmt.Fprintf(file, tpl, path, data)
			check(err)
		}
		return nil
	}

	_, err = file.Write([]byte(header))
	check(err)

	for _, path := range os.Args[1:] {
		info, err := os.Stat(path)
		check(err)

		if info.IsDir() {
			filepath.Walk(path, walkFn)
		} else {
			walkFn(path, info, nil)
		}
	}

	_, err = fmt.Fprint(file, "}")
	check(err)
}

func check(e error) {
	if e != nil {
		panic(e)
	}
}
