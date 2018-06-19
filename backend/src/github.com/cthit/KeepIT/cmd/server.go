package main

import (
	"../../KeepIT"
	"../database"
	"../web"
)

func main() {
	web.DEBUG = true
	connection := database.NewDatabaseConnection("mysql", "root:123abc@tcp(localhost)/keepit?parseTime=true")
	//log.Fatal(http.ListenAndServe(":8081", web.Router(database.NewPDPServiceCreator(connection))))
	for _, a := range database.NewPDPServiceCreator(connection)().GetActive(KeepIT.Person{
		Cid:  "karlwik",
		Nick: "Gurgy",
		Mail: "Gurgyar@gmail.com",
	}) {
		a.PrettyPrint()
	}
}
