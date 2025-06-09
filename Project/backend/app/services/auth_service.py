# app/services/auth_service.py

from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from datetime import datetime, timedelta

from app.models.teacher import Teacher
from app.models.student import Student
from app.schemas.auth import UserRegister
from app.core.security import get_password_hash, verify_password
from app.core.config import settings

class AuthService:
    @staticmethod
    def get_user_by_email(db: Session, email: str):
        return db.query(Teacher).filter(Teacher.email == email).first() or \
               db.query(Student).filter(Student.email == email).first()

    @staticmethod
    def create_teacher(db: Session, data: UserRegister):
        hashed_password = get_password_hash(data.password)
        new_teacher = Teacher(
            email=data.email,
            full_name=data.full_name,
            hashed_password=hashed_password,
            is_active=True
        )
        db.add(new_teacher)
        db.commit()
        db.refresh(new_teacher)
        return new_teacher

    @staticmethod
    def create_student(db: Session, data: UserRegister):
        hashed_password = get_password_hash(data.password)
        new_student = Student(
            email=data.email,
            full_name=data.full_name,
            hashed_password=hashed_password,
            is_active=True
        )
        db.add(new_student)
        db.commit()
        db.refresh(new_student)
        return new_student

    @staticmethod
    def authenticate_user(db: Session, email: str, password: str):
        user = AuthService.get_user_by_email(db, email)
        if not user or not verify_password(password, user.hashed_password):
            return None
        return user

    @staticmethod
    def get_current_user(db: Session, token: str):
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
            email: str = payload.get("sub")
            if email is None:
                return None
        except JWTError:
            return None

        return AuthService.get_user_by_email(db, email)
