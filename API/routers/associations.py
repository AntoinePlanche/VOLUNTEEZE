from typing import Any, List

import peewee
from fastapi import APIRouter, HTTPException, Response, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from models.associations import create_association, get_association, list_associations, delete_association
from pydantic import BaseModel
from pydantic.utils import GetterDict

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
    nom:str
    email:str
    telephone:str

    class Config:
        orm_mode = True
        getter_dict = PeeweeGetterDict

@router_associations.get("/", response_model=List[AssociationsModel], summary="List of associations",
                     description="Returns all associations")
def get_associations():
    return list_associations()
    
@router_associations.post("/", response_model=AssociationsModel, summary="Create a new association")
async def create(association : AssociationsModel):
    return await create_association(nom=association.nom, email=association.email, telephone=association.telephone)

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