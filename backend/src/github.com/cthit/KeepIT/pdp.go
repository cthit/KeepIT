package KeepIT

import (
	"encoding/json"
	"fmt"
	"time"
)

type PDP struct {
	VersionNumber int         `json:"version_number" db:"version_id"`
	ProcessingId  int         `json:"processing_id" db:"id"`
	Creator       string      `json:"-" db:"creator"`
	CreatorObject Person      `json:"creator",db:"-"`
	Committee     string      `json:"committee"`
	Start         time.Time   `json:"start"`
	End           time.Time   `json:"end"`
	Eula          string      `json:"eula"`
	Sensitive     bool        `json:"sensitive"`
	TargetGroup   TargetGroup `json:"target_group"`
	LastEdited    time.Time   `json:"last_edited"`
	Removed       bool        `json:"removed"`
	Chairman      Person      `json:"chairman"`
}

func (p PDP) PrettyPrint() {
	r, _ := json.Marshal(p)
	fmt.Println(string(r))

}
