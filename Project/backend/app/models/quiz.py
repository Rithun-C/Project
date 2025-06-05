import uuid
from sqlalchemy import Column, String, Boolean, ForeignKey, DateTime, Integer
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
from app.core.database import Base

class Quiz(Base):
    __tablename__ = 'quizzes'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String, nullable=False)
    subject_id = Column(UUID(as_uuid=True), ForeignKey('subjects.id'))
    teacher_id = Column(UUID(as_uuid=True), ForeignKey('teachers.id'))
    section_id = Column(UUID(as_uuid=True), ForeignKey('sections.id'), nullable=True)
    total_marks = Column(Integer, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    is_active = Column(Boolean, default=True)
    
