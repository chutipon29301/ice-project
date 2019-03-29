#!/bin/sh

# Should run inside Nginx container
echo '### Generating server.conf from server.conf.template...'
export DOLLAR='$'
mkdir -p /etc/nginx/sites-enabled
envsubst < /etc/nginx/sites-enabled-template/server.conf.template > /etc/nginx/sites-enabled/server.conf
echo 'Done...'
echo