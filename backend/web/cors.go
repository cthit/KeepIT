package web

import (
	"github.com/gocraft/web"
	"strings"
)

func (c *Context) Cors(rw web.ResponseWriter, req *web.Request, next web.NextMiddlewareFunc) {
	rw.Header().Add("Access-Control-Allow-Origin", "*")
	next(rw, req)
}

func (c *Context) OptionsHandler(rw web.ResponseWriter, r *web.Request, methods []string) {
	rw.Header().Add("Access-Control-Allow-Methods", strings.Join(methods, ", "))
	rw.Header().Add("Access-Control-Allow-Origin", "*")
}
