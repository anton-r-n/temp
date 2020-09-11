package controllers

import (
	"encoding/json"
	"log"
	"net/http"
	"strings"
	"sync"

	"webapp/src/storage"
)

type values = map[string]string
type widget = map[string]interface{}
type controller = func(*http.Request) widget

var handlersMap = map[string]controller{
	"/":         index,
	"/users/":   users,
	"/lessons/": lessons,
}

func Index(r *http.Request) widget {
	path := r.URL.Path
	if strings.HasPrefix(path, "/api/") {
		return handler(path[4:])(r)
	}
	return main(path, handler(path)(r))
}

func handler(path string) controller {
	fn := handlersMap[path]
	if fn == nil {
		return err
	}
	return fn
}

func main(selected string, content widget) widget {
	return widget{
		"name":  "body",
		"title": "App",
		"nodes": widget{
			"widget":  "Main",
			"title":   "App",
			"content": content,
			"menu": [][]string{
				{"/users/", "Users"},
				{"/lessons/", "Lessons"},
			},
		},
	}
}

func err(r *http.Request) widget {
	return widget{"name": "div", "nodes": "Error"}
}

func index(r *http.Request) widget {
	data := make([]widget, 2)
	var wg sync.WaitGroup
	go func() {
		defer wg.Done()
		data[0] = getLessons(r)
	}()
	go func() {
		defer wg.Done()
		data[1] = getUsers(r)
	}()
	wg.Add(2)
	wg.Wait()
	return widget{
		"name":  "div",
		"nodes": data,
	}
}

func users(r *http.Request) widget {
	return getUsers(r)
}

func lessons(r *http.Request) widget {
	return getLessons(r)
}

const cacheTimeSec = 3600

func getUsers(r *http.Request) widget {
	key := "users"
	var err error
	var data []byte

	data, err = storage.CacheGet(key)
	if err != nil {
		rows, err := storage.GetUsers(r.Context())
		if err != nil {
			return widget{"node": "div", "nodes": "Error"}
		}
		if data, err = json.Marshal(rows); err != nil {
			log.Println(err)
			return widget{"node": "div", "nodes": "Error"}
		}
		storage.CacheSet(key, data, cacheTimeSec)
	}

	return widget{
		"widget":   "Table",
		"data":     json.RawMessage(data),
		"caption":  "Users",
		"editable": true,
	}
}

func getLessons(r *http.Request) widget {
	key := "lessons"
	var err error
	var data []byte

	data, err = storage.CacheGet(key)
	if err != nil {
		rows, err := storage.GetLessons(r.Context())
		if err != nil {
			return widget{"node": "div", "nodes": "Error"}
		}
		if data, err = json.Marshal(rows); err != nil {
			log.Println(err)
			return widget{"node": "div", "nodes": "Error"}
		}
		storage.CacheSet(key, data, cacheTimeSec)
	}

	return widget{
		"widget":   "Table",
		"data":     json.RawMessage(data),
		"caption":  "Lessons",
		"editable": true,
	}
}
