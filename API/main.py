from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from post_data import postBenevole, postTypeMissions
from models import CreateBenevoles, AssignTypesMissions

app = FastAPI()

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
 return {"greeting":"Hello world"}

@app.post("/api/create/benevole")
async def createUser(benevole : CreateBenevoles):
    return postBenevole(benevole)

@app.post("/api/assign/typesmissions")
async def createUser(typeMissions : AssignTypesMissions):
    return postTypeMissions(typeMissions);
    
    
