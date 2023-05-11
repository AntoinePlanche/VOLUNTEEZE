from peewee import *
from .Base import BaseModel
from .compte import Compte


class Association(BaseModel):
    id = AutoField(primary_key=True)
    compte = ForeignKeyField(
        Compte, column_name="id_compte", on_delete="CASCADE", on_update="CASCADE"
    )
    nom = CharField(max_length=30)
    tel = CharField(max_length=13)
    description = TextField()
    adresse = CharField(max_length=100)
    longitude = FloatField()
    latitude = FloatField()
    logo = TextField()
    couverture = TextField()

    class Meta:
        table_name = "Association"


async def create_association(id_compte: int, nom: str, tel: str):
    association_object = Association(compte=id_compte, nom=nom, tel=tel)

    association_object.save()
    return association_object


async def update_association_adresse(id, adresse, latitude, longitude):
    association_object = Association(
        compte=id, adresse=adresse, latitude=latitude, longitude=longitude
    )

    qry = Association.update(
        {
            Association.adresse: adresse,
            Association.latitude: latitude,
            Association.longitude: longitude,
        }
    ).where(Association.compte == id)
    qry.execute()
    return association_object


def get_association(id: int):
    return Association.filter(Association.compte == id).first()


def list_associations(skip: int = 0, limit: int = 100):
    return list(Association.select().offset(skip).limit(limit))


def delete_association(id: int):
    return Association.delete().where(Association.compte == id).execute()
