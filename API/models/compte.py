from peewee import *
from .Base import BaseModel
import datetime


class Compte(BaseModel):
    id = PrimaryKeyField(null=False)
    email = CharField(max_length=150)
    date_inscription = DateTimeField()
    type_compte = IntegerField(null=False) # 0->association, 1->utilisateur 
    class Meta:
        db_table = 'Compte'


async def create_compte(email: str, type_compte : int):

    compte_object = Compte(
        email=email,
        date_inscription=datetime.datetime.now(),
        type_compte = type_compte
    )
    compte_object.save()
    return Compte.filter(Compte.email == email).first()


def get_compte(id: int):
    return Compte.filter(Compte.id == id).first()

def get_compte_by_email(email: str):
    return Compte.filter(Compte.email == email).first()

def list_comptes(skip: int = 0, limit: int = 100):
    return list(Compte.select().offset(skip).limit(limit))


def delete_compte(id: int):
    return Compte.delete().where(Compte.id == id).execute()
