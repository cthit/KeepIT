package web

import (
	"../../KeepIT"
	"github.com/gocraft/web"
	"net/http"
)

var DEBUG = false

func Router(pdpServiceProvider func() KeepIT.PDPService, personServiceProvider func() KeepIT.PersonService) http.Handler {
	router := web.NewWithPrefix(
		Context{},
		"/v2.0")

	router.Middleware(web.LoggerMiddleware)
	if DEBUG {
		router.Middleware(web.ShowErrorsMiddleware)
	}

	router.Middleware(SetPDPService(pdpServiceProvider))
	router.Middleware(SetPersonService(personServiceProvider))
	router.Middleware((*Context).Auth)
	router.Middleware((*Context).Cors)

	router.OptionsHandler((*Context).OptionsHandler)

	router.Get("/pdp", (*Context).ListPDP)
	router.Post("/pdp", (*Context).CreatePDP)
	router.Put("/pdp/:id", (*Context).UpdatePDP)
	router.Delete("/pdp/:id", (*Context).DeletePDP)
	router.Get("/pdp/:id/history", (*Context).ListPDPHistory)

	return router
}
