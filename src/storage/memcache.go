package storage

import (
	"github.com/bradfitz/gomemcache/memcache"
)

// echo "flush_all" | nc localhost 11211
var mc = memcache.New("127.0.0.1:11211")

func prefix(key string) string {
	return "app0_" + key
}

func CacheSet(key string, value []byte, seconds int32) error {
	return mc.Set(&memcache.Item{
		Key:        prefix(key),
		Value:      value,
		Expiration: seconds,
	})
}

func CacheGet(key string) ([]byte, error) {
	item, err := mc.Get(prefix(key))
	if err == nil {
		return item.Value, nil
	}
	return nil, err
}

func CacheDelete(key string) {
	mc.Delete(prefix(key))
}
