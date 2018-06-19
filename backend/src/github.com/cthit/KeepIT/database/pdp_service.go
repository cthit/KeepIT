package database

import (
	"../../KeepIT"
	_ "github.com/go-sql-driver/mysql"
	"github.com/gocraft/dbr"
	"time"
)

func NewPDPServiceCreator(c *dbr.Connection) func() KeepIT.PDPService {

	return func() KeepIT.PDPService {
		return PDPService{session: c.NewSession(&dbr.NullEventReceiver{})}
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
	var result []KeepIT.PDP
	s.session.Select("*").From("pdp_latest").
		Where("start < ?", time.Now()).
		Where("end > ?", time.Now()).
		Where("removed = ?", false).
		Load(&result)
	return result
}

func (s PDPService) GetAllInactive() []KeepIT.PDP {
	var result []KeepIT.PDP
	s.session.Select("*").From("pdp_latest").
		Where("start > ? OR end < ?", time.Now(), time.Now()).
		Where("removed = ?", false).
		Load(&result)
	return result
}

func (s PDPService) GetAllDeleted() []KeepIT.PDP {
	var result []KeepIT.PDP
	s.session.Select("*").From("pdp_latest").
		Where("removed = ?", true).
		Load(&result)
	return result
}

func (s PDPService) GetActive(user KeepIT.Person) []KeepIT.PDP {
	cid := user.Cid
	groups := []string{"hello", "dpo"} // TODO: Grupper personen är ordförande i

	var result []KeepIT.PDP
	s.session.Select("*").From("pdp_latest").
		Where("start < ?", time.Now()).
		Where("end > ?", time.Now()).
		Where("(creator = ? OR committee IN ?)", cid, groups).
		Where("removed = ?", false).
		Load(&result)
	return result
}

func (s PDPService) GetInactive(user KeepIT.Person) []KeepIT.PDP {
	cid := user.Cid
	groups := []string{"hello", "digit"} // TODO: Grupper personen är ordförande i

	var result []KeepIT.PDP
	s.session.Select("*").From("pdp_latest").
		Where("start > ? OR end < ?", time.Now(), time.Now()).
		Where("(creator = ? OR committee IN ?)", cid, groups).
		Where("removed = ?", false).
		Load(&result)
	return result
}

func (s PDPService) GetDeleted(user KeepIT.Person) []KeepIT.PDP {
	cid := user.Cid
	groups := []string{"hello", "digit"} // TODO: Grupper personen är ordförande i

	var result []KeepIT.PDP
	s.session.Select("*").From("pdp_latest").
		Where("(creator = ? OR committee IN ?)", cid, groups).
		Where("removed = ?", true).
		Load(&result)
	return result
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
