from peewee import *
from .Base import BaseModel
from .compte import Compte


class Utilisateur(BaseModel):
    id = AutoField(primary_key=True)
    compte = ForeignKeyField(Compte, column_name = "id_compte", on_delete='CASCADE', on_update='CASCADE')
    nom = CharField(max_length=50)
    prenom = CharField(max_length=50)
    tel = CharField(max_length=13)
    sexe = CharField(max_length=1, null=True)
    date_naissance = DateField(null=True)
    description = TextField(null=True)
    photo = CharField(max_length=200, null=True)

    class Meta:
        table_name = 'Utilisateur'


async def create_utilisateur(id_compte: int, nom: str, prenom: str, tel: str):

    utilisateur_object = Utilisateur(
        compte=id_compte,
        nom=nom,
        prenom=prenom,
        tel=tel
    )
    utilisateur_object.save()
    return utilisateur_object


def get_utilisateur(id: int):
    return Utilisateur.filter(Utilisateur.compte == id).first()


def list_utilisateurs(skip: int = 0, limit: int = 100):
    return list(Utilisateur.select().offset(skip).limit(limit))


def delete_utilisateur(id: int):
    return Utilisateur.delete().where(Utilisateur.compte == id).execute()
