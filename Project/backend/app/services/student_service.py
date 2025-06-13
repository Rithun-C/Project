from app.models.student import Student
from sqlalchemy.orm import Session

class StudentService:
    def create_student(db: Session, student_data):
        """Create a new student in the database."""
        new_student = Student(**student_data.dict())
        db.add(new_student)
        db.commit()
        db.refresh(new_student)
        return new_student
    
    @staticmethod
    def get_student_by_id(db: Session, student_id: int):
        """Retrieve a student by their ID."""
        return db.query(Student).filter(Student.id == student_id).first()   
    
    @staticmethod
    def get_students(db: Session, skip: int = 0, limit: int = 100, section_id: int = None, department_id: int = None, search: str = None):
        """Retrieve a list of students with optional filtering."""
        query = db.query(Student)
        
        if section_id:
            query = query.filter(Student.section_id == section_id)
        if department_id:
            query = query.filter(Student.department_id == department_id)
        if search:
            query = query.filter(Student.name.ilike(f"%{search}%"))
        
        return query.offset(skip).limit(limit).all()
    
    @staticmethod
    def update_student(db: Session, student_id: int, student_data):
        """Update an existing student's information."""
        student = db.query(Student).filter(Student.id == student_id).first()
        if not student:
            return None
        for key, value in student_data.dict().items():
            setattr(student, key, value)
        db.commit()
        db.refresh(student)
        return student
    
    @staticmethod
    def get_student_by_email(db: Session, email: str):
        """Retrieve a student by their email address."""
        return db.query(Student).filter(Student.email == email).exists()
