package web

import "../../KeepIT"

type Result struct {
	Active   []KeepIT.PDP
	Inactive []KeepIT.PDP
	Deleted  []KeepIT.PDP
}
