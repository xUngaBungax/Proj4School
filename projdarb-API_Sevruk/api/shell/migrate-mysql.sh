#!/bin/bash

DB_USER=${DB_USER}
DB_PASSWORD=${DB_PASSWORD}
DB_NAME=${DB_NAME}
DB_HOST=${DB_HOST}

SQL_FILES=("./api/sql/setup.sql" "./api/sql/fruits.sql" "./api/sql/scores.sql")

for SQL_FILE in "${SQL_FILES[@]}"
do
    if [ ! -f "$SQL_FILE" ]; then
        echo "Error: SQL file $SQL_FILE not found!"
        continue
    fi

    echo "Executing $SQL_FILE..."
    echo "mysql -u $DB_USER -p$DB_PASSWORD -h $DB_HOST $DB_NAME < $SQL_FILE"

    mysql -u "$DB_USER" -p"$DB_PASSWORD" -h "$DB_HOST" "$DB_NAME" < "$SQL_FILE"
done

echo "All SQL scripts executed successfully."