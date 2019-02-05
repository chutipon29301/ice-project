if [ -e ../.env ]; then
    set -a # automatically export all variables
    source ../.env
    set +a
else 
    echo "Please set up your .env file before starting your environment."
    exit 1
fi
bash scripts/clear-container.sh
if [ ! "$(docker ps -q -f name=$PRISMA_CONTAINER_NAME)" ]; then
    echo "# Setting up environment"
    # run container
    docker-compose up -d db
    echo "# Wating for database"
    sleep 10
    cd ..
fi
echo "# Everything is already up"