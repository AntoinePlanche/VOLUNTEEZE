from pydantic import BaseModel
import datetime

class Benevoles(BaseModel):
    nom : str
    prenom : str
    date_de_naissance : datetime.date
    sexe : str
    adresse : str
    email : str
    telephone : str
    