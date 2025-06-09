from pydantic import BaseModel,Field,  ConfigDict
from typing import Optional
from uuid import UUID
from datetime import datetime


class TeacherBase(BaseModel):
    """Base schema for Teachers with common fields"""
    name: str = Field(..., min_length=1, max_length=255, description="Teacher name")
    email: str = Field(..., description="Teachers email address")
    department_id: UUID = Field(..., description="ID of the department this teacher belongs to")
    is_active: bool = Field(True, description="Whether the Teachers is active")

class TeacherCreate(TeacherBase):
    """Schema for creating a new Teacher"""
    pass

class TeacherUpdate(BaseModel):
    """Schema for updating a Teachers"""
    name: Optional[str] = Field(None, min_length=1, max_length=255, description="Teachers name")
    email: Optional[str] = Field(None, regex=r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}, description="Valid email address')
    department_id: Optional[UUID] = Field(None, description="ID of the section this Teachers belongs to")
    is_active: Optional[bool] = Field(None, description="Whether the Teachers is active")

class TeacherResponse(TeacherBase):
    """Schema for Teachers response"""
    id: UUID = Field(..., description="Teachers ID")
    created_at: datetime = Field(..., description="When the Teachers was created")
    updated_at: datetime = Field(..., description="When the Teachers was last updated")
    
    model_config = ConfigDict(from_attributes=True)

class TeachersListResponse(BaseModel):
    """Schema for paginated Teachers list response"""
    teachers: list[TeacherResponse]
    total: int = Field(..., description="Total number of teachers")
    page: int = Field(..., description="Current page number")
    per_page: int = Field(..., description="Number of items per page")
    total_pages: int = Field(..., description="Total number of pages")

class TeacherSummary(BaseModel):
    """Schema for Teachers summary (minimal info)"""
    id: UUID
    name: str
    email: str
    department_id: UUID
    
    model_config = ConfigDict(from_attributes=True)

class TeachersQueryParams(BaseModel):
    """Schema for Teachers query parameters"""
    page: int = Field(1, ge=1, description="Page number")
    per_page: int = Field(10, ge=1, le=100, description="Items per page")
    department_id: Optional[UUID] = Field(None, description="Filter by department ID")
    is_active: Optional[bool] = Field(None, description="Filter by active status")
    search: Optional[str] = Field(None, min_length=1, description="Search in Teacher name or email")

class TeacherCreateResponse(BaseModel):
    """Response schema for Teachers creation"""
    message: str = "Teachers created successfully"
    Teachers: TeacherResponse

class TeacherUpdateResponse(BaseModel):
    """Response schema for Teachers update"""
    message: str = "Teachers updated successfully"
    Teachers: TeacherResponse

class TeacherDeleteResponse(BaseModel):
    """Response schema for Teachers deletion"""
    message: str = "Teachers deleted successfully"
    id: UUID



# class BulkTeacherCreate(BaseModel):
#     """Schema for creating multiple teachers"""
#     teachers_list: list[TeacherCreate] = Field(..., min_items=1, description="List of teachers to create")

# class BulkTeachersCreateResponse(BaseModel):
#     """Response schema for bulk Teachers creation"""
#     message: str = "Teacher created successfully"
#     created_count: int = Field(..., description="Number of teachers created")
#     teachers: list[TeacherResponse]


class TeacherBySection(BaseModel):
    """Schema for getting teachers by section"""
    department_id: UUID
    section_name: str
    teachers: list[TeacherSummary]
