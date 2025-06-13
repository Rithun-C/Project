from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.schemas.department import DepartmentListResponse, DepartmentUpdate
from app.schemas.department import DepartmentCreate, DepartmentResponse
from app.db.session import get_db
from app.api.v1.auth import oauth2_scheme
from app.services.department_service import DepartmentService
from app.services.auth_service import AuthService

router = APIRouter(prefix="/departments", tags=["departments"])

@router.post("/", response_model=DepartmentResponse)
async def create_department(
    department_data: DepartmentCreate,
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    """Create a new department (Admin/Teacher only)"""
    current_user = AuthService.get_current_user(db, token)
    if not current_user or current_user.user_type not in ["admin", "teacher"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admins and teachers can create departments"
        )
    
    # Check if department already exists
    if DepartmentService.get_department_by_name(db, department_data.name):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="department with this email already exists"
        )
    
    department = DepartmentService.create_department(db, department_data)
    return department

@router.get("/", response_model=List[DepartmentListResponse])
async def get_departments(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    search: Optional[str] = None,
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    """Get list of departments with filtering options"""
    current_user = AuthService.get_current_user(db, token)
    if not current_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication required"
        )
    
    departments = DepartmentService.get_departments(
        db, 
        skip=skip, 
        limit=limit,
        search=search
    )
    return departments

@router.get("/{department_id}", response_model=DepartmentResponse)
async def get_department(
    department_id: int,
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    """Get department by ID"""
    current_user = AuthService.get_current_user(db, token)
    if not current_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication required"
        )
    
    # departments can only view their own profile
    if current_user.user_type == "department" and current_user.id != department_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only view your own profile"
        )
    
    department = DepartmentService.get_department_by_id(db, department_id)
    if not department:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="department not found"
        )
    
    return department

@router.put("/{department_id}", response_model=DepartmentResponse)
async def update_department(
    department_id: int,
    department_update: DepartmentUpdate,
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    """Update department information"""
    current_user = AuthService.get_current_user(db, token)
    if not current_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication required"
        )
    
    # Check permissions
    if current_user.user_type not in ["admin"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Insufficient permissions"
        )
    
    department = DepartmentService.update_department(db, department_id, department_update)
    if not department:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="department not found"
        )
    
    return department

