from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import TypeAdapter

from app.models.subject import Subject
from app.models.SubjectTeacherSection import SubjectTeacherSection
from app.schemas.subject import SubjectCreate, SubjectUpdate, SubjectResponse

class SubjectService:

    @staticmethod
    def get_subject_by_code(db: Session, code: str) -> Optional[SubjectResponse]:
        subject = db.query(Subject).filter(Subject.subject_code == code).first()
        return SubjectResponse.model_validate(subject) if subject else None

    @staticmethod
    def create_subject(db: Session, subject_data: SubjectCreate) -> SubjectResponse:
        subject = Subject(**subject_data.model_dump())
        db.add(subject)
        db.commit()
        db.refresh(subject)
        return SubjectResponse.model_validate(subject)

    @staticmethod
    def get_subjects(
        db: Session,
        skip: int = 0,
        limit: int = 100,
        department_id: Optional[int] = None,
        search: Optional[str] = None,
        semester: Optional[int] = None,
        year: Optional[int] = None
    ) -> List[SubjectResponse]:
        query = db.query(Subject)

        if department_id:
            query = query.filter(Subject.department_id == department_id)
        if search:
            query = query.filter(Subject.name.ilike(f"%{search}%"))
        if semester:
            query = query.filter(Subject.semester == semester)
        if year:
            query = query.filter(Subject.year == year)

        subjects = query.offset(skip).limit(limit).all()
        return TypeAdapter(List[SubjectResponse]).validate_python(subjects)

    @staticmethod
    def get_subject_by_id(db: Session, subject_id: int) -> Optional[SubjectResponse]:
        subject = db.query(Subject).filter(Subject.id == subject_id).first()
        return SubjectResponse.model_validate(subject) if subject else None

    @staticmethod
    def update_subject(db: Session, subject_id: int, subject_update: SubjectUpdate) -> Optional[SubjectResponse]:
        subject = db.query(Subject).filter(Subject.id == subject_id).first()
        if not subject:
            return None

        for field, value in subject_update.model_dump(exclude_unset=True).items():
            setattr(subject, field, value)

        db.commit()
        db.refresh(subject)
        return SubjectResponse.model_validate(subject)

    @staticmethod
    def delete_subject(db: Session, subject_id: int) -> bool:
        subject = db.query(Subject).filter(Subject.id == subject_id).first()
        if not subject:
            return False

        db.delete(subject)
        db.commit()
        return True

    @staticmethod
    def get_subject_students(db: Session, subject_id: int) -> List[dict]:
        subject = db.query(Subject).filter(Subject.id == subject_id).first()
        if not subject:
            return []
        return [student.to_dict() for student in subject.students]  # ❗ Only works if student model defines `.to_dict()`

    @staticmethod
    def get_teacher_subjects(db: Session, teacher_id: int) -> List[SubjectResponse]:
        subjects = (
            db.query(Subject)
            .join(SubjectTeacherSection, SubjectTeacherSection.subject_id == Subject.id)
            .filter(SubjectTeacherSection.teacher_id == teacher_id)
            .all()
        )
        return TypeAdapter(List[SubjectResponse]).validate_python(subjects)

    @staticmethod
    def get_subject_teachers(db: Session, subject_id: int) -> List[dict]:
        subject = db.query(Subject).filter(Subject.id == subject_id).first()
        if not subject:
            return []
        return [teacher.to_dict() for teacher in subject.teachers]  # ❗ Only works if teacher model defines `.to_dict()`
