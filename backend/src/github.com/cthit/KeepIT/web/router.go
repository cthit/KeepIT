package web

import (
	"../../KeepIT"
	"github.com/gocraft/web"
	"net/http"
)

var DEBUG = false

func Router(pdpServiceProvider func() KeepIT.PDPService) http.Handler {
	router := web.NewWithPrefix(
		Context{
			PDPService: pdpServiceProvider(),
		},
		"/v2.0")

	router.Middleware(web.LoggerMiddleware)
	if DEBUG {
		router.Middleware(web.ShowErrorsMiddleware)
	}
	router.Middleware((*Context).SetHelloCount)

	router.Get("/pdp", (*Context).ListPDP)
	router.Post("/pdp", (*Context).CreatePDP)
	router.Put("/pdp/:id", (*Context).UpdatePDP)
	router.Delete("/pdp/:id", (*Context).DeletePDP)
	router.Get("/pdp/:id/history", (*Context).ListPDPHistory)

	return router
}
