from pydantic import BaseModel
import datetime

class CreateBenevoles(BaseModel):
    nom : str
    prenom : str
    date_de_naissance : datetime.date
    sexe : str
    adresse : str
    email : str
    telephone : str
    veut_etre_contacter : bool

class AssignTypesMissions(BaseModel):
    email : str
    sport : bool
    aide_alimentaire : bool
    culturelle : bool
    solidarite : bool
    soutien_scolaire : bool