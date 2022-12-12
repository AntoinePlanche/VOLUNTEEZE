import mysql.connector
import datetime
import pandas as pd
from models import CreateBenevoles, AssignTypesMissions

def getConnectionFromServer():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="Tennis1234@!",
        port="3306",
        database="volunteeze")

def getDynamicNewBenevoleID():
    connection = getConnectionFromServer()
    df = pd.read_sql(
        """SELECT
            id_benevole
        FROM
            BENEVOLES
        ORDER BY
            id_benevole DESC
        LIMIT 1
        ;"""
        , connection)
    if (len(df) == 0):
        return "0"
    return str(df['id_benevole'][0] + 1)

def postBenevole(benevole : CreateBenevoles):
    jour_actuel = datetime.date.today()
    new_benevole_id = getDynamicNewBenevoleID()
    connection = getConnectionFromServer()
    parameters = {
        "id_benevole": new_benevole_id,
        "email": benevole.email,
        "nom": benevole.nom,
        "prenom": benevole.prenom,
        "date_de_naissance": benevole.date_de_naissance,
        "sexe" :benevole.sexe,
        "adresse": benevole.adresse,
        "telephone": benevole.telephone,
        "date_inscription": str(jour_actuel),
        "veut_etre_contacter": benevole.veut_etre_contacter,
    }
    mycursor = connection.cursor()
    sql = """INSERT INTO
            BENEVOLES(id_benevole, email, nom, prenom, date_de_naissance, sexe, adresse, telephone, date_inscription, veut_etre_contacter)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s);"""
            
    mycursor.execute(sql, (parameters["id_benevole"], parameters["email"], parameters["nom"], parameters["prenom"], parameters["date_de_naissance"], parameters["sexe"], parameters["adresse"], parameters["telephone"], parameters["date_inscription"], parameters["veut_etre_contacter"]))
    connection.commit()
    return new_benevole_id

def postTypeMissions(type_missions : AssignTypesMissions):
    connection = getConnectionFromServer()
    mycursor = connection.cursor()
    df = pd.read_sql(
        """SELECT
            id_benevole
        FROM
            BENEVOLES
        WHERE
            email = '"""+ type_missions.email + """'
        ;"""
        , connection)
    id_benevole = df.loc[0][0]
    if(type_missions.sport == True):
        sql = """INSERT INTO 
                    BENEVOLES_INTERETS
                VALUES(
                    """ + str(id_benevole) + """,
                    """ + str(1) + """
                )
            ;"""
        mycursor.execute(sql)
    if(type_missions.aide_alimentaire == True):
        sql = """INSERT INTO 
                    BENEVOLES_INTERETS
                VALUES(
                    """ + str(id_benevole) + """,
                    """ + str(2) + """
                )
            ;"""
        mycursor.execute(sql)
    if(type_missions.culturelle == True):
        sql = """INSERT INTO 
                    BENEVOLES_INTERETS
                VALUES(
                    """ + str(id_benevole) + """,
                    """ + str(3) + """
                )
            ;"""
        mycursor.execute(sql)
    if(type_missions.solidarite == True):
        sql = """INSERT INTO 
                    BENEVOLES_INTERETS
                VALUES(
                    """ + str(id_benevole) + """,
                    """ + str(4) + """
                )
            ;"""
        mycursor.execute(sql)
    if(type_missions.solidarite == True):
        sql = """INSERT INTO 
                    BENEVOLES_INTERETS
                VALUES(
                    """ + str(id_benevole) + """,
                    """ + str(5) + """
                )
            ;"""
        mycursor.execute(sql)
    connection.commit()
    return "1"
        
        
     