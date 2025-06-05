# # --- app/api/teacher.py ---
# from fastapi import APIRouter, Depends
# from sqlalchemy.orm import Session
# from app.schemas.teacher import TeacherCreate, TeacherOut
# from app.models import Teacher
# from app.core.database import SessionLocal

# router = APIRouter(prefix="/teachers", tags=["teachers"])

# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()

# @router.post("/", response_model=TeacherOut)
# def create_teacher(data: TeacherCreate, db: Session = Depends(get_db)):
#     teacher = Teacher(**data.dict())
#     db.add(teacher)
#     db.commit()
#     db.refresh(teacher)
#     return teacher

# @router.get("/", response_model=list[TeacherOut])
# def get_teachers(db: Session = Depends(get_db)):
#     return db.query(Teacher).all()

# # backend/app/api/v1/teachers.py
# from fastapi import APIRouter, Depends, HTTPException, status, Query
# from sqlalchemy.orm import Session
# from typing import List, Optional

# from app.db.session import get_db
# from app.schemas.teacher import TeacherCreate, TeacherUpdate, TeacherResponse, TeacherListResponse
# from app.services.teacher_service import TeacherService
# from app.services.auth_service import AuthService
# from app.api.v1.auth import oauth2_scheme

# router = APIRouter()

# @router.post("/", response_model=TeacherResponse)
# async def create_teacher(
#     teacher_data: TeacherCreate,
#     db: Session = Depends(get_db),
#     token: str = Depends(oauth2_scheme)
# ):
#     """Create a new teacher (Admin only)"""
#     current_user = AuthService.get_current_user(db, token)
#     if not current_user or current_user.user_type != "admin":
#         raise HTTPException(
#             status_code=status.HTTP_403_FORBIDDEN,
#             detail="Only admins can create teachers"
#         )
    
#     # Check if teacher already exists
#     if TeacherService.get_teacher_by_email(db, teacher_data.email):
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST,
#             detail="Teacher with this email already exists"
#         )
    
#     teacher = TeacherService.create_teacher(db, teacher_data)
#     return teacher

# @router.get("/", response_model=List[TeacherListResponse])
# async def get_teachers(
#     skip: int = Query(0, ge=0),
#     limit: int = Query(100, ge=1, le=1000),
#     department_id: Optional[int] = None,
#     search: Optional[str] = None,
#     db: Session = Depends(get_db),
#     token: str = Depends(oauth2_scheme)
# ):
#     """Get list of teachers with filtering options"""
#     current_user = AuthService.get_current_user(db, token)
#     if not current_user:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Authentication required"
#         )
    
#     teachers = TeacherService.get_teachers(
#         db,
#         skip=skip,
#         limit=limit,
#         department_id=department_id,
#         search=search
#     )
#     return teachers

# @router.get("/{teacher_id}", response_model=TeacherResponse)
# async def get_teacher(
#     teacher_id: int,
#     db: Session = Depends(get_db),
#     token: str = Depends(oauth2_scheme)
# ):
#     """Get teacher by ID"""
#     current_user = AuthService.get_current_user(db, token)
#     if not current_user:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Authentication required"
#         )
    
#     # Teachers can only view their own profile unless admin
#     if (current_user.user_type == "teacher" and current_user.id != teacher_id) and \
#        current_user.user_type != "admin":
#         raise HTTPException(
#             status_code=status.HTTP_403_FORBIDDEN,
#             detail="Insufficient permissions"
#         )
    
#     teacher = TeacherService.get_teacher_by_id(db, teacher_id)
#     if not teacher:
#         raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND,
#             detail="Teacher not found"
#         )
    
#     return teacher

# @router.put("/{teacher_id}", response_model=TeacherResponse)
# async def update_teacher(
#     teacher_id: int,
#     teacher_update: TeacherUpdate,
#     db: Session = Depends(get_db),
#     token: str = Depends(oauth2_scheme)
# ):
#     """Update teacher information"""
#     current_user = AuthService.get_current_user(db, token)
#     if not current_user:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Authentication required"
#         )
    
#     # Check permissions - teachers can update their own profile, admins can update any
#     if (current_user.user_type == "teacher" and current_user.id != teacher_id) and \
#        current_user.user_type != "admin":
#         raise HTTPException(
#             status_code=status.HTTP_403_FORBIDDEN,
#             detail="Insufficient permissions"
#         )
    
#     teacher = TeacherService.update_teacher(db, teacher_id, teacher_update)
#     if not teacher:
#         raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND,
#             detail="Teacher not found"
#         )
    
#     return teacher

# @router.delete("/{teacher_id}")
# async def delete_teacher(
#     teacher_id: int,
#     db: Session = Depends(get_db),
#     token: str = Depends(oauth2_scheme)
# ):
#     """Delete a teacher (Admin only)"""
#     current_user = AuthService.get_current_user(db, token)
#     if not current_user or current_user.user_type != "admin":
#         raise HTTPException(
#             status_code=status.HTTP_403_FORBIDDEN,
#             detail="Only admins can delete teachers"
#         )
    
#     success = TeacherService.delete_teacher(db, teacher_id)
#     if not success:
#         raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND,
#             detail="Teacher not found"
#         )
    
#     return {"message": "Teacher deleted successfully"}

# @router.get("/{teacher_id}/subjects", response_model=List[dict])
# async def get_teacher_subjects(
#     teacher_id: int,
#     db: Session = Depends(get_db),
#     token: str = Depends(oauth2_scheme)
# ):
#     """Get subjects taught by a teacher"""
#     current_user = AuthService.get_current_user(db, token)
#     if not current_user:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Authentication required"
#         )
    
#     subjects = TeacherService.get_teacher_subjects(db, teacher_id)
#     return subjects

# @router.post("/{teacher_id}/assign/{subject_id}")
# async def assign_teacher_to_subject(
#     teacher_id: int,
#     subject_id: int,
#     db: Session = Depends(get_db),
#     token: str = Depends(oauth2_scheme)
# ):
#     """Assign teacher to a subject"""
#     current_user = AuthService.get_current_user(db, token)
#     if not current_user or current_user.user_type != "admin":
#         raise HTTPException(
#             status_code=status.HTTP_403_FORBIDDEN,
#             detail="Only admins can assign teachers to subjects"
#         )
    
#     success = TeacherService.assign_teacher_to_subject(db, teacher_id, subject_id)
#     if not success:
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST,
#             detail="Failed to assign teacher. Check if teacher and subject exist."
#         )
    
#     return {"message": "Teacher assigned successfully"}

# @router.delete("/{teacher_id}/unassign/{subject_id}")
# async def unassign_teacher_from_subject(
#     teacher_id: int,
#     subject_id: int,
#     db: Session = Depends(get_db),
#     token: str = Depends(oauth2_scheme)
# ):
#     """Remove teacher assignment from a subject"""
#     current_user = AuthService.get_current_user(db, token)
#     if not current_user or current_user.user_type != "admin":
#         raise HTTPException(
#             status_code=status.HTTP_403_FORBIDDEN,
#             detail="Only admins can unassign teachers"
#         )
    
#     success = TeacherService.unassign_teacher_from_subject(db, teacher_id, subject_id)
#     if not success:
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST,
#             detail="Failed to unassign teacher"
#         )
    
#     return {"message": "Teacher unassigned successfully"}

# @router.get("/{teacher_id}/students", response_model=List[dict])
# async def get_teacher_students(
#     teacher_id: int,
#     subject_id: Optional[int] = None,
#     db: Session = Depends(get_db),
#     token: str = Depends(oauth2_scheme)
# ):
#     """Get students taught by a teacher (optionally filtered by subject)"""
#     current_user = AuthService.get_current_user(db, token)
#     if not current_user:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Authentication required"
#         )
    
#     # Teachers can only view their own students
#     if current_user.user_type == "teacher" and current_user.id != teacher_id:
#         raise HTTPException(
#             status_code=status.HTTP_403_FORBIDDEN,
#             detail="You can only view your own students"
#         )
    
#     students = TeacherService.get_teacher_students(db, teacher_id, subject_id)
#     return students