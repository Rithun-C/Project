import uuid
from sqlalchemy import Column, Boolean, ForeignKey, DateTime, Float
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
from app.core.database import Base

class Marks(Base):
    __tablename__ = 'marks'
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    student_id = Column(UUID(as_uuid=True), ForeignKey('students.id'))
    quiz_id = Column(UUID(as_uuid=True), ForeignKey('quizzes.id'), nullable=True)
    test_id = Column(UUID(as_uuid=True), ForeignKey('tests.id'), nullable=True)
    obtained_marks = Column(Float, nullable=False)
    graded_at = Column(DateTime, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    is_active = Column(Boolean, default=True)
    