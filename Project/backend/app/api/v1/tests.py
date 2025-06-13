from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID

from app.db.session import get_db
from app.services.test_service import TestService
from app.services.auth_service import AuthService
from app.api.v1.auth import oauth2_scheme
from app.schemas.test import (
    TestCreate,
    TestUpdate,
    TestResponse,
    TestListResponse,
    TestCreateResponse,
    TestUpdateResponse,
    TestDeleteResponse,
    TestQueryParams,
)

router = APIRouter()

@router.post("/", response_model=TestCreateResponse)
async def create_test(
    test_data: TestCreate,
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    """Create a new test (Teacher/Admin only)"""
    current_user = AuthService.get_current_user(db, token)
    if not current_user or current_user.user_type not in ["teacher", "admin"]:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access denied")

    test = TestService.create_test(db, test_data)
    return TestCreateResponse(test=test)

@router.get("/{test_id}", response_model=TestResponse)
async def get_test_by_id(
    test_id: UUID,
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    """Get a test by ID"""
    current_user = AuthService.get_current_user(db, token)
    if not current_user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication required")
    
    test = TestService.get_test_by_id(db, test_id)
    if not test:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Test not found")
    return test

@router.put("/{test_id}", response_model=TestUpdateResponse)
async def update_test(
    test_id: UUID,
    test_data: TestUpdate,
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    """Update a test (Teacher/Admin only)"""
    current_user = AuthService.get_current_user(db, token)
    if not current_user or current_user.user_type not in ["teacher", "admin"]:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access denied")
    
    updated_test = TestService.update_test(db, test_id, test_data)
    if not updated_test:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Test not found")
    
    return TestUpdateResponse(test=updated_test)

@router.delete("/{test_id}", response_model=TestDeleteResponse)
async def delete_test(
    test_id: UUID,
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    """Delete a test (Teacher/Admin only)"""
    current_user = AuthService.get_current_user(db, token)
    if not current_user or current_user.user_type not in ["teacher", "admin"]:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access denied")
    
    success = TestService.delete_test(db, test_id)
    if not success:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Test not found")
    
    return TestDeleteResponse(id=test_id)

@router.get("/", response_model=TestListResponse)
async def list_tests(
    query_params: TestQueryParams = Depends(),
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    """List all tests with pagination and filters"""
    current_user = AuthService.get_current_user(db, token)
    if not current_user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication required")
    
    return TestService.list_tests(db, query_params)

@router.post("/{test_id}/submit")
async def submit_test_pdf(
    test_id: UUID,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    """Students upload PDF for a test"""
    current_user = AuthService.get_current_user(db, token)
    if not current_user or current_user.user_type != "student":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Only students can submit answers")

    # You can save file to disk or DB here
    contents = await file.read()
    # Optionally save to file system or storage
    file_location = f"uploads/test_submissions/{current_user.id}_{test_id}.pdf"
    with open(file_location, "wb") as f:
        f.write(contents)

    return {"message": "PDF submitted successfully", "file_path": file_location}
