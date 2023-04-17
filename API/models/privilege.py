from peewee import *
from .Base import BaseModel
from compte import Compte


class Privilege(BaseModel):
    id = PrimaryKeyField(null=False)
    id_compte = ForeignKeyField(Compte)

    class Meta:
        table_name = "Privilege"


async def create_privilege(id_compte: int):
    privilege_object = Privilege(id_compte=id_compte)

    privilege_object.save()
    return privilege_object


def get_privilege(id: int):
    return Privilege.filter(Privilege.id == id).first()


def list_privilege(skip: int = 0, limit: int = 100):
    return list(Privilege.select().offset(skip).limit(limit))


def delete_privilege(id: int):
    return Privilege.delete().where(Privilege.id == id).execute()
