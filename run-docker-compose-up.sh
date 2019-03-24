docker run --rm \
-v /var/run/docker.sock:/var/run/docker.sock \
-v "$PWD:/$PWD" \
-w="/$PWD" \
docker/compose:1.23.2 \
-f docker-compose.yml -f docker-compose.prod.yml \
up --force-recreate -d