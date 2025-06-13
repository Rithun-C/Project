from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from uuid import UUID
from typing import List
from datetime import datetime

from app.db.session import get_db
from app.schemas.marks import (
    MarksCreate, MarksUpdate, MarksResponse, MarksListResponse,
    MarksQueryParams, MarksCreateResponse, MarksUpdateResponse,
    MarksDeleteResponse, BulkMarksCreate, BulkMarksCreateResponse,
    MarksStatistics
)
from app.services.mark_service import MarksService
from app.services.auth_service import AuthService
from app.api.v1.auth import oauth2_scheme

router = APIRouter()

@router.post("/", response_model=MarksCreateResponse)
async def create_marks(
    marks_data: MarksCreate,
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    current_user = AuthService.get_current_user(db, token)
    if not current_user:
        raise HTTPException(status_code=401, detail="Authentication required")
    
    marks = MarksService.create_marks(db, marks_data)
    return MarksCreateResponse(marks=marks)

@router.get("/{marks_id}", response_model=MarksResponse)
async def get_marks(
    marks_id: UUID,
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    current_user = AuthService.get_current_user(db, token)
    if not current_user:
        raise HTTPException(status_code=401, detail="Authentication required")

    marks = MarksService.get_marks_by_id(db, marks_id)
    if not marks:
        raise HTTPException(status_code=404, detail="Marks record not found")
    
    return marks

@router.put("/{marks_id}", response_model=MarksUpdateResponse)
async def update_marks(
    marks_id: UUID,
    marks_update: MarksUpdate,
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    current_user = AuthService.get_current_user(db, token)
    if not current_user:
        raise HTTPException(status_code=401, detail="Authentication required")
    
    updated_marks = MarksService.update_marks(db, marks_id, marks_update)
    if not updated_marks:
        raise HTTPException(status_code=404, detail="Marks record not found")
    
    return MarksUpdateResponse(marks=updated_marks)

@router.delete("/{marks_id}", response_model=MarksDeleteResponse)
async def delete_marks(
    marks_id: UUID,
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    current_user = AuthService.get_current_user(db, token)
    if not current_user:
        raise HTTPException(status_code=401, detail="Authentication required")

    success = MarksService.delete_marks(db, marks_id)
    if not success:
        raise HTTPException(status_code=404, detail="Marks record not found")
    
    return MarksDeleteResponse(id=marks_id)

@router.get("/", response_model=MarksListResponse)
async def list_marks(
    page: int = Query(1, ge=1),
    per_page: int = Query(10, ge=1, le=100),
    student_id: UUID = Query(None),
    quiz_id: UUID = Query(None),
    test_id: UUID = Query(None),
    is_active: bool = Query(None),
    graded_from: datetime = Query(None),
    graded_to: datetime = Query(None),
    min_marks: float = Query(None, ge=0),
    max_marks: float = Query(None, ge=0),
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    current_user = AuthService.get_current_user(db, token)
    if not current_user:
        raise HTTPException(status_code=401, detail="Authentication required")

    params = MarksQueryParams(
        page=page,
        per_page=per_page,
        student_id=student_id,
        quiz_id=quiz_id,
        test_id=test_id,
        is_active=is_active,
        graded_from=graded_from,
        graded_to=graded_to,
        min_marks=min_marks,
        max_marks=max_marks
    )

    return MarksService.list_marks(db, params)

@router.post("/bulk", response_model=BulkMarksCreateResponse)
async def bulk_create_marks(
    bulk_data: BulkMarksCreate,
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    current_user = AuthService.get_current_user(db, token)
    if not current_user:
        raise HTTPException(status_code=401, detail="Authentication required")

    return MarksService.bulk_create_marks(db, bulk_data)

@router.get("/statistics", response_model=MarksStatistics)
async def get_marks_statistics(
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    current_user = AuthService.get_current_user(db, token)
    if not current_user:
        raise HTTPException(status_code=401, detail="Authentication required")

    return MarksService.get_statistics(db)
