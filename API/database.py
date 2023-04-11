from peewee import *
from dotenv import load_dotenv, dotenv_values
import os

host="localhost"
user="root"
password="root"
port=3306
database="volunteeze"

conn = MySQLDatabase(
    database=database,
    user=user,
    password=password,
    unix_socket=unix_socket_path
)