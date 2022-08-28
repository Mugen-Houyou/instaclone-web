docker-compose up -d
powershell -Command "& {sleep 5}"
set asdfasdf=docker ps -aqf "name=instaclone-web_my_njs"
docker exec -it %asdfasdf% /bin/bash

