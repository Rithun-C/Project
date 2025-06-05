from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.department import DepartmentCreate, DepartmentOut
from app.models import Department
from app.core.database import SessionLocal

router = APIRouter(prefix="/departments", tags=["departments"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=DepartmentOut)
def create_department(data: DepartmentCreate, db: Session = Depends(get_db)):
    department = Department(**data.dict())
    db.add(department)
    db.commit()
    db.refresh(department)
    return department

@router.get("/", response_model=list[DepartmentOut])
def get_departments(db: Session = Depends(get_db)):
    return db.query(Department).all()
