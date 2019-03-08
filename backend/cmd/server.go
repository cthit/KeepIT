package main

import (
	"github.com/cthit/KeepIT/backend/database"
	"github.com/cthit/KeepIT/backend/ldap"
	"github.com/cthit/KeepIT/backend/web"
	"github.com/spf13/viper"
	"log"
	"net/http"
)

func main() {
	web.DEBUG = true

	personServiceCreator := ldap.NewPersonServiceCreator(viper.GetString("ldap.url"), viper.GetString("ldap.server"), viper.GetString("ldap.username"), viper.GetString("ldap.password"))

	connection := database.NewDatabaseConnection(viper.GetString("database.driver"), viper.GetString("database.dsn"))
	defer connection.Close()

	log.Fatal(http.ListenAndServe(viper.GetString("web.bind"), web.Router(database.NewPDPServiceCreator(connection), personServiceCreator)))
}
