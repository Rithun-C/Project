from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.department import DepartmentCreate, DepartmentResponse
from app.models import Department
from app.db.session import get_db

router = APIRouter(prefix="/departments", tags=["departments"])

@router.post("/", response_model=DepartmentResponse)
def create_department(data: DepartmentCreate, db: Session = Depends(get_db)):
    department = Department(**data.dict())
    db.add(department)
    db.commit()
    db.refresh(department)
    return department

@router.get("/", response_model=list[DepartmentResponse])
def get_departments(db: Session = Depends(get_db)):
    return db.query(Department).all()
