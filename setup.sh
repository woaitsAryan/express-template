#!/bin/bash

JWT_KEY=$(openssl rand -hex 32)
DB_PASSWORD=$(openssl rand -hex 32)
REDIS_PASSWORD=$(openssl rand -hex 32)

echo "Please enter the project name:"
read CONTAINER_NAME

cp .env.sample .env

sed -i "s/JWT_KEY=.*$/JWT_KEY=$JWT_KEY/" .env
sed -i "s/DB_PASSWORD=.*$/DB_PASSWORD=$DB_PASSWORD/" .env
sed -i "s/REDIS_PASSWORD=.*$/REDIS_PASSWORD=$REDIS_PASSWORD/" .env
sed -i "s/DB_DATABASE=.*/DB_DATABASE=$CONTAINER_NAME/" .env
sed -i "s/sample-template/$CONTAINER_NAME/g" compose.yaml


docker run --name ${CONTAINER_NAME}-mongo -d -p 27017:27017 \
      -e MONGO_INITDB_ROOT_USERNAME=admin \
      -e MONGO_INITDB_ROOT_PASSWORD=$DB_PASSWORD \
      -e MONGO_INITDB_DATABASE=$CONTAINER_NAME \
      mongo

docker run --name ${CONTAINER_NAME}-redis -d -p 6379:6379 \
      redis \
      redis-server --requirepass $REDIS_PASSWORD
