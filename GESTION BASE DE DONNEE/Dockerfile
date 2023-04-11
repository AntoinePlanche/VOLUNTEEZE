FROM mysql:latest

# Copie du script SQL dans le conteneur
COPY Volunteeze.sql /docker-entrypoint-initdb.d/

# Exécution du script SQL
RUN docker-entrypoint.sh mysqld & sleep 10 \
    && mysql -uroot -proot < /docker-entrypoint-initdb.d/script.sql

# Exposition du port MySQL
EXPOSE 3306