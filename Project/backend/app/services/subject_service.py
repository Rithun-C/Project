from sqlalchemy.orm import Session
from typing import List, Optional

from app.models.subject import Subject
from app.models.SubjectTeacherSection import SubjectTeacherSection
from app.schemas.subject import SubjectCreate, SubjectUpdate

class SubjectService:

    @staticmethod
    def get_subject_by_code(db: Session, code: str) -> Optional[Subject]:
        return db.query(Subject).filter(Subject.subject_code == code).first()

    @staticmethod
    def create_subject(db: Session, subject_data: SubjectCreate) -> Subject:
        subject = Subject(**subject_data.dict())
        db.add(subject)
        db.commit()
        db.refresh(subject)
        return subject

    @staticmethod
    def get_subjects(
        db: Session,
        skip: int = 0,
        limit: int = 100,
        department_id: Optional[int] = None,
        search: Optional[str] = None,
        semester: Optional[int] = None,
        year: Optional[int] = None
    ) -> List[Subject]:
        query = db.query(Subject)

        if department_id:
            query = query.filter(Subject.department_id == department_id)
        if search:
            query = query.filter(Subject.name.ilike(f"%{search}%"))
        if semester:
            query = query.filter(Subject.semester == semester)
        if year:
            query = query.filter(Subject.year == year)

        return query.offset(skip).limit(limit).all()

    @staticmethod
    def get_subject_by_id(db: Session, subject_id: int) -> Optional[Subject]:
        return db.query(Subject).filter(Subject.id == subject_id).first()

    @staticmethod
    def update_subject(db: Session, subject_id: int, subject_update: SubjectUpdate) -> Optional[Subject]:
        subject = db.query(Subject).filter(Subject.id == subject_id).first()
        if not subject:
            return None

        for field, value in subject_update.dict(exclude_unset=True).items():
            setattr(subject, field, value)

        db.commit()
        db.refresh(subject)
        return subject

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
        return [student.to_dict() for student in subject.students]

    @staticmethod
    def get_teacher_subjects(db: Session, teacher_id: int) -> List[Subject]:
        return (
            db.query(Subject)
            .join(SubjectTeacherSection, SubjectTeacherSection.subject_id == Subject.id)
            .filter(SubjectTeacherSection.teacher_id == teacher_id)
            .all()
        )

    @staticmethod
    def get_subject_teachers(db: Session, subject_id: int) -> List[dict]:
        subject = db.query(Subject).filter(Subject.id == subject_id).first()
        if not subject:
            return []
        return [teacher.to_dict() for teacher in subject.teachers]

    