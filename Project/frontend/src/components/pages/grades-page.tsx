import { GradeCard } from "../grade-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Award, Target } from "lucide-react"

const grades = [
  {
    course: "Advanced Mathematics",
    currentGrade: "A-",
    percentage: 88,
    trend: "up" as const,
    lastAssignment: "Problem Set #4",
    lastScore: "92/100",
  },
  {
    course: "Physics Laboratory",
    currentGrade: "B+",
    percentage: 85,
    trend: "stable" as const,
    lastAssignment: "Lab Report #2",
    lastScore: "85/100",
  },
  {
    course: "Organic Chemistry",
    currentGrade: "A",
    percentage: 94,
    trend: "up" as const,
    lastAssignment: "Midterm Exam",
    lastScore: "96/100",
  },
  {
    course: "English Literature",
    currentGrade: "A",
    percentage: 91,
    trend: "stable" as const,
    lastAssignment: "Essay #2",
    lastScore: "89/100",
  },
  {
    course: "Computer Science",
    currentGrade: "B+",
    percentage: 87,
    trend: "up" as const,
    lastAssignment: "Project #2",
    lastScore: "90/100",
  },
  {
    course: "History",
    currentGrade: "A+",
    percentage: 97,
    trend: "stable" as const,
    lastAssignment: "Research Paper",
    lastScore: "98/100",
  },
]

export function GradesPage() {
  const overallGPA = 3.7
  const semesterGPA = 3.8
  const totalCredits = 18

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Grades</h1>
        <p className="text-muted-foreground">Track your academic performance and progress</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall GPA</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallGPA}</div>
            <p className="text-xs text-muted-foreground">Cumulative</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Semester GPA</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{semesterGPA}</div>
            <p className="text-xs text-muted-foreground">Current semester</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Credit Hours</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCredits}</div>
            <p className="text-xs text-muted-foreground">This semester</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Semester Progress</CardTitle>
          <CardDescription>Your progress towards semester completion</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Semester Completion</span>
              <span>75%</span>
            </div>
            <Progress value={75} className="h-2" />
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Weeks Completed:</span>
              <span className="ml-2 font-medium">12 of 16</span>
            </div>
            <div>
              <span className="text-muted-foreground">Assignments Completed:</span>
              <span className="ml-2 font-medium">24 of 32</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-xl font-semibold mb-4">Course Grades</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {grades.map((grade, index) => (
            <GradeCard key={index} {...grade} />
          ))}
        </div>
      </div>
    </div>
  )
}
