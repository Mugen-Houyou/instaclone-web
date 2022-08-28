#!/bin/bash

docker-compose up -d
sleep 3
asdfasdf=$(docker ps -aqf "name=instaclone-web_my_njs")
docker exec -it $asdfasdf /bin/bash

