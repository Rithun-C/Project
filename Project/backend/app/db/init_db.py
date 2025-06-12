# app/db/init_db.py

from app.db.database import Base, engine
from app.models.teacher import Teacher
from app.models.department import Department
from app.models.assignment import Assignment
from app.models.marks import Marks
from app.models.student import Student
from app.models.subject import Subject
from app.models.section import Section  
from app.models.test import Test
from app.models.quiz import Quiz
from app.models.SubjectTeacherSection import SubjectTeacherSection

def init_db():
    Base.metadata.create_all(bind=engine)
