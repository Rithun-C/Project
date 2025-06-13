from fastapi import FastAPI
from app.api.v1 import auth, assignments, departments, students, teachers, subjects, quizzes, tests, sections, marks
from app.db.init_db import init_db
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",  # Next frontend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins, 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


init_db()

# Include the authentication router
app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(assignments.router, prefix="/assignments", tags=["Assignments"])
app.include_router(departments.router, prefix="/departments", tags=["Departments"])
app.include_router(quizzes.router, prefix="/quizzes", tags=["Quizzes"])
app.include_router(sections.router, prefix="/sections", tags=["Sections"])
app.include_router(students.router, prefix="/students", tags=["Students"])
app.include_router(subjects.router, prefix="/subjects", tags=["Subjects"])
app.include_router(teachers.router, prefix="/teachers", tags=["Teachers"])
app.include_router(tests.router, prefix="/tests", tags=["Tests"])
app.include_router(marks.router, prefix="/marks", tags=["Marks"])