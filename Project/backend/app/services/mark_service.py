# mark_service.py
from sqlalchemy.orm import Session
from sqlalchemy import func, and_, or_
from uuid import UUID
from datetime import datetime
from app.models.marks import Marks
from app.schemas.marks import (
    MarksCreate, MarksUpdate, MarksQueryParams,
    MarksStatistics,MarksResponse
)
from fastapi import HTTPException, status

class MarksService:
    @staticmethod
    def create_marks(db: Session, marks_data: MarksCreate) -> MarksResponse:
        new_marks = Marks(**marks_data)
        db.add(new_marks)
        db.commit()
        db.refresh(new_marks)
        return MarksResponse.model_validate(new_marks)

    @staticmethod
    def get_marks_by_id(db: Session, marks_id: UUID) -> MarksResponse:
        marks = db.query(Marks).filter(Marks.id == marks_id, Marks.is_active == True).first()
        return MarksResponse.model_validate(marks) if marks else None

    @staticmethod
    def update_marks(db: Session, marks_id: UUID, marks_data: MarksUpdate) -> MarksResponse:
        marks = db.query(Marks).filter(Marks.id == marks_id, Marks.is_active == True).first()
        if not marks:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Marks not found")

        for field, value in marks_data.model_dump(exclude_unset=True).items():
            setattr(marks, field, value)

        db.commit()
        db.refresh(marks)
        return MarksResponse.model_validate(marks)


    @staticmethod
    def list_marks(db: Session, params: MarksQueryParams):
        query = db.query(Marks).filter(Marks.is_active == True)

        if params.student_id:
            query = query.filter(Marks.student_id == params.student_id)
        if params.quiz_id:
            query = query.filter(Marks.quiz_id == params.quiz_id)
        if params.test_id:
            query = query.filter(Marks.test_id == params.test_id)
        if params.graded_from:
            query = query.filter(Marks.graded_at >= params.graded_from)
        if params.graded_to:
            query = query.filter(Marks.graded_at <= params.graded_to)
        if params.min_marks:
            query = query.filter(Marks.obtained_marks >= params.min_marks)
        if params.max_marks:
            query = query.filter(Marks.obtained_marks <= params.max_marks)
        if params.is_active is not None:
            query = query.filter(Marks.is_active == params.is_active)

        total = query.count()
        items = query.offset((params.page - 1) * params.per_page).limit(params.per_page).all()

        total_pages = (total + params.per_page - 1) // params.per_page
        return {
            "marks": items,
            "total": total,
            "page": params.page,
            "per_page": params.per_page,
            "total_pages": total_pages
        }

    @staticmethod
    def bulk_create_marks(db: Session, marks_list: list[MarksCreate]) -> list[MarksResponse]:
        marks_objects = [Marks(**m.model_dump()) for m in marks_list]
        db.bulk_save_objects(marks_objects)
        db.commit()
        return MarksResponse.model_validate(marks_objects, many=True)

    @staticmethod
    def get_statistics(db: Session) -> MarksStatistics:
        total_records = db.query(func.count(Marks.id)).scalar()
        average_marks = db.query(func.avg(Marks.obtained_marks)).scalar()
        highest_marks = db.query(func.max(Marks.obtained_marks)).scalar()
        lowest_marks = db.query(func.min(Marks.obtained_marks)).scalar()
        student_count = db.query(func.count(func.distinct(Marks.student_id))).scalar()

        return MarksStatistics(
            total_records=total_records,
            average_marks=average_marks or 0,
            highest_marks=highest_marks or 0,
            lowest_marks=lowest_marks or 0,
            student_count=student_count
        )
