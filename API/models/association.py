from peewee import *
from .Base import BaseModel
from compte import Compte


class Association(BaseModel):
    id = ForeignKeyField(Compte, related_name="id", null=False)
    nom = CharField(max_length=30)
    tel = CharField(max_length=13)
    adresse = CharField(max_length=100)
    description = TextField()
    lng = FloatField()
    lat = FloatField()
    logo = TextField()
    photo_couverture = TextField() 
    

    class Meta:
        db_table = 'Association'

    
async def create_association(nom: str, tel: str):
    
    association_object = Association(
        nom=nom,
        tel=tel
    )
    
    association_object.save()
    return association_object

async def update_association_adresse(id, adresse, lat, lng):
    association_object = Association(
        id=id,
        adresse=adresse,
        lat=lat,
        lng=lng
    )
    
    qry=Association.update({Association.adresse:adresse, Association.lat:lat, Association.lng:lng}).where(Association.id==id)
    qry.execute()
    return association_object

def get_association(id: int):
    return Association.filter(Association.id_association == id).first()


def list_associations(skip: int = 0, limit: int = 100):
    return list(Association.select().offset(skip).limit(limit))


def delete_association(id: int):
    return Association.delete().where(Association.id_association == id).execute()      