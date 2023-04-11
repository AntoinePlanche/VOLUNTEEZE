FROM mysql:latest

# Définition des variables d'environnement
ENV MYSQL_ROOT_PASSWORD=Tennis1234@!
ENV MYSQL_DATABASE=volunteeze

COPY ./Volunteeze.sql /docker-entrypoint-initdb.d/Volunteeze.sql

CMD ["mysqld"]