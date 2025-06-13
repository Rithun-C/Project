from app.schemas.department import DepartmentCreate, DepartmentResponse
from app.db.session import get_db
from sqlalchemy.orm import Session      
from app.models.section import Section

class DepartmentService:
    @staticmethod
    def create_department(db: Session, department_data: DepartmentCreate) -> DepartmentResponse:
        """Create a new department"""
        new_department = DepartmentResponse(**department_data.dict())
        db.add(new_department)
        db.commit()
        db.refresh(new_department)
        return new_department

    @staticmethod
    def get_departments(db: Session, skip: int = 0, limit: int = 100, search: str = None) -> list[DepartmentResponse]:
        """Get list of departments with optional filters"""
        query = db.query(DepartmentResponse)
        
        if search:
            query = query.filter(DepartmentResponse.name.ilike(f"%{search}%"))
        
        return query.offset(skip).limit(limit).all()

    @staticmethod
    def get_department_by_name(db: Session, name: str) -> DepartmentResponse:
        """Get department by name"""
        return db.query(DepartmentResponse).filter(DepartmentResponse.name == name).first()
    
    @staticmethod
    def get_department_by_id(db: Session, department_id: int) -> DepartmentResponse:
        """Get department by ID"""
        return db.query(DepartmentResponse).filter(DepartmentResponse.id == department_id).first()
    
    @staticmethod
    def update_department(db: Session, department_id: int, department_data: DepartmentCreate) -> DepartmentResponse:
        """Update an existing department"""
        department = db.query(DepartmentResponse).filter(DepartmentResponse.id == department_id).first()
        if not department:
            raise ValueError("Department not found")
        
        for key, value in department_data.dict().items():
            setattr(department, key, value)
        
        db.commit()
        db.refresh(department)
        return department
    
    @staticmethod
    def get_sections_by_department(db: Session, department_id: int) -> list:
        """Get sections associated with a department"""
        return db.query(Section).filter(Section.department_id == department_id).all()
    