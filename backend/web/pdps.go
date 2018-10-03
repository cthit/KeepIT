package web

import (
	"github.com/cthit/KeepIT/backend"
	"encoding/json"
	"fmt"
	"github.com/gocraft/web"
	"io/ioutil"
	"net/http"
	"strconv"
)

func (c *Context) ListPDP(rw web.ResponseWriter, req *web.Request) {
	var result struct {
		Active   []KeepIT.PDP `json:"active"`
		Inactive []KeepIT.PDP `json:"inactive"`
		Deleted  []KeepIT.PDP `json:"deleted"`
	}
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

	n.Removed = false

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

	// check that user belongs to the committe
	belongsToCommittee := false
	for _, committee := range c.User.Groups {
		if committee == n.Committee {
			belongsToCommittee = true
			break
		}
	}
	if !belongsToCommittee {
		fmt.Println("User can not create pdps for this committee")
		rw.WriteHeader(http.StatusBadRequest)
		return
	}

	faults := validateCreate(n)
	if len(faults) > 0 {
		fmt.Println(faults)
		rw.WriteHeader(http.StatusBadRequest)
		return
	}

	id, err := c.PDPService.Create(n)
	if err != nil {
		fmt.Println(err)
		rw.WriteHeader(http.StatusInternalServerError)
		return
	}

	rw.WriteHeader(http.StatusCreated)
	fmt.Fprintf(rw, "{id:%d}", id)
}
func validateCreate(pdp KeepIT.PDP) []string {
	var faults []string
	if pdp.Title == "" {
		faults = append(faults, "Title was empty")
	}
	if pdp.Eula == "" {
		faults = append(faults, "Eula was empty")
	}
	if pdp.TargetGroup != "Everyone" && pdp.TargetGroup != "Fkit members" && pdp.TargetGroup != "Committee members" {
		faults = append(faults, "Target type not valid")
	}
	if pdp.End.Before(pdp.Start) {
		faults = append(faults, "Ends before it starts")
	}
	return faults
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
	/* if time.Now().After(old.Start) { // Removed because we have history
		if n.End.After(old.End) {
			faults = append(faults, "Can't keep data for longer that specified at start of collection")
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
	} */
	/* if time.Now().After(old.End) {
		faults = append(faults, "Can't change a pdp that has expired")
	} */
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
