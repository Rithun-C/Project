from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional

from app.db.session import get_db
from app.schemas.assignment import AssignmentCreate, AssignmentUpdate, AssignmentResponse, AssignmentListResponse
from app.services.assignment_service import AssignmentService
from app.services.auth_service import AuthService
from app.api.v1.auth import oauth2_scheme

router = APIRouter()

@router.post("/", response_model=AssignmentResponse)
async def create_assignment(
    assignment_data: AssignmentCreate,
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    """Create a new assignment (Admin/Teacher only)"""
    current_user = AuthService.get_current_user(db, token)
    if not current_user or current_user.user_type not in ["admin", "teacher"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admins and teachers can create assignments"
        )
    
    # Check if assignment already exists
    if AssignmentService.get_assignment_by_name(db, assignment_data.name):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="assignment with this email already exists"
        )
    
    assignment = AssignmentService.create_assignment(db, assignment_data)
    return assignment

@router.get("/", response_model=List[AssignmentListResponse])
async def get_assignments(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    section_id: Optional[int] = None,
    subject_id: Optional[int] = None,
    search: Optional[str] = None,
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    """Get list of assignments with filtering options"""
    current_user = AuthService.get_current_user(db, token)
    if not current_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication required"
        )
    
    assignments = AssignmentService.get_assignments(
        db, 
        skip=skip, 
        limit=limit,
        section_id=section_id,
        subject_id=subject_id,
        search=search
    )
    return assignments

@router.get("/{assignment_id}", response_model=AssignmentResponse)
async def get_assignment(
    assignment_id: int,
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    """Get assignment by ID"""
    current_user = AuthService.get_current_user(db, token)
    if not current_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication required"
        )
    
    # assignments can only view their own profile
    if current_user.user_type == "teacher" :
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only view your own profile"
        )
    
    assignment = AssignmentService.get_assignment_by_id(db, assignment_id)
    if not assignment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="assignment not found"
        )
    
    return assignment

@router.put("/{assignment_id}", response_model=AssignmentResponse)
async def update_assignment(
    assignment_id: int,
    assignment_update: AssignmentUpdate,
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    """Update assignment information"""
    current_user = AuthService.get_current_user(db, token)
    if not current_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication required"
        )
    
    # Check permissions
    if (current_user.user_type == "teacher" ) and \
       current_user.user_type not in ["admin"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Insufficient permissions"
        )
    
    assignment = AssignmentService.update_assignment(db, assignment_id, assignment_update)
    if not assignment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="assignment not found"
        )
    
    return assignment

