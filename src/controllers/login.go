package controllers

import (
	"net/http"
)

func login(fn controller, r *http.Request) widget {
	return nil
}

func loginForm(r *http.Request) widget {
	return widget{
		"widget": "Form",
		"attrs": values{
			"enctype": "application/json",
			"method":  "post",
			"class":   "block",
		},
		"nodes": []widget{
			widget{
				"name":  "h3",
				"nodes": "Log In",
			},
			widget{
				"widget": "FormInput",
				"label":  "Email",
				"name":   "username",
			},
			widget{
				"widget": "FormInput",
				"label":  "Password",
				"name":   "password",
				"type":   "password",
			},
			widget{
				"name": "div",
				"nodes": widget{
					"name": "input",
					"attrs": values{
						"class": "button",
						"type":  "submit",
						"value": "Sign in",
					},
				},
			},
		},
	}
}
