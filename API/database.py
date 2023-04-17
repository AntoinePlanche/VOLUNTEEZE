from peewee import *

host="localhost"
user="root"
password="Tennis1234@!"
port=3306
database="volunteeze"

conn = MySQLDatabase(
    database=database, host=host, user=user, password=password, port=port
)
