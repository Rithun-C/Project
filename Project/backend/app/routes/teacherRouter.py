from fastapi import APIRouter
from app.api.v1 import teachers

router = APIRouter()

# Include your authentication-related routes
router.include_router(teachers.router, prefix="/teacher", tags=["Authentication"])
