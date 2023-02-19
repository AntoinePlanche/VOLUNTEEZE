from typing import Any, List

import peewee
from fastapi import APIRouter, HTTPException, Response, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from models.benevoles import create_benevole, get_benevole, list_benevoles, delete_benevole
from pydantic import BaseModel
from pydantic.utils import GetterDict

router_benevoles = APIRouter(
    prefix="/benevoles",
    tags=["benevoles"]
)

class PeeweeGetterDict(GetterDict):
    def get(self, key: Any, default: Any = None):
        res = getattr(self._obj, key, default)
        if isinstance(res, peewee.ModelSelect):
            return list(res)
        return res
    

class BenevolesModel(BaseModel):
    nom:str
    prenom:str
    email:str
    telephone:str

    class Config:
        orm_mode = True
        getter_dict = PeeweeGetterDict

@router_benevoles.get("/", response_model=List[BenevolesModel], summary="List of benevoles",
                     description="Returns all benevoles")
def get_benevole():
    return list_benevoles()  
    
@router_benevoles.post("/", response_model=BenevolesModel, summary="Create a new benevole")
async def create(benevole : BenevolesModel):
    print("here")
    return await create_benevole(nom=benevole.nom, prenom=benevole.prenom, email=benevole.email, telephone=benevole.telephone)

def remove_benevoles(id: int):
    del_benevole = delete_benevole(id)
    if del_benevole is None:
        return Response(status_code=404)
    return Response(status_code=200)

@router_benevoles.get("/view/{id}", response_model=BenevolesModel, summary="Returns a single benevole")
async def view(id: int):
    """
        To view all details related to a single benevole
        - **id**: The integer id of the benevole you want to view details.
    """
    benevole = get_benevole(id=id)
    if benevole is None:
        raise HTTPException(status_code=404, detail="Benevole not found")

    return benevole