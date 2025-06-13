from app.models.teacher import Teacher


class TeacherService:
    def get_teacher_by_email(db, email: str):
        """Get teacher by email"""
        return db.query(Teacher).filter(Teacher.email == email).first()
    
    def create_teacher(db, teacher_data):
        """Create a new teacher"""
        new_teacher = Teacher(**teacher_data.dict())
        db.add(new_teacher)
        db.commit()
        db.refresh(new_teacher)
        return new_teacher  
    
    def update_teacher(db, teacher_id: int, teacher_data):  
        """Update an existing teacher's information"""
        teacher = db.query(Teacher).filter(Teacher.id == teacher_id).first()
        if not teacher:
            return None
        for key, value in teacher_data.dict().items():
            setattr(teacher, key, value)
        db.commit()
        db.refresh(teacher)
        return teacher
    
    def get_teacher_by_id(db, teacher_id: int):
        """Retrieve a teacher by their ID"""
        return db.query(Teacher).filter(Teacher.id == teacher_id).first()
    
    def get_teachers(db, skip: int = 0, limit: int = 100, search: str = None):
        """Retrieve a list of teachers with optional filtering"""
        query = db.query(Teacher)
        
        if search:
            query = query.filter(Teacher.name.ilike(f"%{search}%"))
        
        return query.offset(skip).limit(limit).all()
    
    