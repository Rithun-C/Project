from fastapi import APIRouter
from app.api.v1 import students

router = APIRouter()

# Include your authentication-related routes
router.include_router(students.router, prefix="/student", tags=["Authentication"])
