#!/bin/bash
set -e
service mysql start
mysql < /mysql/structure.sql
service mysql stop
