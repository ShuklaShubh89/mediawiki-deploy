#!/bin/bash -ex

sleep 10
/home/wikiuser/mariadb-postinstall.sh
systemctl enable mariadb
systemctl enable httpd
/home/wikiuser/mediawiki-install.sh
systemctl restart httpd