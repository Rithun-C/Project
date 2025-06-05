from pydantic import BaseModel, Field, ConfigDict
from typing import Optional
from datetime import datetime
from uuid import UUID

class SectionBase(BaseModel):
    """Base schema for Section with common fields"""
    name: str = Field(..., min_length=1, max_length=255, description="Section name")
    department_id: UUID = Field(..., description="ID of the department this section belongs to")
    is_active: bool = Field(True, description="Whether the section is active")

class SectionCreate(SectionBase):
    """Schema for creating a new section"""
    pass

class SectionUpdate(BaseModel):
    """Schema for updating a section"""
    name: Optional[str] = Field(None, min_length=1, max_length=255, description="Section name")
    department_id: Optional[UUID] = Field(None, description="ID of the department this section belongs to")
    is_active: Optional[bool] = Field(None, description="Whether the section is active")

class SectionResponse(SectionBase):
    """Schema for section response"""
    id: UUID = Field(..., description="Section ID")
    created_at: datetime = Field(..., description="When the section was created")
    updated_at: datetime = Field(..., description="When the section was last updated")
    
    model_config = ConfigDict(from_attributes=True)

class SectionListResponse(BaseModel):
    """Schema for paginated section list response"""
    sections: list[SectionResponse]
    total: int = Field(..., description="Total number of sections")
    page: int = Field(..., description="Current page number")
    per_page: int = Field(..., description="Number of items per page")
    total_pages: int = Field(..., description="Total number of pages")

class SectionSummary(BaseModel):
    """Schema for section summary (minimal info)"""
    id: UUID
    name: str
    department_id: UUID
    is_active: bool
    
    model_config = ConfigDict(from_attributes=True)

class SectionQueryParams(BaseModel):
    """Schema for section query parameters"""
    page: int = Field(1, ge=1, description="Page number")
    per_page: int = Field(10, ge=1, le=100, description="Items per page")
    department_id: Optional[UUID] = Field(None, description="Filter by department ID")
    is_active: Optional[bool] = Field(None, description="Filter by active status")
    search: Optional[str] = Field(None, min_length=1, description="Search in section name")

class SectionCreateResponse(BaseModel):
    """Response schema for section creation"""
    message: str = "Section created successfully"
    section: SectionResponse

class SectionUpdateResponse(BaseModel):
    """Response schema for section update"""
    message: str = "Section updated successfully"
    section: SectionResponse

class SectionDeleteResponse(BaseModel):
    """Response schema for section deletion"""
    message: str = "Section deleted successfully"
    id: UUID
