from peewee import *

host="localhost"
user="root"
password="root"
port=3306
database="volunteeze"

conn = MySQLDatabase(
    database = database,
    host = host,
    user=user,
    password=password,
    port=port
)