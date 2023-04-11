FROM mysql:latest

# Définition des variables d'environnement
ENV MYSQL_ROOT_PASSWORD=Tennis1234@!
ENV MYSQL_USER=antoine
ENV MYSQL_PASSWORD=Tennis1234@!
ENV MYSQL_DATABASE=volunteeze

# Copie du script SQL dans le conteneur
COPY Volunteeze.sql /docker-entrypoint-initdb.d/


# Création d'un nouvel utilisateur MySQL avec les privilèges nécessaires
RUN mysqld --user=mysql --bootstrap --verbose=0 --skip-name-resolve --skip-networking=0 \
    && mysql -uroot -p${MYSQL_ROOT_PASSWORD} -e "CREATE USER '${MYSQL_USER}'@'%' IDENTIFIED BY '${MYSQL_PASSWORD}';" \
    && mysql -uroot -p${MYSQL_ROOT_PASSWORD} -e "GRANT ALL PRIVILEGES ON *.* TO '${MYSQL_USER}'@'%';" \
    && mysql -uroot -p${MYSQL_ROOT_PASSWORD} -e "FLUSH PRIVILEGES;"

# Exécution du script SQL avec l'utilisateur nouvellement créé
RUN mysqld --user=mysql --bootstrap --verbose=0 --skip-name-resolve --skip-networking=0 < /docker-entrypoint-initdb.d/Volunteeze.sql

# Exposition du port MySQL
EXPOSE 3306