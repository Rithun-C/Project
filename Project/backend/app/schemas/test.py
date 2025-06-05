from pydantic import BaseModel
from uuid import UUID
from datetime import datetime

class TestCreate(BaseModel):
    title: str
    subject_id: UUID
    teacher_id: UUID
    section_id: UUID | None
    scheduled_date: datetime
    total_marks: int

class TestOut(BaseModel):
    id: UUID
    title: str
    subject_id: UUID
    teacher_id: UUID
    section_id: UUID | None
    scheduled_date: datetime
    total_marks: int
    created_at: datetime
    updated_at: datetime
    is_active: bool

    class Config:
        orm_mode = True

