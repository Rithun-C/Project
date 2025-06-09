import uuid
from sqlalchemy import Column, String, Boolean, ForeignKey, DateTime, Text
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
from app.db.database import Base

class Assignment(Base):
    __tablename__ = 'assignments'
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String, nullable=False)
    subject_id = Column(UUID(as_uuid=True), ForeignKey('subjects.id'))
    teacher_id = Column(UUID(as_uuid=True), ForeignKey('teachers.id'))
    section_id = Column(UUID(as_uuid=True), ForeignKey('sections.id'), nullable=True)
    description = Column(Text, nullable=True)
    due_date = Column(DateTime, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    is_active = Column(Boolean, default=True)
    



