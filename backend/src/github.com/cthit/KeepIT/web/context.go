package web

import (
	"../../KeepIT"
	"encoding/json"
	"fmt"
	"github.com/gocraft/web"
	"io/ioutil"
	"net/http"
	"strconv"
	"strings"
)

type Context struct {
	PDPService        KeepIT.PDPService
	User              KeepIT.Person
	ResponsibleForAll bool
}

func SetPDPService(service KeepIT.PDPService) func(*Context, web.ResponseWriter, *web.Request, web.NextMiddlewareFunc) {
	return func(c *Context, rw web.ResponseWriter, req *web.Request, next web.NextMiddlewareFunc) {
		c.PDPService = service
		next(rw, req)
	}
}

// Request responses
func (c *Context) ListPDP(rw web.ResponseWriter, req *web.Request) {

	// Logic!! :)

	var result Result
	var err error

	if c.ResponsibleForAll {
		if req.URL.Query().Get("active") == "true" {
			result.Active, err = c.PDPService.GetAllActive()
			if err != nil {
				rw.WriteHeader(http.StatusInternalServerError)
				return
			}
		}
		if req.URL.Query().Get("inactive") == "true" {
			result.Inactive, err = c.PDPService.GetAllInactive()
			if err != nil {
				rw.WriteHeader(http.StatusInternalServerError)
				return
			}
		}
		if req.URL.Query().Get("deleted") == "true" {
			result.Deleted, err = c.PDPService.GetAllDeleted()
			if err != nil {
				rw.WriteHeader(http.StatusInternalServerError)
				return
			}
		}
	} else {
		if req.URL.Query().Get("active") == "true" {
			result.Active, err = c.PDPService.GetActive(c.User)
			if err != nil {
				rw.WriteHeader(http.StatusInternalServerError)
				return
			}
		}
		if req.URL.Query().Get("inactive") == "true" {
			result.Inactive, err = c.PDPService.GetInactive(c.User)
			if err != nil {
				rw.WriteHeader(http.StatusInternalServerError)
				return
			}
		}
		if req.URL.Query().Get("deleted") == "true" {
			result.Deleted, err = c.PDPService.GetDeleted(c.User)
			if err != nil {
				rw.WriteHeader(http.StatusInternalServerError)
				return
			}
		}
	}

	data, err := json.Marshal(result)
	if err != nil {
		rw.WriteHeader(http.StatusInternalServerError)
		return
	}
	rw.WriteHeader(http.StatusOK)
	rw.Write(data)
}

func (c *Context) CreatePDP(rw web.ResponseWriter, req *web.Request) {
	var n KeepIT.PDP

	body, err := ioutil.ReadAll(req.Body)
	req.Body.Close()
	if err != nil {
		rw.WriteHeader(http.StatusBadRequest)
		return
	}

	err = json.Unmarshal(body, &n)
	if err != nil {
		rw.WriteHeader(http.StatusBadRequest)
		return
	}

	// Set user
	n.CreatorId = "levenw"
	// Make sure committee is valid

	// More validation
	id, err := c.PDPService.Create(n)
	if err != nil {
		rw.WriteHeader(http.StatusInternalServerError)
		return
	}

	rw.WriteHeader(http.StatusCreated)
	fmt.Fprintf(rw, "{id:%d}", id)
}

func (c *Context) UpdatePDP(rw web.ResponseWriter, req *web.Request) {
	var n KeepIT.PDP

	body, err := ioutil.ReadAll(req.Body)
	req.Body.Close()
	if err != nil {
		rw.WriteHeader(http.StatusBadRequest)
		return
	}

	err = json.Unmarshal(body, &n)
	if err != nil {
		rw.WriteHeader(http.StatusBadRequest)
		return
	}
	value, err := strconv.ParseInt(req.PathParams["id"], 10, 32)
	if err != nil {
		rw.WriteHeader(http.StatusBadRequest)
		return
	}

	//TODO: Check that the pdp exists
	//TODO: Check that the user is allowed to edit the pdp

	n.ProcessingId = int(value)
	err = c.PDPService.Update(n)
	if err != nil {
		rw.WriteHeader(http.StatusInternalServerError)
		return
	}
	rw.WriteHeader(http.StatusOK)

	fmt.Fprint(rw, strings.Repeat("Hello ", 1), "World!")
}

func (c *Context) DeletePDP(rw web.ResponseWriter, req *web.Request) {
	fmt.Fprint(rw, strings.Repeat("Hello ", 1), "World!")
}

func (c *Context) ListPDPHistory(rw web.ResponseWriter, req *web.Request) {
	fmt.Fprint(rw, strings.Repeat("Hello ", 1), "World!")
}
