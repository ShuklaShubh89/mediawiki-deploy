#!/bin/bash

nohup /home/wikiuser/container-runtime.sh > home/wikiuser/output &
exec /usr/sbin/init
