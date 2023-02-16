from typing import Any, List

import peewee
from fastapi import APIRouter, HTTPException, Response, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from models.benevoles import create_benevoles, get_benevoles, list_benevoles, delete_benevoles
from pydantic import BaseModel
from pydantic.utils import GetterDict

router_benevoles = APIRouter(
    prefix="/contacts",
    tags=["contacts"]
)

class PeeweeGetterDict(GetterDict):
    def get(self, key: Any, default: Any = None):
        res = getattr(self._obj, key, default)
        if isinstance(res, peewee.ModelSelect):
            return list(res)
        return res
    

class BenevolesModel(BaseModel):
    id:int
    nom:str
    prenom:str
    email:str
    tel:str

    class Config:
        orm_mode = True
        getter_dict = PeeweeGetterDict

@router_contacts.get("/", response_model=List[BenevolesModel], summary="List of contacts",
                     description="Returns all contacts")
def get_contacts():
    return list_benevoles()  
    
@router_contacts.post("/", response_model=BenevolesModel, summary="Create a new contact")
async def create(nom: str, prenom: str, email: str, telephone: str):
    return await create_benevoles(nom=nom, prenom=prenom, email=email, telephone=telephone)

def remove_benevoles(id: int):
    del_contact = delete_benevoles(id)
    if del_contact is None:
        return Response(status_code=404)
    return Response(status_code=200)

@router_contacts.get("/view/{id}", response_model=BenevolesModel, summary="Returns a single contact")
async def view(id: int):
    """
        To view all details related to a single contact
        - **id**: The integer id of the contact you want to view details.
    """
    contact = get_benevoles(id=id)
    if contact is None:
        raise HTTPException(status_code=404, detail="Contact not found")

    return contact