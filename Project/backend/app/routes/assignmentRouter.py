from fastapi import APIRouter
from app.api.v1 import assignments

router = APIRouter()

# Include your authentication-related routes
router.include_router(assignments.router, prefix="/student", tags=["Authentication"])
