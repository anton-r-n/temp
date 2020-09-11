package server

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"time"
)

const (
	timeoutRead     = 5 * time.Second
	timeoutWrite    = 5 * time.Second
	timeoutIdle     = 5 * time.Second
	timeoutShutdown = 10 * time.Second
)

// Start webserver
func Start(handler http.Handler, addr string, done chan<- bool) {
	server := &http.Server{
		Addr:         addr,
		Handler:      requestLogger(handler),
		ReadTimeout:  timeoutRead,
		WriteTimeout: timeoutWrite,
		IdleTimeout:  timeoutIdle,
	}

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt)
	go gracefullShutdown(server, quit)

	log.Printf("Server is ready to handle requests at %s\n", addr)
	if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		log.Fatalf("Error: %v\n", err)
	}

	log.Printf("Server stopped at %s\n", addr)
	close(done)
}

func gracefullShutdown(server *http.Server, quit <-chan os.Signal) {
	<-quit
	addr := server.Addr
	println()
	log.Printf("Server at %s is shutting down...\n", addr)

	ctx, cancel := context.WithTimeout(context.Background(), timeoutShutdown)
	defer cancel()

	server.SetKeepAlivesEnabled(false)
	if err := server.Shutdown(ctx); err != nil {
		log.Fatalf("Could not gracefully shutdown the server at %s: %v\n", addr, err)
	}
}
