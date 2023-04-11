from peewee import *
from dotenv import load_dotenv, dotenv_values
import os

load_dotenv()

user=os.environ.get("DATABASE_USERNAME")
password=os.environ.get("DATABASE_PASSWORD")
database=os.environ.get("DATABASE_NAME")
unix_socket_path=os.environ.get("INSTANCE_UNIX_SOCKET")

conn = MySQLDatabase(
    database=database,
    user=user,
    password=password,
    unix_socket=unix_socket_path
)