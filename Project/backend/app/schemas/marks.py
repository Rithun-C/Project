from pydantic import BaseModel, Field, ConfigDict
from typing import Optional
from datetime import datetime
from uuid import UUID

class MarksBase(BaseModel):
    """Base schema for Marks with common fields"""
    student_id: UUID = Field(..., description="ID of the student")
    quiz_id: Optional[UUID] = Field(None, description="ID of the quiz (optional)")
    test_id: Optional[UUID] = Field(None, description="ID of the test (optional)")
    obtained_marks: float = Field(..., ge=0, description="Marks obtained by the student")
    graded_at: datetime = Field(..., description="When the marks were graded")
    is_active: bool = Field(True, description="Whether the marks record is active")

class MarksCreate(MarksBase):
    """Schema for creating a new marks record"""
    pass

class MarksUpdate(BaseModel):
    """Schema for updating a marks record"""
    student_id: Optional[UUID] = Field(None, description="ID of the student")
    quiz_id: Optional[UUID] = Field(None, description="ID of the quiz (optional)")
    test_id: Optional[UUID] = Field(None, description="ID of the test (optional)")
    obtained_marks: Optional[float] = Field(None, ge=0, description="Marks obtained by the student")
    graded_at: Optional[datetime] = Field(None, description="When the marks were graded")
    is_active: Optional[bool] = Field(None, description="Whether the marks record is active")

class MarksResponse(MarksBase):
    """Schema for marks response"""
    id: UUID = Field(..., description="Marks record ID")
    created_at: datetime = Field(..., description="When the marks record was created")
    updated_at: datetime = Field(..., description="When the marks record was last updated")
    
    model_config = ConfigDict(from_attributes=True)

class MarksListResponse(BaseModel):
    """Schema for paginated marks list response"""
    marks: list[MarksResponse]
    total: int = Field(..., description="Total number of marks records")
    page: int = Field(..., description="Current page number")
    per_page: int = Field(..., description="Number of items per page")
    total_pages: int = Field(..., description="Total number of pages")

class MarksSummary(BaseModel):
    """Schema for marks summary (minimal info)"""
    id: UUID
    student_id: UUID
    obtained_marks: float
    graded_at: datetime
    
    model_config = ConfigDict(from_attributes=True)

class MarksQueryParams(BaseModel):
    """Schema for marks query parameters"""
    page: int = Field(1, ge=1, description="Page number")
    per_page: int = Field(10, ge=1, le=100, description="Items per page")
    student_id: Optional[UUID] = Field(None, description="Filter by student ID")
    quiz_id: Optional[UUID] = Field(None, description="Filter by quiz ID")
    test_id: Optional[UUID] = Field(None, description="Filter by test ID")
    is_active: Optional[bool] = Field(None, description="Filter by active status")
    graded_from: Optional[datetime] = Field(None, description="Filter marks graded after this date")
    graded_to: Optional[datetime] = Field(None, description="Filter marks graded before this date")
    min_marks: Optional[float] = Field(None, ge=0, description="Filter by minimum marks")
    max_marks: Optional[float] = Field(None, ge=0, description="Filter by maximum marks")

class MarksCreateResponse(BaseModel):
    """Response schema for marks creation"""
    message: str = "Marks record created successfully"
    marks: MarksResponse

class MarksUpdateResponse(BaseModel):
    """Response schema for marks update"""
    message: str = "Marks record updated successfully"
    marks: MarksResponse

class MarksDeleteResponse(BaseModel):
    """Response schema for marks deletion"""
    message: str = "Marks record deleted successfully"
    id: UUID

# =============================================================================
# BULK OPERATIONS SCHEMAS
# =============================================================================

class BulkMarksCreate(BaseModel):
    """Schema for creating multiple marks records"""
    marks_list: list[MarksCreate] = Field(..., min_items=1, description="List of marks to create")

class BulkMarksCreateResponse(BaseModel):
    """Response schema for bulk marks creation"""
    message: str = "Marks records created successfully"
    created_count: int = Field(..., description="Number of marks records created")
    marks: list[MarksResponse]

# =============================================================================
# STATISTICS SCHEMAS
# =============================================================================

class MarksStatistics(BaseModel):
    """Schema for marks statistics"""
    total_records: int
    average_marks: float
    highest_marks: float
    lowest_marks: float
    student_count: int