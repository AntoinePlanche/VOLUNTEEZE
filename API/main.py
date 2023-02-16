from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import *
from routers import benevoles
#from models import CreateBenevoles, AssignTypesMissions

app = FastAPI(title='Volunteeze', description='APIs to access DB', version='0.1')

origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:3000/register",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Contact Applications!"}

app.include_router(benevoles.router_benevoles)

@app.on_event("startup")
async def startup():
    if conn.is_closed():
        conn.connect()
        
@app.on_event("shutdown")
async def shutdown():
    print("Closing...")
    if not conn.is_closed():
        conn.close()
        
"""
@app.get("/")
async def root():
 return {"greeting":"Hello world"}

@app.post("/api/create/benevole")
async def createUser(benevole : CreateBenevoles):
    return postBenevole(benevole)

@app.post("/api/assign/typesmissions")
async def createUser(type_missions : AssignTypesMissions):
    return postTypeMissions(type_missions);

"""

    
    
