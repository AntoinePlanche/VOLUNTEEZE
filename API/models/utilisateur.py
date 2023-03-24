from peewee import *
from .Base import BaseModel
from compte import Compte


class Utilisateur(BaseModel):
    id = ForeignKeyField(Compte, related_name="id", null=False)
    nom = CharField(max_length=30)
    prenom = CharField(max_length=30)
    tel = CharField(max_length=13)
    sexe = CharField(max_length=1)
    date_de_naissance = DateField()
    description = TextField()
    photo = CharField(max_length=200)

    class Meta:
        db_table = 'Utilisateur'


async def create_utilisateur(nom: str, prenom: str, tel: str):

    utilisateur_object = Utilisateur(
        nom=nom,
        prenom=prenom,
        tel=tel
    )

    utilisateur_object.save()
    return utilisateur_object


def get_utilisateur(id: int):
    return Utilisateur.filter(Utilisateur.id == id).first()


def list_utilisateur(skip: int = 0, limit: int = 100):
    return list(Utilisateur.select().offset(skip).limit(limit))


def delete_utilisateur(id: int):
    return Utilisateur.delete().where(Utilisateur.id == id).execute()
