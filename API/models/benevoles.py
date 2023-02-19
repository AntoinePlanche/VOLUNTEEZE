from peewee import *
from .Base import BaseModel
import datetime


class Benevoles(BaseModel):
    id_benevole = PrimaryKeyField(null=False)
    email = CharField(max_length=100)
    nom = CharField(max_length=30)
    prenom = CharField(max_length=30)
    date_de_naissance = DateField()
    sexe = CharField(max_length=1)
    adresse = CharField(max_length=100)
    telephone = CharField(max_length=13)
    date_inscription = DateTimeField()
    photo_profil = CharField(max_length=255)
    description = TextField()
    veut_etre_contacter = BooleanField()

    class Meta:
        db_table = 'benevoles'

    
async def create_benevoles(nom: str, prenom: str, email: str, telephone: str):
    
    benevoles_object = Benevoles(
        nom=nom,
        prenom=prenom,
        email=email,
        telephone=telephone,
        date_inscription = datetime.datetime.now()
    )
    
    benevoles_object.save()
    return benevoles_object


def get_benevoles(id: int):
    return Benevoles.filter(Benevoles.id == id).first()


def list_benevoles(skip: int = 0, limit: int = 100):
    return list(Benevoles.select().offset(skip).limit(limit))


def delete_benevoles(id: int):
    return Benevoles.delete().where(Benevoles.id == id).execute()
   
        