from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import *
from routers import utilisateur, association, compte

app = FastAPI(title='Volunteeze', description='APIs to access DB', version='0.1')

origins = [
    "http://localhost:3000",
    "http://localhost:3000/*",
    "http://localhost:3004",
    "http://localhost:3004/*"
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

app.include_router(utilisateur.router_utilisateur)
app.include_router(association.router_association)
app.include_router(compte.router_compte)

@app.on_event("startup")
async def startup():
    if conn.is_closed():
        conn.connect()
        
@app.on_event("shutdown")
async def shutdown():
    print("Closing...")
    if not conn.is_closed():
        conn.close()

    
    
