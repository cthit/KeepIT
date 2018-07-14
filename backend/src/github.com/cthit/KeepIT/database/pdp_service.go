package database

import (
	"../../KeepIT"
	_ "github.com/go-sql-driver/mysql"
	"github.com/gocraft/dbr"
	"time"
)

func NewPDPServiceCreator(c *dbr.Connection, service KeepIT.PersonService) func() KeepIT.PDPService {

	return func() KeepIT.PDPService {
		return PDPService{
			session:       c.NewSession(&dbr.NullEventReceiver{}),
			personService: service,
		}
	}
}

func NewDatabaseConnection(driver string, dsn string) *dbr.Connection {
	conn, err := dbr.Open(driver, dsn, nil)
	if err != nil {
		panic(err)
	}
	return conn
}

type PDPService struct {
	session       *dbr.Session
	personService KeepIT.PersonService
}

func (s PDPService) GetAllActive() ([]KeepIT.PDP, error) {
	var result []KeepIT.PDP
	s.session.Select("*").From("pdp_latest").
		Where("start < ?", time.Now()).
		Where("end > ?", time.Now()).
		Where("removed = ?", false).
		Load(&result)
	return s.personService.Fill(result)
}

func (s PDPService) GetAllInactive() ([]KeepIT.PDP, error) {
	var result []KeepIT.PDP
	s.session.Select("*").From("pdp_latest").
		Where("start > ? OR end < ?", time.Now(), time.Now()).
		Where("removed = ?", false).
		Load(&result)
	return s.personService.Fill(result)
}

func (s PDPService) GetAllDeleted() ([]KeepIT.PDP, error) {
	var result []KeepIT.PDP
	s.session.Select("*").From("pdp_latest").
		Where("removed = ?", true).
		Load(&result)
	return s.personService.Fill(result)
}

func (s PDPService) GetActive(user KeepIT.Person) ([]KeepIT.PDP, error) {
	cid := user.Cid
	groups, err := s.personService.GroupsWithChairman(user)
	if err != nil {
		return nil, err
	}

	var result []KeepIT.PDP
	s.session.Select("*").From("pdp_latest").
		Where("start < ?", time.Now()).
		Where("end > ?", time.Now()).
		Where("(creator = ? OR committee IN ?)", cid, groups).
		Where("removed = ?", false).
		Load(&result)
	return s.personService.Fill(result)
}

func (s PDPService) GetInactive(user KeepIT.Person) ([]KeepIT.PDP, error) {
	cid := user.Cid
	groups, err := s.personService.GroupsWithChairman(user)
	if err != nil {
		return nil, err
	}

	var result []KeepIT.PDP
	s.session.Select("*").From("pdp_latest").
		Where("start > ? OR end < ?", time.Now(), time.Now()).
		Where("(creator = ? OR committee IN ?)", cid, groups).
		Where("removed = ?", false).
		Load(&result)
	return s.personService.Fill(result)
}

func (s PDPService) GetDeleted(user KeepIT.Person) ([]KeepIT.PDP, error) {
	cid := user.Cid
	groups, err := s.personService.GroupsWithChairman(user)
	if err != nil {
		return nil, err
	}

	var result []KeepIT.PDP
	s.session.Select("*").From("pdp_latest").
		Where("(creator = ? OR committee IN ?)", cid, groups).
		Where("removed = ?", true).
		Load(&result)
	return s.personService.Fill(result)
}

func (s PDPService) GetVersions(processingId int) ([]KeepIT.PDP, error) {
	var result []KeepIT.PDP
	s.session.
		Select("*").
		From("pdps").
		LeftJoin("pdp_versions", "pdps.pdp_id = pdp_versions.pdp_id").
		Where("pdps.pdp_id = ?", processingId).
		Load(&result)
	return s.personService.Fill(result)
}

func (s PDPService) Update(modefied KeepIT.PDP) error {
	query := s.session.InsertInto("pdp_versions").Columns("pdp_id", "title", "eula", "target_group", "sensitive", "start", "end").Record(&modefied)
	_, err := query.Exec()
	return err
}

func (s PDPService) Delete(ProcessingId int) error {
	_, err := s.session.Update("pdps").Set("removed", 1).Where("pdp_id = ?", ProcessingId).Exec()
	return err
}

func (s PDPService) Create(new KeepIT.PDP) (int, error) {
	tx, err := s.session.Begin()
	if err != nil {
		return 0, err
	}
	defer tx.RollbackUnlessCommitted()

	res, err := tx.InsertInto("pdps").Columns("committee", "creator", "removed").Record(&new).Exec()
	if err != nil {
		return 0, err
	}

	id, err := res.LastInsertId()

	if err != nil {
		return 0, err
	}

	new.ProcessingId = int(id)

	_, err = tx.InsertInto("pdp_versions").
		Columns("pdp_id", "title", "eula", "target_group", "sensitive", "start", "end", "last_changed").
		Record(&new).Exec()
	if err != nil {
		return 0, err
	}

	err = tx.Commit()
	if err != nil {
		return 0, err
	}
	return new.ProcessingId, nil
}
