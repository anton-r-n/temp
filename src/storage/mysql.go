package storage

import (
	"log"

	"database/sql"
	// Register MySQL driver
	_ "github.com/go-sql-driver/mysql"
)

// Mysql is a pool of connections to MySQL database.
var mysql *sql.DB

const params = "?interpolateParams=true&parseTime=true"

// Open opens a database specified by its name and user's credentials
func Open(dsn string) {
	if db, err := sql.Open("mysql", dsn+params); err != nil {
		log.Fatal(err.Error())
	} else {
		db.SetMaxIdleConns(0)
		db.SetMaxOpenConns(10)

		if err := db.Ping(); err != nil {
			log.Fatal(err.Error())
		}
		mysql = db
		log.Println("MySQL connected")
	}
}

// CloseRows closes the Rows, preventing further enumeration.
// This is wrapped around rows.Close to handle case with nil rows.
func CloseRows(rows *sql.Rows) {
	if rows != nil {
		if err := rows.Close(); err != nil {
			log.Printf("MySQL close rows %s\n", err)
		}
	}
}

// Close closes the database if exists and log possible error.
func Close() {
	if mysql != nil {
		if err := mysql.Close(); err != nil {
			log.Printf("MySQL close %s\n", err)
		} else {
			log.Println("MySQL connection closed")
		}
	}
}
