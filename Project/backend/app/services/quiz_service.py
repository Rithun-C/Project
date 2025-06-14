from typing import List, Optional
from app.schemas.quiz import QuizCreate, QuizResponse,QuizUpdate
from app.models.quiz import Quiz
from app.db.session import get_db
from sqlalchemy.orm import Session
from pydantic import TypeAdapter

class QuizService:
    @staticmethod
    def create_quiz(db: Session, quiz_data: QuizCreate) -> QuizResponse:
        """Create a new quiz"""
        new_quiz = Quiz(**quiz_data.model_dump())
        db.add(new_quiz)
        db.commit()
        db.refresh(new_quiz)
        return QuizResponse.model_validate(new_quiz)

    @staticmethod
    def get_quizzes(db: Session, skip: int = 0, limit: int = 100, search: Optional[str] = None) -> List[QuizResponse]:
        """Get list of quizzes with optional filters"""
        query = db.query(Quiz)
        if search:
            query = query.filter(Quiz.title.ilike(f"%{search}%"))
        quizzes = query.offset(skip).limit(limit).all()
        return TypeAdapter(List[QuizResponse]).validate_python(quizzes)

    @staticmethod
    def get_quiz_by_id(db: Session, quiz_id: int) -> Optional[QuizResponse]:
        """Get quiz by ID"""
        quiz = db.query(Quiz).filter(Quiz.id == quiz_id).first()
        return QuizResponse.model_validate(quiz) if quiz else None

    @staticmethod
    def update_quiz(db: Session, quiz_id: int, quiz_data: QuizUpdate) -> QuizResponse:
        """Update an existing quiz"""
        quiz = db.query(Quiz).filter(Quiz.id == quiz_id).first()
        if not quiz:
            raise ValueError("Quiz not found")
        for key, value in quiz_data.model_dump().items():
            setattr(quiz, key, value)
        db.commit()
        db.refresh(quiz)
        return QuizResponse.model_validate(quiz)

    @staticmethod
    def get_quiz_by_name(db: Session, name: str) -> Optional[QuizResponse]:
        """Get quiz by name"""
        quiz = db.query(Quiz).filter(Quiz.name == name).first()
        return QuizResponse.model_validate(quiz) if quiz else None
