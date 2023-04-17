FROM mysql:latest

# Définition des variables d'environnement
ENV MYSQL_ROOT_PASSWORD=Tennis1234@!
ENV MYSQL_DATABASE=volunteeze

COPY Volunteeze.sql /docker-entrypoint-initdb.d/

RUN chmod 644 /docker-entrypoint-initdb.d/Volunteeze.sql

# Configuration de la vérification d'état de santé
HEALTHCHECK --interval=30s --timeout=5s \
  CMD curl --fail http://localhost:5000/health || exit 1

# Exposition du port 3306
EXPOSE 3306

# Démarrage de MySQL
CMD ["mysqld"]