#! /bin/bash
# rsync -rvz -e "ssh -p 22" nginx.conf nginx.80.conf bigzhu@follow.center:/home/bigzhu/follow_center/
quasar build
# rsync -rvz -e "ssh -p 22" ./dist bigzhu@follow.center:/home/bigzhu/follow_center/

# rsync -rvz -e "ssh -p 2222"  ./dist root@47.88.137.77:/root/docker/web/www/follow_center/
rsync -rvz -e "ssh -p 22"  ./dist/spa/ bigzhu@198.44.14.30:/home/bigzhu/project/front_end/web/follow_center/
