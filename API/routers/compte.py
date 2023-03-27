from typing import Any, List

import peewee
from fastapi import APIRouter, HTTPException, Response
from models.compte import create_compte, get_compte, get_compte_by_email, list_comptes, delete_compte
from models.utilisateur import delete_utilisateur
from models.association import delete_association
from pydantic import BaseModel
from pydantic.utils import GetterDict
import datetime

router_compte = APIRouter(
    prefix="/compte",
    tags=["compte"]
)

class PeeweeGetterDict(GetterDict):
    def get(self, key: Any, default: Any = None):
        res = getattr(self._obj, key, default)
        if isinstance(res, peewee.ModelSelect):
            return list(res)
        return res
    

class CompteModel(BaseModel):
    id:int | None
    email:str | None
    date_inscription:datetime.datetime | None
    type_compte:int | None

    class Config:
        orm_mode = True
        getter_dict = PeeweeGetterDict


class CompteRegisterModel(BaseModel):
    email:str | None
    type_compte:int | None

    class Config:
        orm_mode = True
        getter_dict = PeeweeGetterDict


@router_compte.get("/", response_model=List[CompteModel], summary="List of accounts",
                     description="Returns all accounts")
def get_comptes():
    return list_comptes()


@router_compte.post("/", response_model=CompteModel, summary="Create a new account")
async def create(compte : CompteRegisterModel):
    return await create_compte(email = compte.email, type_compte=compte.type_compte)


@router_compte.delete(
    "/remove/{id}",
    summary="Delete an individual account and the corresponding register in table 'association' or 'utilisateur'",
    response_class=Response,
    responses={
        200: {"description": "Account successfully deleted"},
        404: {"description": "Account not found"},
    },
)
def remove_compte(id: int):
    compte = get_compte(id)
    if compte.type_compte == 0:
        del_association = delete_association(id)
    else:
        del_utilisateur = delete_utilisateur(id)
    del_compte = delete_compte(id)
    if del_compte is None or del_association is None or del_utilisateur is None:
        return Response(status_code=404)
    return Response(status_code=200)


@router_compte.get("/view/{id}", response_model=CompteModel, summary="Returns a single account")
async def view(id: int):
    """
        To view all details related to a single account
        - **id**: The integer id of the account you want to view details.
    """
    compte = get_compte(id=id)
    if compte is None:
        raise HTTPException(status_code=404, detail="Account not found")

    return compte

@router_compte.get("/view/{email}", response_model=CompteModel, summary="Returns a single account")
async def view(email: str):
    """
        To view all details related to a single account
        - **email**: The string email of the account you want to view details.
    """
    compte = get_compte_by_email(email=email)
    if compte is None:
        raise HTTPException(status_code=404, detail="Account not found")

    return compte