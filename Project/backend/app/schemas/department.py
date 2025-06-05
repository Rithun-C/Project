from pydantic import BaseModel, Field, ConfigDict
from typing import Optional
from datetime import datetime
from uuid import UUID

class DepartmentBase(BaseModel):
    """Base schema for Department with common fields"""
    name: str = Field(..., min_length=1, max_length=255, description="Department name")
    is_active: bool = Field(True, description="Whether the department is active")

class DepartmentCreate(DepartmentBase):
    """Schema for creating a new department"""
    pass

class DepartmentUpdate(BaseModel):
    """Schema for updating a department"""
    name: Optional[str] = Field(None, min_length=1, max_length=255, description="Department name")
    is_active: Optional[bool] = Field(None, description="Whether the department is active")

class DepartmentResponse(DepartmentBase):
    """Schema for department response"""
    id: UUID = Field(..., description="Department ID")
    created_at: datetime = Field(..., description="When the department was created")
    updated_at: datetime = Field(..., description="When the department was last updated")
    
    model_config = ConfigDict(from_attributes=True)

class DepartmentListResponse(BaseModel):
    """Schema for paginated department list response"""
    departments: list[DepartmentResponse]
    total: int = Field(..., description="Total number of departments")
    page: int = Field(..., description="Current page number")
    per_page: int = Field(..., description="Number of items per page")
    total_pages: int = Field(..., description="Total number of pages")

class DepartmentSummary(BaseModel):
    """Schema for department summary (minimal info)"""
    id: UUID
    name: str
    is_active: bool
    
    model_config = ConfigDict(from_attributes=True)

class DepartmentQueryParams(BaseModel):
    """Schema for department query parameters"""
    page: int = Field(1, ge=1, description="Page number")
    per_page: int = Field(10, ge=1, le=100, description="Items per page")
    is_active: Optional[bool] = Field(None, description="Filter by active status")
    search: Optional[str] = Field(None, min_length=1, description="Search in department name")

class DepartmentCreateResponse(BaseModel):
    """Response schema for department creation"""
    message: str = "Department created successfully"
    department: DepartmentResponse

class DepartmentUpdateResponse(BaseModel):
    """Response schema for department update"""
    message: str = "Department updated successfully"
    department: DepartmentResponse

class DepartmentDeleteResponse(BaseModel):
    """Response schema for department deletion"""
    message: str = "Department deleted successfully"
    id: UUID
