from typing import Any, List

import peewee
from fastapi import APIRouter, HTTPException, Response
from models.association import (
    create_association,
    get_association,
    list_associations,
    delete_association,
    update_association_adresse,
)
from pydantic import BaseModel
from pydantic.utils import GetterDict


router_association = APIRouter(prefix="/association", tags=["association"])


class PeeweeGetterDict(GetterDict):
    def get(self, key: Any, default: Any = None):
        res = getattr(self._obj, key, default)
        if isinstance(res, peewee.ModelSelect):
            return list(res)
        return res


class AssociationModel(BaseModel):
    id: int
    id_compte: int | None
    nom: str | None
    tel: str | None
    description: str | None
    adresse: str | None
    longitude: float | None
    latitude: float | None
    logo: str | None
    couverture: str | None

    class Config:
        orm_mode = True
        getter_dict = PeeweeGetterDict


class AssociationAdresseModel(BaseModel):
    id_compte: int
    adresse: str
    longitude: float
    latitude: float

    class Config:
        orm_mode = True
        getter_dict = PeeweeGetterDict


class AssociationRegisterModel(BaseModel):
    id_compte: int
    nom: str
    tel: str

    class Config:
        orm_mode = True
        getter_dict = PeeweeGetterDict


@router_association.get(
    "/",
    response_model=List[AssociationModel],
    summary="List of associations",
    description="Returns all associations!",
)
def get_associations():
    return list_associations()


@router_association.post(
    "/", response_model=AssociationRegisterModel, summary="Create a new association"
)
async def create(association: AssociationRegisterModel):
    return await create_association(
        id_compte=association.id_compte, nom=association.nom, tel=association.tel
    )


@router_association.post(
    "/adresse",
    response_model=AssociationAdresseModel,
    summary="modifie l'adresse d'une association",
)
async def update_adresse(association: AssociationAdresseModel):
    return await update_association_adresse(
        id=association.id_compte,
        adresse=association.adresse,
        latitude=association.latitude,
        longitude=association.longitude,
    )


@router_association.delete(
    "/remove/{id}",
    summary="Delete an individual association",
    response_class=Response,
    responses={
        200: {"description": "Association successfully deleted"},
        404: {"description": "Association not found"},
    },
)
def remove_association(id: int):
    del_association = delete_association(id)
    if del_association is None:
        return Response(status_code=404)
    return Response(status_code=200)


@router_association.get(
    "/view/{id}",
    response_model=AssociationModel,
    summary="Returns a single association",
)
async def view(id: int):
    """
    To view all details related to a single association
    - **id**: The integer id of the association you want to view details.
    """
    association = get_association(id)
    if association is None:
        raise HTTPException(status_code=404, detail="Association not found")

    return association
