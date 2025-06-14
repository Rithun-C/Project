from app.models.student import Student
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import TypeAdapter
from app.schemas.student import StudentCreate, StudentUpdate, StudentResponse

class StudentService:
    @staticmethod
    def create_student(db: Session, student_data: StudentCreate) -> StudentResponse:
        new_student = Student(**student_data.model_dump())
        db.add(new_student)
        db.commit()
        db.refresh(new_student)
        return StudentResponse.model_validate(new_student)

    @staticmethod
    def get_student_by_id(db: Session, student_id: int) -> Optional[StudentResponse]:
        student = db.query(Student).filter(Student.id == student_id).first()
        return StudentResponse.model_validate(student) if student else None

    @staticmethod
    def get_students(
        db: Session,
        skip: int = 0,
        limit: int = 100,
        section_id: int = None,
        department_id: int = None,
        search: str = None
    ) -> List[StudentResponse]:
        query = db.query(Student)
        if section_id:
            query = query.filter(Student.section_id == section_id)
        if department_id:
            query = query.filter(Student.department_id == department_id)
        if search:
            query = query.filter(Student.name.ilike(f"%{search}%"))
        students = query.offset(skip).limit(limit).all()
        return TypeAdapter(List[StudentResponse]).validate_python(students)

    @staticmethod
    def update_student(db: Session, student_id: int, student_data: StudentUpdate) -> Optional[StudentResponse]:
        student = db.query(Student).filter(Student.id == student_id).first()
        if not student:
            return None
        for key, value in student_data.model_dump(exclude_unset=True).items():
            setattr(student, key, value)
        db.commit()
        db.refresh(student)
        return StudentResponse.model_validate(student)

    @staticmethod
    def get_student_by_email(db: Session, email: str) -> Optional[StudentResponse]:
        student = db.query(Student).filter(Student.email == email).first()
        return StudentResponse.model_validate(student) if student else None
