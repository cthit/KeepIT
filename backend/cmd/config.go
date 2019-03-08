package main

import (
	"fmt"
	"github.com/spf13/viper"
	"os"
)

const ApplicationName = "BooGroCha"

func init() {
	err := loadConfig()
	if err != nil {
		fmt.Printf("Failed to load config: %s", err)
		os.Exit(1)
	}
}

func loadConfig() error {

	viper.SetConfigName("config")                                 // name of config file (without extension)
	viper.AddConfigPath(fmt.Sprintf("/etc/%s/", ApplicationName)) // path to look for the config file in
	viper.AddConfigPath(".")                                      // optionally look for config in the working directory

	err := viper.ReadInConfig() // Find and read the config file
	return err

}
