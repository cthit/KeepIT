package web

import "../../KeepIT"

type Result struct {
	Active   []KeepIT.PDP `json:"active"`
	Inactive []KeepIT.PDP `json:"inactive"`
	Deleted  []KeepIT.PDP `json:"deleted"`
}
