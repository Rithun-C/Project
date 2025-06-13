from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional

from app.db.session import get_db
from app.schemas.student import StudentCreate, StudentUpdate, StudentResponse, StudentListResponse
from app.services.student_service import StudentService
from app.services.auth_service import AuthService
from app.api.v1.auth import oauth2_scheme

router = APIRouter()

@router.post("/", response_model=StudentResponse)
async def create_student(
    student_data: StudentCreate,
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    """Create a new student (Admin/Teacher only)"""
    current_user = AuthService.get_current_user(db, token)
    if not current_user or current_user.user_type not in ["admin", "teacher"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admins and teachers can create students"
        )
    
    # Check if student already exists
    if StudentService.get_student_by_email(db, student_data.email):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Student with this email already exists"
        )
    
    student = StudentService.create_student(db, student_data)
    return student

@router.get("/", response_model=List[StudentListResponse])
async def get_students(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    section_id: Optional[int] = None,
    department_id: Optional[int] = None,
    search: Optional[str] = None,
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    """Get list of students with filtering options"""
    current_user = AuthService.get_current_user(db, token)
    if not current_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication required"
        )
    
    students = StudentService.get_students(
        db, 
        skip=skip, 
        limit=limit,
        section_id=section_id,
        department_id=department_id,
        search=search
    )
    return students

@router.get("/{student_id}", response_model=StudentResponse)
async def get_student(
    student_id: int,
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    """Get student by ID"""
    current_user = AuthService.get_current_user(db, token)
    if not current_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication required"
        )
    
    # Students can only view their own profile
    if current_user.user_type == "student" and current_user.id != student_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only view your own profile"
        )
    
    student = StudentService.get_student_by_id(db, student_id)
    if not student:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Student not found"
        )
    
    return student

@router.put("/{student_id}", response_model=StudentResponse)
async def update_student(
    student_id: int,
    student_update: StudentUpdate,
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    """Update student information"""
    current_user = AuthService.get_current_user(db, token)
    if not current_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication required"
        )
    
    # Check permissions
    if (current_user.user_type == "student" and current_user.id != student_id) and \
       current_user.user_type not in ["admin", "teacher"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Insufficient permissions"
        )
    
    student = StudentService.update_student(db, student_id, student_update)
    if not student:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Student not found"
        )
    
    return student

