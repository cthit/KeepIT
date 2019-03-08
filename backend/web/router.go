package web

import (
	"github.com/cthit/KeepIT/backend"
	"github.com/gocraft/web"
	"net/http"
)

var DEBUG = false

type Context struct {
	PDPService        KeepIT.PDPService
	User              KeepIT.Person
	ResponsibleForAll bool
	PersonService     KeepIT.PersonService
}

func Router(
	pdpServiceProvider func() KeepIT.PDPService,
	personServiceProvider func() KeepIT.PersonService,
) http.Handler {

	router := web.NewWithPrefix(
		Context{},
		"")

	router.Middleware(web.LoggerMiddleware)
	if DEBUG {
		router.Middleware(web.ShowErrorsMiddleware)
	}

	router.Middleware(setPDPService(pdpServiceProvider))
	router.Middleware(setPersonService(personServiceProvider))
	router.Middleware((*Context).Auth)
	router.Middleware((*Context).PopulateUser)
	router.Middleware((*Context).Cors)

	router.OptionsHandler((*Context).OptionsHandler)

	router.Get("/pdp", (*Context).ListPDP)
	router.Post("/pdp", (*Context).CreatePDP)
	router.Put("/pdp/:id", (*Context).UpdatePDP)
	router.Delete("/pdp/:id", (*Context).DeletePDP)
	router.Get("/pdp/:id/history", (*Context).ListPDPHistory)
	router.Get("/login", (*Context).Login)
	//router.Get("/refresh", (*Context).Refresh)
	return router
}

func setPDPService(serviceProvider func() KeepIT.PDPService) func(*Context, web.ResponseWriter, *web.Request, web.NextMiddlewareFunc) {
	return func(c *Context, rw web.ResponseWriter, req *web.Request, next web.NextMiddlewareFunc) {
		c.PDPService = serviceProvider()
		next(rw, req)
		c.PDPService.Destroy()
	}
}

func setPersonService(serviceProvider func() KeepIT.PersonService) func(*Context, web.ResponseWriter, *web.Request, web.NextMiddlewareFunc) {
	return func(c *Context, rw web.ResponseWriter, req *web.Request, next web.NextMiddlewareFunc) {
		c.PersonService = serviceProvider()
		next(rw, req)
		c.PersonService.Destroy()
	}
}
