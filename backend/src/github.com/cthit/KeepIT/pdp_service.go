package KeepIT

type PDPService interface {
	GetAllActive() []PDP
	GetAllInactive() []PDP
	GetAllDeleted() []PDP
	GetActive(user Person) []PDP   // Get pdps where user is owner or chairman
	GetInactive(user Person) []PDP // Get pdps where user is owner or chairman
	GetDeleted(user Person) []PDP  // Get pdps where user is owner or chairman
	GetVersion(processingId int) []PDP
	Update(ProcessingId int, modefied PDP)
	Delete(ProcessingId int)
	Create(new PDP)
}
