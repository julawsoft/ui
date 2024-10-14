#!/bin/sh

echo "Installing Noah landingpage in production environment"

echo "Give the proper permissions in cert files"
chmod 755 ./ssl/
chmod 604 ./ssl/*
echo "End of the process of giving proper permissions"

echo "Starting instalation..."

docker-compose down --rmi all
docker-compose build --no-cache
docker-compose up -d

echo "Ending instalation"