package ldap

import (
	"../../KeepIT"
	"crypto/tls"
	"fmt"
	"gopkg.in/ldap.v2"
	"strings"
)

type LDAPPersonService struct {
	Connection *ldap.Conn
}

func NewPersonServiceCreator(url, servername, username, password string) func() KeepIT.PersonService {

	return func() KeepIT.PersonService {
		l, err := ldap.DialTLS("tcp", url, &tls.Config{ServerName: servername})
		if err != nil {
			return nil
		}

		err = l.Bind(username, password)
		if err != nil {
			return nil
		}

		ld := &LDAPPersonService{
			Connection: l,
		}

		return ld
	}
}

func (s LDAPPersonService) Destroy() {
	s.Connection.Close()
}

func (s LDAPPersonService) person(cid string) (KeepIT.Person, error) {
	searchRequest := ldap.NewSearchRequest(
		fmt.Sprintf("uid=%s,ou=people,dc=chalmers,dc=it", cid),
		ldap.ScopeWholeSubtree, ldap.NeverDerefAliases, 0, 0, false,
		"(&(objectClass=*))",                                    // The filter to apply
		[]string{"givenName", "sn", "nickname", "gdprEducated"}, // A list attributes to retrieve
		nil,
	)

	result, err := s.Connection.Search(searchRequest)
	if err != nil {
		return KeepIT.Person{}, err
	}

	if len(result.Entries) != 0 {
		return KeepIT.Person{
			Cid:  cid,
			Nick: result.Entries[0].GetAttributeValue("nickname"),
			Mail: fmt.Sprintf("%s@chalmers.it", cid),
		}, nil

	}
	return KeepIT.Person{}, fmt.Errorf("Person does not exist")

}

func (s LDAPPersonService) chairman(group string) (KeepIT.Person, error) {
	searchRequest := ldap.NewSearchRequest(
		fmt.Sprintf("cn=ordf,cn=%s,ou=%s,ou=fkit,ou=groups,dc=chalmers,dc=it", group, group),
		ldap.ScopeWholeSubtree, ldap.NeverDerefAliases, 0, 0, false,
		"(&(objectClass=*))", // The filter to apply
		[]string{"member"},   // A list attributes to retrieve
		nil,
	)

	result, err := s.Connection.Search(searchRequest)
	if err != nil {
		return KeepIT.Person{}, err
	}

	if len(result.Entries) != 0 {
		basedn := result.Entries[0].GetAttributeValue("member")

		// extract AAAA from uid=AAAA,ou=people,d......
		cid := strings.Split(strings.Split(basedn, ",")[0], "=")[1]
		return s.person(cid)

	} else {
		return KeepIT.Person{}, fmt.Errorf("committee does not have a chairman")
	}
}

func (s LDAPPersonService) GroupsWithChairman(person KeepIT.Person) ([]string, error) {
	searchRequest := ldap.NewSearchRequest(
		fmt.Sprintf("ou=fkit,ou=groups,dc=chalmers,dc=it"),
		ldap.ScopeWholeSubtree, ldap.NeverDerefAliases, 0, 0, false,
		"(&(cn=ordf))",     // The filter to apply
		[]string{"member"}, // A list attributes to retrieve
		nil,
	)

	result, err := s.Connection.Search(searchRequest)
	if err != nil {
		return nil, err
	}

	var res []string

	for _, entry := range result.Entries {
		if entry.GetAttributeValue("member") == fmt.Sprintf("uid=%s,ou=people,dc=chalmers,dc=it", person.Cid) {
			// extract AAAA from cn=ordf,cn=AAA,o......
			group := strings.Split(strings.Split(entry.DN, ",")[1], "=")[1]
			res = append(res, group)
		}
	}
	return res, nil
}

func (s LDAPPersonService) Fill(in []KeepIT.PDP) ([]KeepIT.PDP, error) {
	for i, _ := range in {
		creator, err := s.person(in[i].CreatorId)
		if err != nil {
			return nil, err
		}
		in[i].Creator = creator

		chairman, err := s.chairman(in[i].Committee)
		if err != nil {
			return nil, err
		}
		in[i].Chairman = chairman
	}
	return in, nil
}
