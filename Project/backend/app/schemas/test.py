from pydantic import BaseModel, Field, ConfigDict
from typing import Optional
from uuid import UUID
from datetime import datetime

class TestBase(BaseModel):
    title: str
    subject_id: UUID
    teacher_id: UUID
    section_id: UUID | None
    scheduled_date: datetime
    total_marks: int
    
class TestCreate(TestBase):
    pass

class TestUpdate(BaseModel):
    title: Optional[str]
    subject_id: Optional[UUID]
    teacher_id: Optional[UUID]
    section_id: Optional[UUID] | None
    scheduled_date: Optional[datetime]
    total_marks: Optional[int]
    
class TestResponse(TestBase):
    id: UUID = Field(..., description="Test ID")
    created_at: datetime = Field(..., description="When the Test was created")
    updated_at: datetime = Field(..., description="When the Test was last updated")

    model_config = ConfigDict(from_attributes=True)

class TestListResponse(BaseModel):
    """Schema for paginated quiz list response"""
    tests: list[TestResponse]
    total: int = Field(..., description="Total number of tests")
    page: int = Field(..., description="Current page number")
    per_page: int = Field(..., description="Number of items per page")
    total_pages: int = Field(..., description="Total number of pages")

class TestSummary(BaseModel):
    """Schema for test summary (minimal info)"""
    id: UUID
    title: str
    total_marks: int
    is_active: bool
    
    model_config = ConfigDict(from_attributes=True)

class TestQueryParams(BaseModel):
    """Schema for test query parameters"""
    page: int = Field(1, ge=1, description="Page number")
    per_page: int = Field(10, ge=1, le=100, description="Items per page")
    subject_id: Optional[UUID] = Field(None, description="Filter by subject ID")
    teacher_id: Optional[UUID] = Field(None, description="Filter by teacher ID")
    section_id: Optional[UUID] = Field(None, description="Filter by section ID")
    is_active: Optional[bool] = Field(None, description="Filter by active status")
    search: Optional[str] = Field(None, min_length=1, description="Search in test title")

class TestCreateResponse(BaseModel):
    """Response schema for test creation"""
    message: str = "Test created successfully"
    test: TestResponse

class TestUpdateResponse(BaseModel):
    """Response schema for test update"""
    message: str = "Test updated successfully"
    test: TestResponse

class TestDeleteResponse(BaseModel):
    """Response schema for test deletion"""
    message: str = "Test deleted successfully"
    id: UUID