from typing import Any, List

import peewee
from fastapi import APIRouter, HTTPException, Response, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from models.association import create_association, get_association, list_associations, delete_association, update_association_adresse
from pydantic import BaseModel
from pydantic.utils import GetterDict
import datetime

router_associations = APIRouter(
    prefix="/associations",
    tags=["associations"]
)

class PeeweeGetterDict(GetterDict):
    def get(self, key: Any, default: Any = None):
        res = getattr(self._obj, key, default)
        if isinstance(res, peewee.ModelSelect):
            return list(res)
        return res

class AssociationsModel(BaseModel):
    id: int
    nom:str | None
    tel:str | None
    adresse:str | None
    description:str | None
    lng:float | None
    lat:float | None
    logo:str | None
    photo_couverture:str | None


    class Config:
        orm_mode = True
        getter_dict = PeeweeGetterDict

class AssociationsAdresseModel(BaseModel):
    id:int
    adresse:str
    lng:float
    lat:float

    class Config:
        orm_mode = True
        getter_dict = PeeweeGetterDict

class AssociationsRegisterModel(BaseModel):
    nom:str
    tel:str 

    class Config:
        orm_mode = True
        getter_dict = PeeweeGetterDict

@router_associations.get("/", response_model=List[AssociationsModel], summary="List of associations",
                     description="Returns all associations")
def get_associations():
    return list_associations()


@router_associations.post("/", response_model=AssociationsRegisterModel, summary="Create a new association")
async def create(association : AssociationsRegisterModel):
    return await create_association(nom=association.nom, tel=association.tel)


@router_associations.post("/adresse", response_model=AssociationsAdresseModel, summary="modifie l'adresse d'une association")
async def update_adresse(association : AssociationsAdresseModel):
    print(association)
    return await update_association_adresse(id=association.id, adresse=association.adresse, lat=association.lat, lng=association.lng)


def remove_associations(id: int):
    del_association = delete_association(id)
    if del_association is None:
        return Response(status_code=404)
    return Response(status_code=200)


@router_associations.get("/view/{id}", response_model=AssociationsModel, summary="Returns a single association")
async def view(id: int):
    """
        To view all details related to a single association
        - **id**: The integer id of the association you want to view details.
    """
    association = get_association(id)
    if association is None:
        raise HTTPException(status_code=404, detail="Association not found")

    return association