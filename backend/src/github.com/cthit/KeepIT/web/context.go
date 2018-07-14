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
	"time"
)

type Context struct {
	PDPService        KeepIT.PDPService
	User              KeepIT.Person
	ResponsibleForAll bool
	PersonService     KeepIT.PersonService
}

func SetPDPService(serviceProvider func() KeepIT.PDPService) func(*Context, web.ResponseWriter, *web.Request, web.NextMiddlewareFunc) {
	return func(c *Context, rw web.ResponseWriter, req *web.Request, next web.NextMiddlewareFunc) {
		c.PDPService = serviceProvider()
		next(rw, req)
		c.PDPService.Destroy()
	}
}

func SetPersonService(serviceProvider func() KeepIT.PersonService) func(*Context, web.ResponseWriter, *web.Request, web.NextMiddlewareFunc) {
	return func(c *Context, rw web.ResponseWriter, req *web.Request, next web.NextMiddlewareFunc) {
		c.PersonService = serviceProvider()
		next(rw, req)
		c.PersonService.Destroy()
	}
}

func (c *Context) Auth(rw web.ResponseWriter, req *web.Request, next web.NextMiddlewareFunc) {
	c.User = KeepIT.Person{
		Cid: "svenel", // FIXME
	}
	charirmanGroups, err := c.PersonService.GroupsWithChairman(c.User)
	if err != nil {
		fmt.Println(err)
		rw.WriteHeader(http.StatusInternalServerError)
		return
	}

	groups, err := c.PersonService.Groups(c.User)
	if err != nil {
		fmt.Println(err)
		rw.WriteHeader(http.StatusInternalServerError)
		return
	}

	// if is dpo or chairman of styrit c.responsibleForAll = true // TODO
	c.User.ChairmanIn = charirmanGroups
	c.User.Groups = groups
	next(rw, req)
}

func (c *Context) Cors(rw web.ResponseWriter, req *web.Request, next web.NextMiddlewareFunc) {
	rw.Header().Add("Access-Control-Allow-Origin", "*")
	next(rw, req)
}

// Request responses
func (c *Context) ListPDP(rw web.ResponseWriter, req *web.Request) {
	var result Result
	var err error

	if c.ResponsibleForAll {
		if req.URL.Query().Get("active") == "true" {
			result.Active, err = c.PDPService.GetAllActive()
			if err != nil {
				fmt.Println(err)
				rw.WriteHeader(http.StatusInternalServerError)
				return
			}
		}
		if req.URL.Query().Get("inactive") == "true" {
			result.Inactive, err = c.PDPService.GetAllInactive()
			if err != nil {
				fmt.Println(err)
				rw.WriteHeader(http.StatusInternalServerError)
				return
			}
		}
		if req.URL.Query().Get("deleted") == "true" {
			result.Deleted, err = c.PDPService.GetAllDeleted()
			if err != nil {
				fmt.Println(err)
				rw.WriteHeader(http.StatusInternalServerError)
				return
			}
		}
	} else {
		if req.URL.Query().Get("active") == "true" {
			result.Active, err = c.PDPService.GetActive(c.User)
			if err != nil {
				fmt.Println(err)
				rw.WriteHeader(http.StatusInternalServerError)
				return
			}
		}
		if req.URL.Query().Get("inactive") == "true" {
			result.Inactive, err = c.PDPService.GetInactive(c.User)
			if err != nil {
				fmt.Println(err)
				rw.WriteHeader(http.StatusInternalServerError)
				return
			}
		}
		if req.URL.Query().Get("deleted") == "true" {
			result.Deleted, err = c.PDPService.GetDeleted(c.User)
			if err != nil {
				fmt.Println(err)
				rw.WriteHeader(http.StatusInternalServerError)
				return
			}
		}
	}

	/* Fill pdp struct with info from person service */
	{
		var filled []KeepIT.PDP

		filled, err = c.PersonService.Fill(result.Deleted)
		if err != nil {
			fmt.Println(err)
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}
		result.Deleted = filled

		filled, err = c.PersonService.Fill(result.Inactive)
		if err != nil {
			fmt.Println(err)
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}
		result.Inactive = filled

		filled, err = c.PersonService.Fill(result.Active)
		if err != nil {
			fmt.Println(err)
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}
		result.Active = filled
	}

	// Marshal data
	data, err := json.Marshal(result)
	if err != nil {
		fmt.Println(err)
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
		fmt.Println(err)
		rw.WriteHeader(http.StatusBadRequest)
		return
	}

	err = json.Unmarshal(body, &n)
	if err != nil {
		fmt.Println(err)
		rw.WriteHeader(http.StatusBadRequest)
		return
	}

	// Set user
	n.CreatorId = c.User.Cid

	// TODO Make sure committee is valid

	// TODO More validation

	id, err := c.PDPService.Create(n)
	if err != nil {
		fmt.Println(err)
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
		fmt.Println(err)
		rw.WriteHeader(http.StatusBadRequest)
		return
	}

	err = json.Unmarshal(body, &n)
	if err != nil {
		fmt.Println(err)
		rw.WriteHeader(http.StatusBadRequest)
		return
	}
	value, err := strconv.ParseInt(req.PathParams["id"], 10, 32)
	if err != nil {
		fmt.Println(err)
		rw.WriteHeader(http.StatusBadRequest)
		return
	}

	pdps, err := c.PDPService.GetVersions(int(value))
	if err != nil {
		fmt.Println(err)
		rw.WriteHeader(http.StatusBadRequest)
		return
	}
	if len(pdps) == 0 {
		fmt.Println("PDP does not exist!")
		rw.WriteHeader(http.StatusNotFound)
		return
	}

	pdp := pdps[len(pdps)-1]
	if pdp.CreatorId != c.User.Cid {
		fmt.Println("User is not creator of this pdp")
		rw.WriteHeader(http.StatusForbidden)
		return
	}

	faults := validateUpdate(n, pdp)
	if len(faults) > 0 {
		fmt.Println(faults)
		rw.WriteHeader(http.StatusBadRequest)
		return
	}

	n.ProcessingId = int(value)
	err = c.PDPService.Update(n)
	if err != nil {
		fmt.Println(err)
		rw.WriteHeader(http.StatusInternalServerError)
		return
	}
	rw.WriteHeader(http.StatusOK)
}
func validateUpdate(n KeepIT.PDP, old KeepIT.PDP) []string {
	var faults []string
	if n.Title == "" {
		faults = append(faults, "Title was empty")
	}
	if n.Eula == "" {
		faults = append(faults, "Eula was empty")
	}
	if n.TargetGroup != "Everyone" && n.TargetGroup != "Fkit members" && n.TargetGroup != "Committee members" {
		faults = append(faults, "Target type not valid")
	}
	if n.End.Before(n.Start) {
		faults = append(faults, "Ends before it starts")
	}
	if time.Now().After(old.Start) {
		if n.End.After(old.End) {
			faults = append(faults, "Can't keep data for longer that specified at stsart of collection")
		}
		if !n.Start.Equal(old.Start) {
			faults = append(faults, "A passed start date cannot be moved")
		}
		if n.Eula != old.Eula {
			faults = append(faults, "The eual of a started collection can not be changed")
		}
		if n.TargetGroup == "Fkit members" && old.TargetGroup == "Everyone" {
			faults = append(faults, "You cant make the target group narrower after the collection has started")
		}
		if n.TargetGroup == "Committee members" && (old.TargetGroup == "Everyone" || old.TargetGroup == "Fkit members") {
			faults = append(faults, "You cant make the target group narrower after the collection has started")
		}
	}
	if time.Now().After(old.End) {
		faults = append(faults, "Can't change a pdp that has expired")
	}
	return faults
}

func (c *Context) DeletePDP(rw web.ResponseWriter, req *web.Request) {
	value, err := strconv.ParseInt(req.PathParams["id"], 10, 32)
	if err != nil {
		fmt.Println(err)
		rw.WriteHeader(http.StatusBadRequest)
		return
	}

	pdps, err := c.PDPService.GetVersions(int(value))
	if err != nil {
		fmt.Println(err)
		rw.WriteHeader(http.StatusBadRequest)
		return
	}
	if len(pdps) == 0 {
		fmt.Println("PDP does not exist!")
		rw.WriteHeader(http.StatusNotFound)
		return
	}

	pdp := pdps[len(pdps)-1]
	if pdp.CreatorId != c.User.Cid {
		fmt.Println("User is not creator of this pdp")
		rw.WriteHeader(http.StatusForbidden)
		return
	}

	err = c.PDPService.Delete(int(value))
	if err != nil {
		fmt.Println(err)
		rw.WriteHeader(http.StatusInternalServerError)
		return
	}
	rw.WriteHeader(http.StatusOK)
}

func (c *Context) ListPDPHistory(rw web.ResponseWriter, req *web.Request) {
	value, err := strconv.ParseInt(req.PathParams["id"], 10, 32)
	if err != nil {
		fmt.Println(err)
		rw.WriteHeader(http.StatusBadRequest)
		return
	}

	// Make sure user is allowed to view the pdp
	if !c.ResponsibleForAll {
		active, err := c.PDPService.GetActive(c.User)
		if err != nil {
			fmt.Println(err)
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}
		inactive, err := c.PDPService.GetInactive(c.User)
		if err != nil {
			fmt.Println(err)
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}
		deleted, err := c.PDPService.GetDeleted(c.User)
		if err != nil {
			fmt.Println(err)
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}
		pdps := append(append(active, inactive...), deleted...)
		found := false
		for _, pdp := range pdps {
			if pdp.ProcessingId == int(value) {
				found = true
				break
			}
		}
		if !found {
			fmt.Println("User is not authorized to view this pdp")
			rw.WriteHeader(http.StatusForbidden)
			return
		}
	}

	result, err := c.PDPService.GetVersions(int(value))

	filled, err := c.PersonService.Fill(result)

	// Marshal data
	data, err := json.Marshal(filled)
	if err != nil {
		fmt.Println(err)
		rw.WriteHeader(http.StatusInternalServerError)
		return
	}
	rw.WriteHeader(http.StatusOK)
	rw.Write(data)
}

func (c *Context) OptionsHandler(rw web.ResponseWriter, r *web.Request, methods []string) {
	rw.Header().Add("Access-Control-Allow-Methods", strings.Join(methods, ", "))
	rw.Header().Add("Access-Control-Allow-Origin", "*")
}
