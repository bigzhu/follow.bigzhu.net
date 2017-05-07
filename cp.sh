#! /bin/bash
rsync -rvz -e "ssh -p 22" nginx.conf bigzhu@follow.center:/home/bigzhu/follow_center/
quasar build
rsync -rvz -e "ssh -p 22" ./dist bigzhu@follow.center:/home/bigzhu/follow_center/
