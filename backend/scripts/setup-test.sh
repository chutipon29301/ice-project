if [ -e ../.env ]; then
    set -a # automatically export all variables
    source ../.env
    set +a
else 
    echo "Please set up your .env file before starting your environment."
    exit 1
fi
bash scripts/clear-container.sh
rm -rf ../volumes-test

echo "# Setting up environment"
# run container
cd ..
docker-compose -f docker-compose.yml -f docker-compose.test.yml up -d db
echo "# Wating for database"
sleep 5
echo "# Everything is already up"