from pydantic import BaseModel, Field, ConfigDict
from typing import Optional
from datetime import datetime
from uuid import UUID


class SubjectBase(BaseModel):
    """Base schema for Subject with common fields"""
    name: str = Field(..., min_length=1, max_length=255, description="Subject name")
    code: str = Field(..., min_length=1, max_length=50, description="Subject code")
    department_id: UUID = Field(..., description="ID of the department this subject belongs to")
    is_open_elective: bool = Field(False, description="Whether the subject is an open elective")
    is_active: bool = Field(True, description="Whether the subject is active")

class SubjectCreate(SubjectBase):
    """Schema for creating a new subject"""
    code: str = Field(..., min_length=1, max_length=50, pattern=r'^[A-Z0-9]+, description="Subject code (uppercase alphanumeric)')

class SubjectUpdate(BaseModel):
    """Schema for updating a subject"""
    name: Optional[str] = Field(None, min_length=1, max_length=255, description="Subject name")
    code: Optional[str] = Field(None, min_length=1, max_length=50, pattern=r'^[A-Z0-9]+, description="Subject code (uppercase alphanumeric)')
    department_id: Optional[UUID] = Field(None, description="ID of the department this subject belongs to")
    is_open_elective: Optional[bool] = Field(None, description="Whether the subject is an open elective")
    is_active: Optional[bool] = Field(None, description="Whether the subject is active")

class SubjectResponse(SubjectBase):
    """Schema for subject response"""
    id: UUID = Field(..., description="Subject ID")
    created_at: datetime = Field(..., description="When the subject was created")
    updated_at: datetime = Field(..., description="When the subject was last updated")
    
    model_config = ConfigDict(from_attributes=True)

class SubjectListResponse(BaseModel):
    """Schema for paginated subject list response"""
    subjects: list[SubjectResponse]
    total: int = Field(..., description="Total number of subjects")
    page: int = Field(..., description="Current page number")
    per_page: int = Field(..., description="Number of items per page")
    total_pages: int = Field(..., description="Total number of pages")

class SubjectSummary(BaseModel):
    """Schema for subject summary (minimal info)"""
    id: UUID
    name: str
    code: str
    is_open_elective: bool
    
    model_config = ConfigDict(from_attributes=True)

class SubjectQueryParams(BaseModel):
    """Schema for subject query parameters"""
    page: int = Field(1, ge=1, description="Page number")
    per_page: int = Field(10, ge=1, le=100, description="Items per page")
    department_id: Optional[UUID] = Field(None, description="Filter by department ID")
    is_open_elective: Optional[bool] = Field(None, description="Filter by open elective status")
    is_active: Optional[bool] = Field(None, description="Filter by active status")
    search: Optional[str] = Field(None, min_length=1, description="Search in subject name or code")

class SubjectCreateResponse(BaseModel):
    """Response schema for subject creation"""
    message: str = "Subject created successfully"
    subject: SubjectResponse

class SubjectUpdateResponse(BaseModel):
    """Response schema for subject update"""
    message: str = "Subject updated successfully"
    subject: SubjectResponse

class SubjectDeleteResponse(BaseModel):
    """Response schema for subject deletion"""
    message: str = "Subject deleted successfully"
    id: UUID

class SubjectsByDepartment(BaseModel):
    """Schema for getting subjects by department"""
    department_id: UUID
    department_name: str
    subjects: list[SubjectSummary]
