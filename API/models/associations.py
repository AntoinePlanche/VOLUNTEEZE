from peewee import *
from .Base import BaseModel
import datetime


class Associations(BaseModel):
    id_association = PrimaryKeyField(null=False)
    email = CharField(max_length=100)
    nom = CharField(max_length=30)
    adresse = CharField(max_length=100)
    telephone = CharField(max_length=13)
    logo = TextField()
    photo_couverture = TextField()
    date_inscription = DateTimeField()
    description = TextField()

    class Meta:
        db_table = 'associations'

    
async def create_association(nom: str, email: str, telephone: str):
    
    association_object = Associations(
        nom=nom,
        email=email,
        telephone=telephone,
        date_inscription = datetime.datetime.now()
    )
    
    association_object.save()
    return association_object


def get_association(id: int):
    return Associations.filter(Associations.id == id).first()


def list_associations(skip: int = 0, limit: int = 100):
    return list(Associations.select().offset(skip).limit(limit))


def delete_association(id: int):
    return Associations.delete().where(Associations.id == id).execute()      