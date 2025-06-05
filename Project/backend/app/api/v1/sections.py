from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.section import SectionCreate, SectionOut
from app.models import Section
from app.core.database import SessionLocal

router = APIRouter(prefix="/sections", tags=["sections"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=SectionOut)
def create_section(data: SectionCreate, db: Session = Depends(get_db)):
    section = Section(**data.dict())
    db.add(section)
    db.commit()
    db.refresh(section)
    return section

@router.get("/", response_model=list[SectionOut])
def get_sections(db: Session = Depends(get_db)):
    return db.query(Section).all()

