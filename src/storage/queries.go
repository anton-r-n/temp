package storage

import (
	"context"
	"time"
)

func GetUsers(ctx context.Context) ([][]interface{}, error) {
	rows, err := mysql.QueryContext(ctx, "select id, email, username from user")
	if err != nil {
		return nil, err
	}

	values := make([][]interface{}, 0)
	for rows.Next() {
		var id int
		var email, username string
		if err := rows.Scan(&id, &email, &username); err != nil {
			return nil, err
		}
		values = append(values, []interface{}{id, email, username})
	}

	return values, nil
}

func GetLessons(ctx context.Context) ([][]interface{}, error) {
	rows, err := mysql.QueryContext(ctx, "select id, title, start_time from lessons")
	if err != nil {
		return nil, err
	}

	values := make([][]interface{}, 0)
	for rows.Next() {
		var id int
		var title string
		var start time.Time
		if err := rows.Scan(&id, &title, &start); err != nil {
			return nil, err
		}
		values = append(values, []interface{}{id, title, start})
	}

	return values, nil
}
