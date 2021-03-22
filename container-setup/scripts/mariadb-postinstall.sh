#!/bin/bash

systemctl start mariadb

DBNAME=wikidatabase
PWD=THISpasswordSHOULDbeCHANGED
USER=wiki

mysql -e "CREATE USER '${USER}'@'localhost' IDENTIFIED BY '${PWD}';"
mysql -e "CREATE DATABASE ${DBNAME}"
mysql -e "GRANT ALL PRIVILEGES ON ${DBNAME}.* TO '${USER}'@'localhost';"
mysql -e "FLUSH PRIVILEGES;"
