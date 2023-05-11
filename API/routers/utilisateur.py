from typing import Any, List

import peewee
from fastapi import APIRouter, HTTPException, Response
from models.utilisateur import (
    create_utilisateur,
    get_utilisateur,
    list_utilisateurs,
    delete_utilisateur,
)
from pydantic import BaseModel, validator
from pydantic.utils import GetterDict
import datetime

router_utilisateur = APIRouter(prefix="/utilisateur", tags=["utilisateur"])


class PeeweeGetterDict(GetterDict):
    def get(self, key: Any, default: Any = None):
        res = getattr(self._obj, key, default)
        if isinstance(res, peewee.ModelSelect):
            return list(res)
        return res


class UtilisateurModel(BaseModel):
    id: int
    id_compte: int | None
    nom: str | None
    prenom: str | None
    tel: str | None
    sexe: str | None
    date_de_naissance: datetime.datetime | None
    description: str | None
    photo: str | None

    class Config:
        orm_mode = True
        getter_dict = PeeweeGetterDict


class UtilisateurRegisterModel(BaseModel):
    id_compte: int
    nom: str
    prenom: str
    tel: str

    class Config:
        orm_mode = True
        getter_dict = PeeweeGetterDict


@router_utilisateur.get(
    "/",
    response_model=List[UtilisateurModel],
    summary="List of users",
    description="Returns all users",
)
def get_utilisateurs():
    return list_utilisateurs()


@router_utilisateur.post(
    "/", response_model=UtilisateurRegisterModel, summary="Create a new user"
)
async def create(utilisateur: UtilisateurRegisterModel):
    return await create_utilisateur(
        id_compte=utilisateur.id_compte,
        nom=utilisateur.nom,
        prenom=utilisateur.prenom,
        tel=utilisateur.tel,
    )


@router_utilisateur.delete(
    "/remove/{id}",
    summary="Delete an individual user",
    response_class=Response,
    responses={
        200: {"description": "User successfully deleted"},
        404: {"description": "User not found"},
    },
)
def remove_utilisateur(id: int):
    del_utilisateur = delete_utilisateur(id)
    if del_utilisateur is None:
        return Response(status_code=404)
    return Response(status_code=200)


@router_utilisateur.get(
    "/view/{id}", response_model=UtilisateurModel, summary="Returns a single user"
)
async def view(id: int):
    """
    To view all details related to a single user
    - **id**: The integer id of the user you want to view details.
    """
    utilisateur = get_utilisateur(id=id)
    if utilisateur is None:
        raise HTTPException(status_code=404, detail="User not found")

    return utilisateur
