FROM mysql:latest

# Définition des variables d'environnement
ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_USER=myuser
ENV MYSQL_PASSWORD=mypassword
ENV MYSQL_DATABASE=mydb

# Copie du script SQL dans le conteneur
COPY Volunteeze.sql /docker-entrypoint-initdb.d/

# Création d'un nouvel utilisateur MySQL avec les privilèges nécessaires
RUN service mysql start && mysql -uroot -p${MYSQL_ROOT_PASSWORD} -e "CREATE USER '${MYSQL_USER}'@'%' IDENTIFIED BY '${MYSQL_PASSWORD}';" \
    && mysql -uroot -p${MYSQL_ROOT_PASSWORD} -e "GRANT ALL PRIVILEGES ON *.* TO '${MYSQL_USER}'@'%';" \
    && mysql -uroot -p${MYSQL_ROOT_PASSWORD} -e "FLUSH PRIVILEGES;"

# Exécution du script SQL avec l'utilisateur nouvellement créé
RUN service mysql start && mysql -u${MYSQL_USER} -p${MYSQL_PASSWORD} ${MYSQL_DATABASE} < /docker-entrypoint-initdb.d/Volunteeze.sql

# Exposition du port MySQL
EXPOSE 3306