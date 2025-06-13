from app.schemas.quiz import QuizCreate, QuizResponse
from app.models.quiz import Quiz         
from app.db.session import get_db
from sqlalchemy.orm import Session

class QuizService:
    @staticmethod
    def create_quiz(db: Session, quiz_data: QuizCreate) -> QuizResponse:
        """Create a new quiz"""
        new_quiz = Quiz(**quiz_data.dict())
        db.add(new_quiz)
        db.commit()
        db.refresh(new_quiz)
        return new_quiz

    @staticmethod
    def get_quizzes(db: Session, skip: int = 0, limit: int = 100, search: str = None) -> list[QuizResponse]:
        """Get list of quizzes with optional filters"""
        query = db.query(Quiz)
        
        if search:
            query = query.filter(Quiz.title.ilike(f"%{search}%"))
        
        return query.offset(skip).limit(limit).all()

    @staticmethod
    def get_quiz_by_id(db: Session, quiz_id: int) -> QuizResponse:
        """Get quiz by ID"""
        return db.query(Quiz).filter(Quiz.id == quiz_id).first()
    
    @staticmethod
    def update_quiz(db: Session, quiz_id: int, quiz_data: QuizCreate) -> QuizResponse:
        """Update an existing quiz"""
        quiz = db.query(Quiz).filter(Quiz.id == quiz_id).first()
        if not quiz:
            raise ValueError("Quiz not found")
        
        for key, value in quiz_data.dict().items():
            setattr(quiz, key, value)
        
        db.commit()
        db.refresh(quiz)
        return quiz
    
    def get_quiz_by_name(db: Session, name: str) -> QuizResponse:
        """Get quiz by name"""
        return db.query(Quiz).filter(Quiz.name == name).first()