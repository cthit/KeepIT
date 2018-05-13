package main

import (
	"../database"
	"../web"
	"log"
	"net/http"
)

func main() {
	web.DEBUG = true
	connection := database.NewDatabaseConnection("mysql", "keepit:password@localhost/keepit")
	log.Fatal(http.ListenAndServe(":8081", web.Router(database.NewPDPServiceCreator(connection))))
}
