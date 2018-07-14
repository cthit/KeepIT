package database

import (
	"../../KeepIT"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"github.com/gocraft/dbr"
	"time"
)

func NewPDPServiceCreator(c *dbr.Connection) func() KeepIT.PDPService {

	return func() KeepIT.PDPService {
		fmt.Println("jahaja")
		return PDPService{
			session: c.NewSession(&dbr.NullEventReceiver{}),
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
	session *dbr.Session
}

func (s PDPService) Destroy() {
}

func (s PDPService) GetAllActive() ([]KeepIT.PDP, error) {
	var result []KeepIT.PDP
	s.session.Select("*").From("pdp_latest").
		Where("start < ?", time.Now()).
		Where("end > ?", time.Now()).
		Where("removed = ?", false).
		Load(&result)
	return result, nil
}

func (s PDPService) GetAllInactive() ([]KeepIT.PDP, error) {
	var result []KeepIT.PDP
	s.session.Select("*").From("pdp_latest").
		Where("start > ? OR end < ?", time.Now(), time.Now()).
		Where("removed = ?", false).
		Load(&result)
	return result, nil
}

func (s PDPService) GetAllDeleted() ([]KeepIT.PDP, error) {
	var result []KeepIT.PDP
	s.session.Select("*").From("pdp_latest").
		Where("removed = ?", true).
		Load(&result)
	return result, nil
}

func (s PDPService) GetActive(user KeepIT.Person) ([]KeepIT.PDP, error) {
	cid := user.Cid
	groups := user.ChairmanIn

	var result []KeepIT.PDP

	query := s.session.Select("*").From("pdp_latest").
		Where("start < ?", time.Now()).
		Where("end > ?", time.Now()).
		Where("removed = ?", false)

	if len(groups) > 0 {
		query = query.Where("(creator = ? OR committee IN ?)", cid, groups)
	} else {
		query = query.Where("(creator = ?)", cid)
	}
	_, err := query.Load(&result)
	if err != nil {
		return nil, err
	}
	return result, nil
}

func (s PDPService) GetInactive(user KeepIT.Person) ([]KeepIT.PDP, error) {
	cid := user.Cid
	groups := user.ChairmanIn

	var result []KeepIT.PDP
	query := s.session.Select("*").From("pdp_latest").
		Where("start > ? OR end < ?", time.Now(), time.Now()).
		Where("removed = ?", false)

	if len(groups) > 0 {
		query = query.Where("(creator = ? OR committee IN ?)", cid, groups)
	} else {
		query = query.Where("(creator = ?)", cid)
	}
	_, err := query.Load(&result)
	if err != nil {
		return nil, err
	}
	return result, nil
}

func (s PDPService) GetDeleted(user KeepIT.Person) ([]KeepIT.PDP, error) {
	cid := user.Cid
	groups := user.ChairmanIn

	var result []KeepIT.PDP

	query := s.session.Select("*").From("pdp_latest").
		Where("removed = ?", true)

	if len(groups) > 0 {
		query = query.Where("(creator = ? OR committee IN ?)", cid, groups)
	} else {
		query = query.Where("(creator = ?)", cid)
	}
	_, err := query.Load(&result)
	if err != nil {
		return nil, err
	}
	return result, nil
}

func (s PDPService) GetVersions(processingId int) ([]KeepIT.PDP, error) {
	var result []KeepIT.PDP
	s.session.
		Select("*").
		From("pdps").
		LeftJoin("pdp_versions", "pdps.pdp_id = pdp_versions.pdp_id").
		Where("pdps.pdp_id = ?", processingId).
		Load(&result)
	return result, nil
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
