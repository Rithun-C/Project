from pydantic import BaseModel, Field, ConfigDict
from typing import Optional
from datetime import datetime
from uuid import UUID

class SubjectTeacherSectionBase(BaseModel):
    """Base schema for SubjectTeacherSection with common fields"""
    subject_id: UUID = Field(..., description="ID of the subject")
    teacher_id: UUID = Field(..., description="ID of the teacher")
    section_id: UUID = Field(..., description="ID of the section")
    is_active: bool = Field(True, description="Whether the assignment is active")

class SubjectTeacherSectionCreate(SubjectTeacherSectionBase):
    """Schema for creating a new subject-teacher-section assignment"""
    pass

class SubjectTeacherSectionUpdate(BaseModel):
    """Schema for updating a subject-teacher-section assignment"""
    subject_id: Optional[UUID] = Field(None, description="ID of the subject")
    teacher_id: Optional[UUID] = Field(None, description="ID of the teacher")
    section_id: Optional[UUID] = Field(None, description="ID of the section")
    is_active: Optional[bool] = Field(None, description="Whether the assignment is active")

class SubjectTeacherSectionResponse(SubjectTeacherSectionBase):
    """Schema for subject-teacher-section response"""
    id: UUID = Field(..., description="Assignment ID")
    created_at: datetime = Field(..., description="When the assignment was created")
    updated_at: datetime = Field(..., description="When the assignment was last updated")
    
    model_config = ConfigDict(from_attributes=True)

class SubjectTeacherSectionListResponse(BaseModel):
    """Schema for paginated subject-teacher-section list response"""
    assignments: list[SubjectTeacherSectionResponse]
    total: int = Field(..., description="Total number of assignments")
    page: int = Field(..., description="Current page number")
    per_page: int = Field(..., description="Number of items per page")
    total_pages: int = Field(..., description="Total number of pages")

class SubjectTeacherSectionSummary(BaseModel):
    """Schema for subject-teacher-section summary (minimal info)"""
    id: UUID
    subject_id: UUID
    teacher_id: UUID
    section_id: UUID
    
    model_config = ConfigDict(from_attributes=True)

class SubjectTeacherSectionQueryParams(BaseModel):
    """Schema for subject-teacher-section query parameters"""
    page: int = Field(1, ge=1, description="Page number")
    per_page: int = Field(10, ge=1, le=100, description="Items per page")
    subject_id: Optional[UUID] = Field(None, description="Filter by subject ID")
    teacher_id: Optional[UUID] = Field(None, description="Filter by teacher ID")
    section_id: Optional[UUID] = Field(None, description="Filter by section ID")
    is_active: Optional[bool] = Field(None, description="Filter by active status")

class SubjectTeacherSectionCreateResponse(BaseModel):
    """Response schema for subject-teacher-section creation"""
    message: str = "Subject-teacher-section assignment created successfully"
    assignment: SubjectTeacherSectionResponse

class SubjectTeacherSectionUpdateResponse(BaseModel):
    """Response schema for subject-teacher-section update"""
    message: str = "Subject-teacher-section assignment updated successfully"
    assignment: SubjectTeacherSectionResponse

class SubjectTeacherSectionDeleteResponse(BaseModel):
    """Response schema for subject-teacher-section deletion"""
    message: str = "Subject-teacher-section assignment deleted successfully"
    id: UUID

class BulkSubjectTeacherSectionCreate(BaseModel):
    """Schema for creating multiple subject-teacher-section assignments"""
    assignments_list: list[SubjectTeacherSectionCreate] = Field(..., min_items=1, description="List of assignments to create")

class BulkSubjectTeacherSectionCreateResponse(BaseModel):
    """Response schema for bulk subject-teacher-section creation"""
    message: str = "Assignments created successfully"
    created_count: int = Field(..., description="Number of assignments created")
    assignments: list[SubjectTeacherSectionResponse]
