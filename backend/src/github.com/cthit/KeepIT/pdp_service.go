package KeepIT

type PDPService interface {
	GetAllActive() ([]PDP, error)
	GetAllInactive() ([]PDP, error)
	GetAllDeleted() ([]PDP, error)
	GetActive(user Person) ([]PDP, error)   // Get pdps where user is owner or chairman
	GetInactive(user Person) ([]PDP, error) // Get pdps where user is owner or chairman
	GetDeleted(user Person) ([]PDP, error)  // Get pdps where user is owner or chairman
	GetVersions(processingId int) ([]PDP, error)
	Update(modefied PDP) error
	Delete(ProcessingId int) error
	Create(new PDP) (int, error)
}
