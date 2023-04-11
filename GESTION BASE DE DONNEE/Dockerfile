FROM mysql:latest

ENV MYSQL_ROOT_PASSWORD=Tennis1234@!

# Copie du script SQL dans le conteneur
COPY Volunteeze.sql /docker-entrypoint-initdb.d/

# Exécution du script SQL
RUN docker-entrypoint.sh mysqld --socket=/var/run/mysqld/mysqld.sock & sleep 10 \
    && mysql -uroot -proot -e "source /docker-entrypoint-initdb.d/Volunteeze.sql;"

# Exposition du port MySQL
EXPOSE 3306