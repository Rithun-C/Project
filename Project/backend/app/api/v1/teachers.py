from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional

from app.db.session import get_db
from app.schemas.teacher import TeacherCreate, TeacherUpdate, TeacherResponse
from app.services.teacher_service import TeacherService
from app.services.auth_service import AuthService
from app.api.v1.auth import oauth2_scheme

router = APIRouter()

@router.post("/", response_model=TeacherResponse)
async def create_Teacher(
    teacher_data: TeacherCreate,
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    """Create a new Teacher (Admin)"""
    current_user = AuthService.get_current_user(db, token)
    if not current_user or current_user.user_type not in ["admin", "teacher"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admins can create teachers"
        )
    
    # Check if teacher already exists
    if TeacherService.get_teacher_by_email(db, teacher_data.email):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Teacher with this email already exists"
        )
    
    teacher = TeacherService.create_teacher(db, teacher_data)
    return teacher

@router.get("/", response_model=List[TeacherResponse])
async def get_teachers(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    section_id: Optional[int] = None,
    department_id: Optional[int] = None,
    search: Optional[str] = None,
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    """Get list of teachers with filtering options"""
    current_user = AuthService.get_current_user(db, token)
    if not current_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication required"
        )
    
    teachers = TeacherService.get_teachers(
        db, 
        skip=skip, 
        limit=limit,
        section_id=section_id,
        department_id=department_id,
        search=search
    )
    return teachers

@router.get("/{teacher_id}", response_model=TeacherResponse)
async def get_teacher(
    teacher_id: int,
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    """Get teacher by ID"""
    current_user = AuthService.get_current_user(db, token)
    if not current_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication required"
        )
    
    # Teachers can only view their own profile
    if current_user.user_type == "teacher" and current_user.id != teacher_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only view your own profile"
        )
    
    teacher = TeacherService.get_teacher_by_id(db, teacher_id)
    if not teacher:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Teacher not found"
        )
    
    return teacher

@router.put("/{teacher_id}", response_model=TeacherResponse)
async def update_teacher(
    teacher_id: int,
    teacher_update: TeacherUpdate,
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    """Update teacher information"""
    current_user = AuthService.get_current_user(db, token)
    if not current_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication required"
        )
    
    # Check permissions
    if (current_user.user_type == "teacher" and current_user.id != teacher_id) and \
       current_user.user_type not in ["admin"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Insufficient permissions"
        )
    
    teacher = TeacherService.update_teacher(db, teacher_id, teacher_update)
    if not teacher:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Teacher not found"
        )
    
    return teacher

