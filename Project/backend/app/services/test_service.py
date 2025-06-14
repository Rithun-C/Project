from sqlalchemy.orm import Session
from typing import List, Optional
from uuid import UUID
from datetime import datetime
from pydantic import TypeAdapter


from app.models.test import Test
from app.schemas.test import TestCreate, TestUpdate, TestQueryParams, TestResponse

class TestService:

    @staticmethod
    def create_test(db: Session, test_data: TestCreate) -> TestResponse:
        new_test = Test(**test_data.model_dump())
        db.add(new_test)
        db.commit()
        db.refresh(new_test)
        return TestResponse.model_validate(new_test)

    @staticmethod
    def get_test_by_id(db: Session, test_id: UUID) -> Optional[TestResponse]:
        test = db.query(Test).filter(Test.id == test_id).first()
        return TestResponse.model_validate(test) if test else None

    @staticmethod
    def update_test(db: Session, test_id: UUID, update_data: TestUpdate) -> Optional[TestResponse]:
        test = db.query(Test).filter(Test.id == test_id).first()
        if not test:
            return None

        for field, value in update_data.model_dump(exclude_unset=True).items():
            setattr(test, field, value)

        test.updated_at = datetime.utcnow()
        db.commit()
        db.refresh(test)
        return TestResponse.model_validate(test)

    @staticmethod
    def delete_test(db: Session, test_id: UUID) -> bool:
        test = db.query(Test).filter(Test.id == test_id).first()
        if not test:
            return False

        db.delete(test)
        db.commit()
        return True

    @staticmethod
    def list_tests(db: Session, query: TestQueryParams) -> List[TestResponse]:
        query_set = db.query(Test)

        if query.subject_id:
            query_set = query_set.filter(Test.subject_id == query.subject_id)
        if query.teacher_id:
            query_set = query_set.filter(Test.teacher_id == query.teacher_id)
        if query.section_id:
            query_set = query_set.filter(Test.section_id == query.section_id)
        if query.is_active is not None:
            query_set = query_set.filter(Test.is_active == query.is_active)
        if query.search:
            query_set = query_set.filter(Test.title.ilike(f"%{query.search}%"))

        total = query_set.count()
        offset = (query.page - 1) * query.per_page
        tests = query_set.order_by(Test.scheduled_date.desc()).offset(offset).limit(query.per_page).all()

        # Convert SQLAlchemy models to Pydantic models
        return TypeAdapter(List[TestResponse]).validate_python(tests)

    @staticmethod
    def toggle_test_active_status(db: Session, test_id: UUID, is_active: bool) -> Optional[TestResponse]:
        test = db.query(Test).filter(Test.id == test_id).first()
        if not test:
            return None

        test.is_active = is_active
        test.updated_at = datetime.utcnow()
        db.commit()
        db.refresh(test)
        return TestResponse.model_validate(test)
