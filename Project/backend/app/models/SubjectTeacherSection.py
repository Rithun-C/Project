import uuid
from sqlalchemy import Column, Boolean, ForeignKey, DateTime
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
from app.db.database import Base

class SubjectTeacherSection(Base):
    __tablename__ = 'subject_teacher_section'
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    subject_id = Column(UUID(as_uuid=True), ForeignKey('subjects.id'))
    teacher_id = Column(UUID(as_uuid=True), ForeignKey('teachers.id'))
    section_id = Column(UUID(as_uuid=True), ForeignKey('sections.id'))
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    is_active = Column(Boolean, default=True)
    


