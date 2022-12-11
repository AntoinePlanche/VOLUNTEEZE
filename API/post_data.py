import mysql.connector
import datetime
import pandas as pd
from benevoles import Benevoles

def getConnectionFromServer():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="Tennis1234@!",
        port="3306",
        database="volunteeze")

def getDynamicNewUserID():
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

def postUser(user : Benevoles):
    jour_actuel = datetime.date.today()
    new_user_id = getDynamicNewUserID()
    connection = getConnectionFromServer()
    mycursor = connection.cursor()
    sql = """INSERT INTO
            BENEVOLES (id_benevole, email, nom, prenom, date_de_naissance, sexe, adresse, telephone, date_inscription)
        VALUES (
            '"""+ new_user_id +"""',
            '"""+ user.email +"""',
            '"""+ user.nom +"""',
            '"""+ user.prenom +"""',
            '"""+ str(user.date_de_naissance) +"""',
            '"""+ user.sexe +"""',
            '"""+ user.adresse +"""',
            '"""+ user.telephone +"""',
            '"""+ str(jour_actuel) +"""');"""
            
    mycursor.execute(sql)
    connection.commit()
    return new_user_id