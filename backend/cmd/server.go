package main

import (
	"github.com/cthit/KeepIT/backend/database"
	"github.com/cthit/KeepIT/backend/ldap"
	"github.com/cthit/KeepIT/backend/web"
	"log"
	"net/http"
)

func main() {
	web.DEBUG = true

	personServiceCreator := ldap.NewPersonServiceCreator("ldap.chalmers.it:636", "chalmers.it", "cn=digit,dc=chalmers,dc=it", "password")

	connection := database.NewDatabaseConnection("mysql", "root:123abc@tcp(localhost)/keepit?parseTime=true")
	defer connection.Close()

	log.Fatal(http.ListenAndServe(":8081", web.Router(database.NewPDPServiceCreator(connection), personServiceCreator)))
}
