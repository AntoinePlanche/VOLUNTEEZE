from peewee import *
from .Base import BaseModel
import datetime


class Compte(BaseModel):
    id = PrimaryKeyField(null=False)
    email = CharField(max_length=150)
    date_inscription = DateTimeField()

    class Meta:
        db_table = 'Compte'


async def create_compte(email: str):

    compte_object = Compte(
        email=email,
        date_inscription=datetime.datetime.now()
    )
    compte_object.save()
    return compte_object


def get_compte(id: int):
    return Compte.filter(Compte.id == id).first()


def list_compte(skip: int = 0, limit: int = 100):
    return list(Compte.select().offset(skip).limit(limit))


def delete_compte(id: int):
    return Compte.delete().where(Compte.id == id).execute()
