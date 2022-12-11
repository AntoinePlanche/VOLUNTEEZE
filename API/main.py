from fastapi import FastAPI
from post_data import postUser
from benevoles import Benevoles

app = FastAPI()

@app.get("/")
async def root():
 return {"greeting":"Hello world"}

@app.post("/api/create/user")
async def createUser(benevoles : Benevoles):
    print(1, 2)
    return postUser(benevoles)
    
    
