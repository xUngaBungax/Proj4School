#!/bin/bash

echo "Waiting for MySQL to start..."
MAX_TRIES=10
TRIES=0
while ! mysqladmin ping -h"mysql" -u"$DB_USER" -p"$DB_PASSWORD" --silent; do
    if [ "$TRIES" -gt "$MAX_TRIES" ]; then
        echo "Error: Unable to connect to MySQL after $MAX_TRIES attempts, exiting."
        exit 1
    fi
    echo "MySQL is not up yet... waiting..."
    sleep 3
    TRIES=$((TRIES+1))
done

echo "MySQL started."

./api/shell/migrate-mysql.sh

exec "$@"