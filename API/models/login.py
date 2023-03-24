from peewee import *
from .Base import BaseModel
from compte import Compte
import datetime

class Log(BaseModel):
    id = PrimaryKeyField(null=False)
    id_compte = ForeignKeyField(Compte, related_name="id")
    date = DateTimeField()

    class Meta:
        db_table = 'Log'

    
async def create_log(id_compte : int):
    
    log_object = Log(
        id_compte = id_compte,
        date = datetime.datetime.now()
    )
    
    log_object.save()
    return log_object


def get_privilege(id: int):
    return Log.filter(Log.id == id).first()


def list_privilege(skip: int = 0, limit: int = 100):
    return list(Log.select().offset(skip).limit(limit))


def delete_privilege(id: int):
    return Log.delete().where(Log.id == id).execute()
   
        