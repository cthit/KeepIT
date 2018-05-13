package KeepIT

import "time"

type PDP struct {
	VersionNumber int         `json:"version_number"`
	ProcessingId  int         `json:"processing_id"`
	Creator       Person      `json:"creator"`
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
