import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from fastapi.testclient import TestClient

from main import app

client = TestClient(app)

def test_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello Word!"}

'''
def test_create_compte():
    data = {
        "email": "jean.dupont@example.com",
        "type_compte": 1
    }
    response = client.post("/compte", json=data)
    assert response.status_code == 200
    assert response.json()["email"] == data["email"]
    assert response.json()["type_compte"] == data["type_compte"]
    
    
def test_get_compte():
    response = client.get("/compte/viewbyemail/jean.dupont@example.com")
    assert response.status_code == 200
    assert response.json()["email"] == "jean.dupont@example.com"
    assert response.json()["type_compte"] == 1
    

def test_delete_compte():
    preresponse = client.get("/compte/viewbyemail/jean.dupont@example.com")
    id_compte = preresponse.json()["id"]
    response = client.delete(f"compte/remove/{id_compte}")
    assert response.status_code == 200
    assert response.text  == "Account successfully deleted"
'''