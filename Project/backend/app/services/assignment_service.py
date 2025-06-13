from app.models.assignment import Assignment
from app.schemas.assignment import AssignmentCreate, AssignmentResponse
from app.db.session import get_db
from sqlalchemy.orm import Session

class AssignmentService:    
    def create_assignment(self, db: Session, assignment_data: AssignmentCreate) -> AssignmentResponse:
        """Create a new assignment"""
        new_assignment = Assignment(**assignment_data.dict())
        db.add(new_assignment)
        db.commit()
        db.refresh(new_assignment)
        return new_assignment
    
    
    def get_assignments(
        self, 
        db: Session, 
        skip: int = 0, 
        limit: int = 100, 
        section_id: int = None, 
        subject_id: int = None, 
        search: str = None
    ) -> list[AssignmentResponse]:
        """Get list of assignments with optional filters"""
        query = db.query(Assignment)
        
        if section_id:
            query = query.filter(Assignment.section_id == section_id)
        
        if subject_id:
            query = query.filter(Assignment.department_id == subject_id)
        
        if search:
            query = query.filter(Assignment.title.ilike(f"%{search}%"))
        
        assignments = query.offset(skip).limit(limit).all()
        return assignments
    
    def get_assignment_by_id(self, db: Session, assignment_id: int) -> AssignmentResponse:  
        """Get assignment by ID"""
        assignment = db.query(Assignment).filter(Assignment.id == assignment_id).first()
        if not assignment:
            raise ValueError("Assignment not found")
        return assignment     
    
    def update_assignment(self, db: Session, assignment_id: int, assignment_data: AssignmentCreate) -> AssignmentResponse:
        """Update an existing assignment"""
        assignment = db.query(Assignment).filter(Assignment.id == assignment_id).first()
        if not assignment:
            raise ValueError("Assignment not found")
        
        for key, value in assignment_data.dict().items():
            setattr(assignment, key, value)
        
        db.commit()
        db.refresh(assignment)
        return assignment
    
    def get_assignment_by_name(self, db: Session, name: str) -> AssignmentResponse:
        """Get assignment by name"""
        return db.query(Assignment).filter(Assignment.name == name).first()
    
    