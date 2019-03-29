#!/bin/bash

docker run --rm \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v "$PWD:/$PWD" \
    -w="/$PWD" \
    -it --entrypoint "/bin/bash" \
    whatthefar/docker-compose-bash-curl:1.24.0 \
    init-letsencrypt.sh