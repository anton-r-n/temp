package main

import (
	"webapp/src/config"
	"webapp/src/handlers"
	"webapp/src/server"
	"webapp/src/storage"
)

func main() {
	// Open MySQL connection
	dsn := config.Config["mysql_dsn"]
	storage.Open(dsn)

	// Start web-server
	done := make(chan bool, 1)
	addr := config.Config["http_addr"]
	go server.Start(handlers.Root, addr, done)

	<-done
	storage.Close()
}
