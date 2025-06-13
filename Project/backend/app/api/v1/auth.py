from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import timedelta

from app.core.config import settings
from app.core.security import create_access_token, verify_password, get_password_hash
from app.db.session import get_db
from app.schemas.auth import Token, UserLogin, UserRegister, UserResponse
from app.services.auth_service import AuthService

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

@router.post("/login", response_model=Token)
async def login(
    form_data: UserLogin,
    db: Session = Depends(get_db)
):
    """Authenticate user and return access token"""
    user = AuthService.authenticate_user(db, form_data.email, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, 
        expires_delta=access_token_expires
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user_id": user.id
    }

@router.post("/register/teacher", response_model=UserResponse)
async def register_teacher(
    teacher_data: UserRegister,
    db: Session = Depends(get_db)
):
    """Register a new teacher"""
    # Check if user already exists
    existing_user = AuthService.get_user_by_email(db, teacher_data.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    teacher = AuthService.create_teacher(db, teacher_data)
    return UserResponse(
        id=teacher.id,
        email=teacher.email,
        name=teacher.name,
        user_type="teacher"
    )

@router.post("/register/student", response_model=UserResponse)
async def register_student(
    student_data: UserRegister,
    db: Session = Depends(get_db)
):
    """Register a new student"""
    existing_user = AuthService.get_user_by_email(db, student_data.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    student = AuthService.create_student(db, student_data)
    return UserResponse(
        id=student.id,
        email=student.email,
        name=student.name,
        user_type="student"
    )

@router.get("/me", response_model=UserResponse)
async def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    """Get current authenticated user details"""
    user = AuthService.get_current_user(db, token)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication token"
        )
    
    return UserResponse(
        id=user.id,
        email=user.email,
        name=user.name,
        user_type=user.user_type
    )

@router.post("/refresh")
async def refresh_token(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    """Refresh access token"""
    user = AuthService.get_current_user(db, token)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
        )
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email, "user_type": user.user_type},
        expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}