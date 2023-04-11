FROM mysql:latest

# Définition des variables d'environnement
ENV MYSQL_ROOT_PASSWORD=Tennis1234@!
ENV MYSQL_DATABASE=volunteeze

COPY ./Volunteeze.sql /docker-entrypoint-initdb.d/Volunteeze.sql

RUN chmod 644 /docker-entrypoint-initdb.d/Volunteeze.sql

# Exposition du port 3306
EXPOSE 3306

# Démarrage de MySQL
CMD ["mysqld"]