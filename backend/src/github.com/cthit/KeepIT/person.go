package KeepIT

type Person struct {
	Cid  string `json:"cid"`
	Nick string `json:"nick"`
	Mail string `json:"mail"`
}

type PersonService interface {
	Fill([]PDP) ([]PDP, error)
	GroupsWithChairman(Person) ([]string, error)
}
