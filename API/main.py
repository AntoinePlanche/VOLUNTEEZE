from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import *
from routers import benevoles, associations

app = FastAPI(title='Volunteeze', description='APIs to access DB', version='0.1')

origins = [
    "http://localhost:3000",
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
app.include_router(associations.router_associations)

@app.on_event("startup")
async def startup():
    if conn.is_closed():
        conn.connect()
        
@app.on_event("shutdown")
async def shutdown():
    print("Closing...")
    if not conn.is_closed():
        conn.close()

    
    
