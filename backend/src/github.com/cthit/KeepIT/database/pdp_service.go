package database

import (
	"../../KeepIT"
	"github.com/gocraft/dbr"
)

func NewPDPServiceCreator(c *dbr.Connection) func() KeepIT.PDPService {
	session := c.NewSession(&dbr.NullEventReceiver{})
	return func() KeepIT.PDPService {
		return PDPService{session: session}
	}
}

func NewDatabaseConnection(driver string, dsn string) *dbr.Connection {
	conn, _ := dbr.Open(driver, dsn, nil)
	return conn
}

type PDPService struct {
	session *dbr.Session
}

func (s PDPService) GetAllActive() []KeepIT.PDP {
	panic("implement me")
}

func (PDPService) GetAllInactive() []KeepIT.PDP {
	panic("implement me")
}

func (PDPService) GetAllDeleted() []KeepIT.PDP {
	panic("implement me")
}

func (PDPService) GetActive(user KeepIT.Person) []KeepIT.PDP {
	panic("implement me")
}

func (PDPService) GetInactive(user KeepIT.Person) []KeepIT.PDP {
	panic("implement me")
}

func (PDPService) GetDeleted(user KeepIT.Person) []KeepIT.PDP {
	panic("implement me")
}

func (PDPService) GetVersion(processingId int) []KeepIT.PDP {
	panic("implement me")
}

func (PDPService) Update(ProcessingId int, modefied KeepIT.PDP) {
	panic("implement me")
}

func (PDPService) Delete(ProcessingId int) {
	panic("implement me")
}

func (PDPService) Create(new KeepIT.PDP) {
	panic("implement me")
}
