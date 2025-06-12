from pydantic import BaseModel, Field, ConfigDict
from typing import Optional
from datetime import datetime
from uuid import UUID

class AssignmentBase(BaseModel):
    """Base schema for Assignment with common fields"""
    title: str = Field(..., min_length=1, max_length=255, description="Assignment title") #... for required
    subject_id: UUID = Field(..., description="ID of the subject this assignment belongs to")
    teacher_id: UUID = Field(..., description="ID of the teacher who created this assignment")
    section_id: Optional[UUID] = Field(None, description="ID of the section (optional)")
    description: Optional[str] = Field(None, description="Assignment description")
    due_date: datetime = Field(..., description="Assignment due date")
    is_active: bool = Field(True, description="Whether the assignment is active")

class AssignmentCreate(AssignmentBase):
    """Schema for creating a new assignment"""
    pass

class AssignmentUpdate(BaseModel):
    """Schema for updating an assignment"""
    title: Optional[str] = Field(None, min_length=1, max_length=255, description="Assignment title")
    subject_id: Optional[UUID] = Field(None, description="ID of the subject this assignment belongs to")
    teacher_id: Optional[UUID] = Field(None, description="ID of the teacher who created this assignment")
    section_id: Optional[UUID] = Field(None, description="ID of the section (optional)")
    description: Optional[str] = Field(None, description="Assignment description")
    due_date: Optional[datetime] = Field(None, description="Assignment due date")
    is_active: Optional[bool] = Field(None, description="Whether the assignment is active")

class AssignmentResponse(AssignmentBase):
    """Schema for assignment response"""
    id: UUID = Field(..., description="Assignment ID")
    created_at: datetime = Field(..., description="When the assignment was created")
    updated_at: datetime = Field(..., description="When the assignment was last updated")
    
    model_config = ConfigDict(from_attributes=True)

class AssignmentListResponse(BaseModel):
    """Schema for paginated assignment list response"""
    assignments: list[AssignmentResponse]
    total: int = Field(..., description="Total number of assignments")
    page: int = Field(..., description="Current page number")
    per_page: int = Field(..., description="Number of items per page")
    total_pages: int = Field(..., description="Total number of pages")

class AssignmentSummary(BaseModel):
    """Schema for assignment summary (minimal info)"""
    id: UUID
    title: str
    due_date: datetime
    is_active: bool
    
    model_config = ConfigDict(from_attributes=True)

# Query parameter schemas
class AssignmentQueryParams(BaseModel):
    """Schema for assignment query parameters"""
    page: int = Field(1, ge=1, description="Page number")
    per_page: int = Field(10, ge=1, le=100, description="Items per page")
    subject_id: Optional[UUID] = Field(None, description="Filter by subject ID")
    teacher_id: Optional[UUID] = Field(None, description="Filter by teacher ID")
    section_id: Optional[UUID] = Field(None, description="Filter by section ID")
    is_active: Optional[bool] = Field(None, description="Filter by active status")
    search: Optional[str] = Field(None, min_length=1, description="Search in title and description")
    due_date_from: Optional[datetime] = Field(None, description="Filter assignments due after this date")
    due_date_to: Optional[datetime] = Field(None, description="Filter assignments due before this date")

# Response schemas for different operations
class AssignmentCreateResponse(BaseModel):
    """Response schema for assignment creation"""
    message: str = "Assignment created successfully"
    assignment: AssignmentResponse

class AssignmentUpdateResponse(BaseModel):
    """Response schema for assignment update"""
    message: str = "Assignment updated successfully"
    assignment: AssignmentResponse

class AssignmentDeleteResponse(BaseModel):
    """Response schema for assignment deletion"""
    message: str = "Assignment deleted successfully"
    id: UUID