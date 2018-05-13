package web

import (
	"../../KeepIT"
	"fmt"
	"github.com/gocraft/web"
	"strings"
)

type Context struct {
	HelloCount int
	PDPService KeepIT.PDPService
}

// Example middleware
func (c *Context) SetHelloCount(rw web.ResponseWriter, req *web.Request, next web.NextMiddlewareFunc) {
	c.HelloCount = 3

	next(rw, req)
}

// Request responses
func (c *Context) ListPDP(rw web.ResponseWriter, req *web.Request) {
	fmt.Fprint(rw, strings.Repeat("Hello ", c.HelloCount), "World!")
}

func (c *Context) CreatePDP(rw web.ResponseWriter, req *web.Request) {
	fmt.Fprint(rw, strings.Repeat("Hello ", c.HelloCount), "World!")
}

func (c *Context) UpdatePDP(rw web.ResponseWriter, req *web.Request) {
	fmt.Fprint(rw, strings.Repeat("Hello ", c.HelloCount), "World!")
}

func (c *Context) DeletePDP(rw web.ResponseWriter, req *web.Request) {
	fmt.Fprint(rw, strings.Repeat("Hello ", c.HelloCount), "World!")
}

func (c *Context) ListPDPHistory(rw web.ResponseWriter, req *web.Request) {
	fmt.Fprint(rw, strings.Repeat("Hello ", c.HelloCount), "World!")
}
