from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional

from app.db.session import get_db
from app.schemas.quiz import QuizCreate, QuizUpdate, QuizResponse, QuizListResponse
from app.services.quiz_service import QuizService
from app.services.auth_service import AuthService
from app.api.v1.auth import oauth2_scheme

router = APIRouter()

@router.post("/", response_model=QuizResponse)
async def create_quiz(
    quiz_data: QuizCreate,
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    """Create a new quiz (Admin/Teacher only)"""
    current_user = AuthService.get_current_user(db, token)
    if not current_user or current_user.user_type not in ["admin", "teacher"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admins and teachers can create quizs"
        )
    
    # Check if quiz already exists
    if QuizService.get_quiz_by_name(db, quiz_data.name):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="quiz with this email already exists"
        )
    
    quiz = QuizService.create_quiz(db, quiz_data)
    return quiz

@router.get("/", response_model=List[QuizListResponse])
async def get_quizs(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    section_id: Optional[int] = None,
    subject_id: Optional[int] = None,
    search: Optional[str] = None,
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    """Get list of quizs with filtering options"""
    current_user = AuthService.get_current_user(db, token)
    if not current_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication required"
        )
    
    quizs = QuizService.get_quizzes(
        db, 
        skip=skip, 
        limit=limit,
        section_id=section_id,
        subject_id=subject_id,
        search=search
    )
    return quizs

@router.get("/{quiz_id}", response_model=QuizResponse)
async def get_quiz(
    quiz_id: int,
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    """Get quiz by ID"""
    current_user = AuthService.get_current_user(db, token)
    if not current_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication required"
        )
    
    quiz = QuizService.get_quiz_by_id(db, quiz_id)
    if not quiz:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="quiz not found"
        )
    
    return quiz

@router.put("/{quiz_id}", response_model=QuizResponse)
async def update_quiz(
    quiz_id: int,
    quiz_update: QuizUpdate,
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    """Update quiz information"""
    current_user = AuthService.get_current_user(db, token)
    if not current_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication required"
        )
    
    # Check permissions
    if (current_user.user_type == "teacher" ) and \
       current_user.user_type not in ["admin", "teacher"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Insufficient permissions"
        )
    
    quiz = QuizService.update_quiz(db, quiz_id, quiz_update)
    if not quiz:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="quiz not found"
        )
    
    return quiz

