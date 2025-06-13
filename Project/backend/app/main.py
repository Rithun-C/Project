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

@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI!"}

# Include the authentication router
router.include_router(auth.router, prefix="/auth", tags=["authentication"])
router.include_router(assignments.router, prefix="/assignments", tags=["assignments"])
router.include_router(departments.router, prefix="/departments", tags=["departments"])
router.include_router(quizzes.router, prefix="/quizzes", tags=["quizzes"])
router.include_router(sections.router, prefix="/sections", tags=["sections"])
router.include_router(students.router, prefix="/students", tags=["students"])
router.include_router(subjects.router, prefix="/subjects", tags=["subjects"])
router.include_router(teachers.router, prefix="/teachers", tags=["teachers"])
router.include_router(tests.router, prefix="/tests", tags=["tests"])
router.include_router(marks.router, prefix="/marks", tags=["marks"])