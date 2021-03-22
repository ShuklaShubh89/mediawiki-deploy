#!/bin/bash

cd /home/wikiuser/
wget https://releases.wikimedia.org/mediawiki/1.35/mediawiki-1.35.1.tar.gz
wget https://releases.wikimedia.org/mediawiki/1.35/mediawiki-1.35.1.tar.gz.sig
gpg --verify mediawiki-1.35.1.tar.gz.sig mediawiki-1.35.1.tar.gz
cd /var/www/html
tar -zxf /home/wikiuser/mediawiki-1.35.1.tar.gz
ln -s mediawiki-1.35.1/ mediawiki
chown -R apache:apache /var/www/html/mediawiki
