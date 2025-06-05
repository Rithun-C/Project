# from fastapi import APIRouter, Depends, HTTPException, status, Query
# from sqlalchemy.orm import Session
# from typing import List, Optional

# from app.db.session import get_db
# from app.schemas.subject import SubjectCreate, SubjectUpdate, SubjectResponse, SubjectListResponse
# from app.services.subject_service import SubjectService
# from app.services.auth_service import AuthService
# from app.api.v1.auth import oauth2_scheme

# router = APIRouter()

# @router.post("/", response_model=SubjectResponse)
# async def create_subject(
#     subject_data: SubjectCreate,
#     db: Session = Depends(get_db),
#     token: str = Depends(oauth2_scheme)
# ):
#     """Create a new subject (Admin only)"""
#     current_user = AuthService.get_current_user(db, token)
#     if not current_user or current_user.user_type != "admin":
#         raise HTTPException(
#             status_code=status.HTTP_403_FORBIDDEN,
#             detail="Only admins can create subjects"
#         )
    
#     # Check if subject code already exists
#     if SubjectService.get_subject_by_code(db, subject_data.subject_code):
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST,
#             detail="Subject with this code already exists"
#         )
    
#     subject = SubjectService.create_subject(db, subject_data)
#     return subject

# @router.get("/", response_model=List[SubjectListResponse])
# async def get_subjects(
#     skip: int = Query(0, ge=0),
#     limit: int = Query(100, ge=1, le=1000),
#     department_id: Optional[int] = None,
#     search: Optional[str] = None,
#     semester: Optional[int] = None,
#     year: Optional[int] = None,
#     db: Session = Depends(get_db),
#     token: str = Depends(oauth2_scheme)
# ):
#     """Get list of subjects with filtering options"""
#     current_user = AuthService.get_current_user(db, token)
#     if not current_user:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Authentication required"
#         )
    
#     subjects = SubjectService.get_subjects(
#         db,
#         skip=skip,
#         limit=limit,
#         department_id=department_id,
#         search=search,
#         semester=semester,
#         year=year
#     )
#     return subjects

# @router.get("/{subject_id}", response_model=SubjectResponse)
# async def get_subject(
#     subject_id: int,
#     db: Session = Depends(get_db),
#     token: str = Depends(oauth2_scheme)
# ):
#     """Get subject by ID"""
#     current_user = AuthService.get_current_user(db, token)
#     if not current_user:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Authentication required"
#         )
    
#     subject = SubjectService.get_subject_by_id(db, subject_id)
#     if not subject:
#         raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND,
#             detail="Subject not found"
#         )
    
#     return subject

# @router.put("/{subject_id}", response_model=SubjectResponse)
# async def update_subject(
#     subject_id: int,
#     subject_update: SubjectUpdate,
#     db: Session = Depends(get_db),
#     token: str = Depends(oauth2_scheme)
# ):
#     """Update subject information (Admin only)"""
#     current_user = AuthService.get_current_user(db, token)
#     if not current_user or current_user.user_type != "admin":
#         raise HTTPException(
#             status_code=status.HTTP_403_FORBIDDEN,
#             detail="Only admins can update subjects"
#         )
    
#     subject = SubjectService.update_subject(db, subject_id, subject_update)
#     if not subject:
#         raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND,
#             detail="Subject not found"
#         )
    
#     return subject

# @router.delete("/{subject_id}")
# async def delete_subject(
#     subject_id: int,
#     db: Session = Depends(get_db),
#     token: str = Depends(oauth2_scheme)
# ):
#     """Delete a subject (Admin only)"""
#     current_user = AuthService.get_current_user(db, token)
#     if not current_user or current_user.user_type != "admin":
#         raise HTTPException(
#             status_code=status.HTTP_403_FORBIDDEN,
#             detail="Only admins can delete subjects"
#         )
    
#     success = SubjectService.delete_subject(db, subject_id)
#     if not success:
#         raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND,
#             detail="Subject not found"
#         )
    
#     return {"message": "Subject deleted successfully"}

# @router.get("/{subject_id}/students", response_model=List[dict])
# async def get_subject_students(
#     subject_id: int,
#     db: Session = Depends(get_db),
#     token: str = Depends(oauth2_scheme)
# ):
#     """Get students enrolled in a subject"""
#     current_user = AuthService.get_current_user(db, token)
#     if not current_user:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Authentication required"
#         )
    
#     # Teachers can only see students in subjects they teach
#     if current_user.user_type == "teacher":
#         teacher_subjects = SubjectService.get_teacher_subjects(db, current_user.id)
#         subject_ids = [s.id for s in teacher_subjects]
#         if subject_id not in subject_ids:
#             raise HTTPException(
#                 status_code=status.HTTP_403_FORBIDDEN,
#                 detail="You can only view students in subjects you teach"
#             )
    
#     students = SubjectService.get_subject_students(db, subject_id)
#     return students

# @router.get("/{subject_id}/teachers", response_model=List[dict])
# async def get_subject_teachers(
#     subject_id: int,
#     db: Session = Depends(get_db),
#     token: str = Depends(oauth2_scheme)
# ):
#     """Get teachers assigned to a subject"""
#     current_user = AuthService.get_current_user(db, token)
#     if not current_user:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Authentication required"
#         )
    
#     teachers = SubjectService.get_subject_teachers(db, subject_id)
#     return teachers

# @router.get("/{subject_id}/syllabus")
# async def get_subject_syllabus(
#     subject_id: int,
#     db: Session = Depends(get_db),
#     token: str = Depends(oauth2_scheme)
# ):
#     """Get subject syllabus"""
#     current_user = AuthService.get_current_user(db, token)
#     if not current_user:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Authentication required"
#         )
    
#     syllabus = SubjectService.get_subject_syllabus(db, subject_id)
#     if not syllabus:
#         raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND,
#             detail="Syllabus not found"
#         )
    
#     return syllabus

# @router.put("/{subject_id}/syllabus")
# async def update_subject_syllabus(
#     subject_id: int,
#     syllabus_data: dict,
#     db: Session