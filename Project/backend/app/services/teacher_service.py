from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import TypeAdapter

from app.models.teacher import Teacher
from app.schemas.teacher import TeacherCreate, TeacherUpdate, TeacherResponse

class TeacherService:
    
    @staticmethod
    def get_teacher_by_email(db: Session, email: str) -> Optional[TeacherResponse]:
        teacher = db.query(Teacher).filter(Teacher.email == email).first()
        return TeacherResponse.model_validate(teacher) if teacher else None

    @staticmethod
    def create_teacher(db: Session, teacher_data: TeacherCreate) -> TeacherResponse:
        new_teacher = Teacher(**teacher_data.model_dump())
        db.add(new_teacher)
        db.commit()
        db.refresh(new_teacher)
        return TeacherResponse.model_validate(new_teacher)

    @staticmethod
    def update_teacher(db: Session, teacher_id: int, teacher_data: TeacherUpdate) -> Optional[TeacherResponse]:
        teacher = db.query(Teacher).filter(Teacher.id == teacher_id).first()
        if not teacher:
            return None
        for key, value in teacher_data.model_dump(exclude_unset=True).items():
            setattr(teacher, key, value)
        db.commit()
        db.refresh(teacher)
        return TeacherResponse.model_validate(teacher)

    @staticmethod
    def get_teacher_by_id(db: Session, teacher_id: int) -> Optional[TeacherResponse]:
        teacher = db.query(Teacher).filter(Teacher.id == teacher_id).first()
        return TeacherResponse.model_validate(teacher) if teacher else None

    @staticmethod
    def get_teachers(db: Session, skip: int = 0, limit: int = 100, search: Optional[str] = None) -> List[TeacherResponse]:
        query = db.query(Teacher)
        if search:
            query = query.filter(Teacher.name.ilike(f"%{search}%"))
        teachers = query.offset(skip).limit(limit).all()
        return TypeAdapter(List[TeacherResponse]).validate_python(teachers)
