from pydantic import BaseModel, EmailStr
from uuid import UUID
from datetime import datetime

class TeacherCreate(BaseModel):
    name: str
    email: EmailStr
    department_id: UUID

class TeacherOut(BaseModel):
    id: UUID
    name: str
    email: EmailStr
    department_id: UUID
    created_at: datetime
    updated_at: datetime
    is_active: bool

    class Config:
        orm_mode = True




