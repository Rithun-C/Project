from fastapi import FastAPI
from app.routes import authRouter
from app.db.init_db import init_db
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


init_db()

@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI!"}

# Include the authentication router
app.include_router(authRouter.router)
