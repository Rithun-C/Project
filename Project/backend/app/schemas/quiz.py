from pydantic import BaseModel, Field, ConfigDict
from typing import Optional
from datetime import datetime
from uuid import UUID

class QuizBase(BaseModel):
    """Base schema for Quiz with common fields"""
    title: str = Field(..., min_length=1, max_length=255, description="Quiz title")
    subject_id: UUID = Field(..., description="ID of the subject this quiz belongs to")
    teacher_id: UUID = Field(..., description="ID of the teacher who created this quiz")
    section_id: Optional[UUID] = Field(None, description="ID of the section (optional)")
    total_marks: int = Field(..., ge=1, description="Total marks for the quiz")
    is_active: bool = Field(True, description="Whether the quiz is active")

class QuizCreate(QuizBase):
    """Schema for creating a new quiz"""
    pass

class QuizUpdate(BaseModel):
    """Schema for updating a quiz"""
    title: Optional[str] = Field(None, min_length=1, max_length=255, description="Quiz title")
    subject_id: Optional[UUID] = Field(None, description="ID of the subject this quiz belongs to")
    teacher_id: Optional[UUID] = Field(None, description="ID of the teacher who created this quiz")
    section_id: Optional[UUID] = Field(None, description="ID of the section (optional)")
    total_marks: Optional[int] = Field(None, ge=1, description="Total marks for the quiz")
    is_active: Optional[bool] = Field(None, description="Whether the quiz is active")

class QuizResponse(QuizBase):
    """Schema for quiz response"""
    id: UUID = Field(..., description="Quiz ID")
    created_at: datetime = Field(..., description="When the quiz was created")
    updated_at: datetime = Field(..., description="When the quiz was last updated")
    
    model_config = ConfigDict(from_attributes=True)

class QuizListResponse(BaseModel):
    """Schema for paginated quiz list response"""
    quizzes: list[QuizResponse]
    total: int = Field(..., description="Total number of quizzes")
    page: int = Field(..., description="Current page number")
    per_page: int = Field(..., description="Number of items per page")
    total_pages: int = Field(..., description="Total number of pages")

class QuizSummary(BaseModel):
    """Schema for quiz summary (minimal info)"""
    id: UUID
    title: str
    total_marks: int
    is_active: bool
    
    model_config = ConfigDict(from_attributes=True)

class QuizQueryParams(BaseModel):
    """Schema for quiz query parameters"""
    page: int = Field(1, ge=1, description="Page number")
    per_page: int = Field(10, ge=1, le=100, description="Items per page")
    subject_id: Optional[UUID] = Field(None, description="Filter by subject ID")
    teacher_id: Optional[UUID] = Field(None, description="Filter by teacher ID")
    section_id: Optional[UUID] = Field(None, description="Filter by section ID")
    is_active: Optional[bool] = Field(None, description="Filter by active status")
    search: Optional[str] = Field(None, min_length=1, description="Search in quiz title")

class QuizCreateResponse(BaseModel):
    """Response schema for quiz creation"""
    message: str = "Quiz created successfully"
    quiz: QuizResponse

class QuizUpdateResponse(BaseModel):
    """Response schema for quiz update"""
    message: str = "Quiz updated successfully"
    quiz: QuizResponse

class QuizDeleteResponse(BaseModel):
    """Response schema for quiz deletion"""
    message: str = "Quiz deleted successfully"
    id: UUID
