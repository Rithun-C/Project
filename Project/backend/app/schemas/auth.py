from pydantic import BaseModel, EmailStr, Field
from uuid import UUID
from typing import Literal, Optional


UserType = Literal["teacher", "student", "admin"]  


class Token(BaseModel):
    """Schema for JWT Token Response"""
    access_token: str
    token_type: str
    user_type: UserType
    user_id: UUID


class TokenData(BaseModel):
    """Schema for JWT token internal decoding"""
    sub: EmailStr
    user_type: UserType


class UserLogin(BaseModel):
    """Schema for Login Input"""
    email: EmailStr
    password: str


class UserRegister(BaseModel):
    """Schema for Registration Input (shared for all user types)"""
    name: str = Field(..., min_length=1, max_length=255)
    email: EmailStr
    password: str
    user_type: UserType
    department_id: Optional[UUID] = None  # For teachers
    section_id: Optional[UUID] = None     # For students


class UserResponse(BaseModel):
    """Schema for Authenticated User Info"""
    id: UUID
    email: EmailStr
    name: str
    user_type: UserType
