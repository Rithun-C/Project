from fastapi import APIRouter
from app.api.v1 import auth

router = APIRouter()

# Include your authentication-related routes
router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
