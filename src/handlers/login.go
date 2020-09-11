package handlers

/*
import (
	"encoding/json"
	"net/http"
	"strings"
)

type loginFields struct {
	Login    string `json:"login"`
	Message  string `json:"message"`
	Password string `json:"password"`
}

type widget struct {
	Widget string      `json:"widget"`
	Data   interface{} `json:"data"`
}

func login(fn handlerJSON) handlerJSON {
	return func(req *request) json.RawMessage {
		sid := sessionId(req.r)
		if validSession(sid) {
			setCookie(req.w, sid)
			return fn(req)
		} else {
			if valid, data := authenticate(req); valid {
				setCookie(req.w, sid)
				return fn(req)
			} else {
				return data
			}
		}
	}
}

func sessionId(r *http.Request) string {
	cookie, _ := r.Cookie("sid")
	if cookie != nil && len(cookie.Value) == 32 {
		return cookie.Value
	}
	return ""
}

func setCookie(w http.ResponseWriter, sid string) {
	cookie := "sid=" + sid + "; Max-Age=1800;" +
		" Path=/; HttpOnly; SameSite=Strict"
	w.Header().Set("Set-Cookie", cookie)
}

func validSession(sid string) bool {
	return sid != ""
}

func authenticate(req *request) (bool, json.RawMessage) {
	fields := &loginFields{}
	form := &widget{Widget: "LoginForm", Data: &fields}
	if req.r.Method == "GET" {
		// do nothing
	} else if req.r.Method == "POST" {
		json.NewDecoder(req.r.Body).Decode(&fields)
		if valid(fields.Login, fields.Password) {
			return true, nil
		} else {
			form.Data = &loginFields{Message: "Invalid credentials"}
		}
	} else {
		fields.Message = "Method Not Allowed"
	}
	response, _ := json.Marshal(form)
	return false, response
}

func valid(login, password string) bool {
	login = strings.Trim(login, " ")
	password = strings.Trim(password, " ")
	if len(login) <= 0 || len(login) >= 128 {
		return false
	}
	if len(password) <= 0 || len(password) >= 128 {
		return false
	}
	return true
}
*/
