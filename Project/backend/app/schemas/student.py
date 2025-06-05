from pydantic import BaseModel, Field, ConfigDict
from typing import Optional
from datetime import datetime
from uuid import UUID


class StudentBase(BaseModel):
    """Base schema for Student with common fields"""
    name: str = Field(..., min_length=1, max_length=255, description="Student name")
    email: str = Field(..., description="Student email address")
    section_id: UUID = Field(..., description="ID of the section this student belongs to")
    is_active: bool = Field(True, description="Whether the student is active")

class StudentCreate(StudentBase):
    """Schema for creating a new student"""
    email: str = Field(..., regex=r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}, description="Valid email address')

class StudentUpdate(BaseModel):
    """Schema for updating a student"""
    name: Optional[str] = Field(None, min_length=1, max_length=255, description="Student name")
    email: Optional[str] = Field(None, regex=r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}, description="Valid email address')
    section_id: Optional[UUID] = Field(None, description="ID of the section this student belongs to")
    is_active: Optional[bool] = Field(None, description="Whether the student is active")

class StudentResponse(StudentBase):
    """Schema for student response"""
    id: UUID = Field(..., description="Student ID")
    created_at: datetime = Field(..., description="When the student was created")
    updated_at: datetime = Field(..., description="When the student was last updated")
    
    model_config = ConfigDict(from_attributes=True)

class StudentListResponse(BaseModel):
    """Schema for paginated student list response"""
    students: list[StudentResponse]
    total: int = Field(..., description="Total number of students")
    page: int = Field(..., description="Current page number")
    per_page: int = Field(..., description="Number of items per page")
    total_pages: int = Field(..., description="Total number of pages")

class StudentSummary(BaseModel):
    """Schema for student summary (minimal info)"""
    id: UUID
    name: str
    email: str
    section_id: UUID
    
    model_config = ConfigDict(from_attributes=True)

class StudentQueryParams(BaseModel):
    """Schema for student query parameters"""
    page: int = Field(1, ge=1, description="Page number")
    per_page: int = Field(10, ge=1, le=100, description="Items per page")
    section_id: Optional[UUID] = Field(None, description="Filter by section ID")
    is_active: Optional[bool] = Field(None, description="Filter by active status")
    search: Optional[str] = Field(None, min_length=1, description="Search in student name or email")

class StudentCreateResponse(BaseModel):
    """Response schema for student creation"""
    message: str = "Student created successfully"
    student: StudentResponse

class StudentUpdateResponse(BaseModel):
    """Response schema for student update"""
    message: str = "Student updated successfully"
    student: StudentResponse

class StudentDeleteResponse(BaseModel):
    """Response schema for student deletion"""
    message: str = "Student deleted successfully"
    id: UUID



class BulkStudentCreate(BaseModel):
    """Schema for creating multiple students"""
    students_list: list[StudentCreate] = Field(..., min_items=1, description="List of students to create")

class BulkStudentCreateResponse(BaseModel):
    """Response schema for bulk student creation"""
    message: str = "Students created successfully"
    created_count: int = Field(..., description="Number of students created")
    students: list[StudentResponse]


class StudentsBySection(BaseModel):
    """Schema for getting students by section"""
    section_id: UUID
    section_name: str
    students: list[StudentSummary]
