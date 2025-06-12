from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.section import SectionCreate, SectionResponse
from app.models import Section
from app.db.session import get_db

router = APIRouter(prefix="/sections", tags=["sections"])

@router.post("/", response_model=SectionResponse)
def create_section(data: SectionCreate, db: Session = Depends(get_db)):
    section = Section(**data.dict())
    db.add(section)
    db.commit()
    db.refresh(section)
    return section

@router.get("/", response_model=list[SectionResponse])
def get_sections(db: Session = Depends(get_db)):
    return db.query(Section).all()

