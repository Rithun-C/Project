from fastapi import FastAPI
from app.routes import authRouter
app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI!"}

# Include the authentication router
app.include_router(authRouter.router)
