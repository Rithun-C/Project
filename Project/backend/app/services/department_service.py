from app.schemas.department import DepartmentCreate, DepartmentResponse
from app.db.session import get_db
from sqlalchemy.orm import Session      
from app.models.section import Section
from app.models.department import Department

class DepartmentService:
    @staticmethod
    def create_department(db: Session, department_data: DepartmentCreate) -> DepartmentResponse:
        """Create a new department"""
        new_department = Department(**department_data.dict())
        db.add(new_department)
        db.commit()
        db.refresh(new_department)
        return DepartmentResponse.model_validate(new_department)

    @staticmethod
    def get_departments(db: Session, skip: int = 0, limit: int = 100, search: str = None) -> list[DepartmentResponse]:
        """Get list of departments with optional filters"""
        query = db.query(Department)  # ✅ Use ORM model

        if search:
            query = query.filter(Department.name.ilike(f"%{search}%"))  # ✅ Use model column

        departments = query.offset(skip).limit(limit).all()
        return [DepartmentResponse.model_validate(dep) for dep in departments]  # ✅ Convert to Pydantic

    @staticmethod
    def get_department_by_name(db: Session, name: str) -> DepartmentResponse | None:
        """Get department by name"""
        department = db.query(Department).filter(Department.name == name).first()
        if department:
            return DepartmentResponse.model_validate(department)
        return None

    @staticmethod
    def get_department_by_id(db: Session, department_id: int) -> DepartmentResponse | None:
        """Get department by ID"""
        department = db.query(Department).filter(Department.id == department_id).first()
        if department:
            return DepartmentResponse.model_validate(department)
        return None

    @staticmethod
    def update_department(db: Session, department_id: int, department_data: DepartmentCreate) -> DepartmentResponse:
        """Update an existing department"""
        department = db.query(Department).filter(Department.id == department_id).first()
        if not department:
            raise ValueError("Department not found")

        for key, value in department_data.dict().items():
            setattr(department, key, value)

        db.commit()
        db.refresh(department)
        return DepartmentResponse.model_validate(department)

    @staticmethod
    def get_sections_by_department(db: Session, department_id: int) -> list:
        """Get sections associated with a department"""
        return db.query(Section).filter(Section.department_id == department_id).all()
