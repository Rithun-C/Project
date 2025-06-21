import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BookOpen, FileText, TestTube, Clock, Trophy, AlertCircle, Calendar, TrendingUp } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const topScorers = [
  { name: "Sarah Johnson", score: 98, avatar: "/placeholder.svg?height=32&width=32", rank: 1 },
  { name: "Michael Chen", score: 96, avatar: "/placeholder.svg?height=32&width=32", rank: 2 },
  { name: "John Smith", score: 94, avatar: "/placeholder.svg?height=32&width=32", rank: 3, isCurrentUser: true },
  { name: "Emily Davis", score: 92, avatar: "/placeholder.svg?height=32&width=32", rank: 4 },
  { name: "Alex Wilson", score: 90, avatar: "/placeholder.svg?height=32&width=32", rank: 5 },
]

const pendingAssignments = [
  {
    title: "Calculus Integration Problems",
    course: "Advanced Mathematics",
    dueDate: "Tomorrow",
    priority: "high",
    timeLeft: "18 hours",
  },
  {
    title: "Physics Lab Report #4",
    course: "Physics Laboratory",
    dueDate: "March 20",
    priority: "medium",
    timeLeft: "3 days",
  },
  {
    title: "Chemistry Molecular Structure",
    course: "Organic Chemistry",
    dueDate: "March 22",
    priority: "medium",
    timeLeft: "5 days",
  },
]

const upcomingTests = [
  {
    title: "Midterm Examination",
    course: "Advanced Mathematics",
    date: "March 25, 2024",
    time: "9:00 AM - 11:00 AM",
    type: "Midterm",
    chapters: ["Ch 1-5"],
  },
  {
    title: "Unit Test - Thermodynamics",
    course: "Physics Laboratory",
    date: "March 28, 2024",
    time: "2:00 PM - 3:30 PM",
    type: "Unit Test",
    chapters: ["Ch 8-10"],
  },
]

const recentGrades = [
  { course: "Mathematics", assignment: "Quiz #3", grade: "A", score: "92/100", date: "2 days ago" },
  { course: "Physics", assignment: "Lab Report #3", grade: "A-", score: "88/100", date: "1 week ago" },
  { course: "Chemistry", assignment: "Midterm", grade: "A+", score: "96/100", date: "1 week ago" },
]

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, John! 👋</h1>
        <p className="text-muted-foreground">Here's what's happening with your studies today.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid auto-rows-min gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">This semester</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Due this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Tests</CardTitle>
            <TestTube className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Next 2 weeks</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Class Rank</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">#3</div>
            <p className="text-xs text-muted-foreground">Out of 45 students</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Top Scorers */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-600" />
              Class Leaderboard
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {topScorers.map((student, index) => (
              <div
                key={index}
                className={`flex items-center space-x-3 p-2 rounded-lg ${
                  student.isCurrentUser ? "bg-blue-50 border border-blue-200" : ""
                }`}
              >
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-muted text-xs font-bold">
                  {student.rank}
                </div>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                  <AvatarFallback>
                    {student.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium">{student.name}</p>
                  <p className="text-xs text-muted-foreground">{student.score}% avg</p>
                </div>
                {student.isCurrentUser && (
                  <Badge variant="secondary" className="text-xs">
                    You
                  </Badge>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Pending Assignments */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-600" />
              Pending Assignments
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingAssignments.map((assignment, index) => (
              <div key={index} className="p-3 rounded-lg border space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm">{assignment.title}</h4>
                  <Badge variant={assignment.priority === "high" ? "destructive" : "secondary"} className="text-xs">
                    {assignment.priority}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{assignment.course}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Due: {assignment.dueDate}</span>
                  <span className="font-medium text-orange-600">{assignment.timeLeft} left</span>
                </div>
                <Button size="sm" className="w-full">
                  Start Assignment
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Tests */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TestTube className="h-5 w-5 text-purple-600" />
              Upcoming Tests
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingTests.map((test, index) => (
              <div key={index} className="p-3 rounded-lg border space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm">{test.title}</h4>
                  <Badge variant="outline" className="text-xs">
                    {test.type}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{test.course}</p>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{test.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{test.time}</span>
                  </div>
                  <div className="text-muted-foreground">Chapters: {test.chapters.join(", ")}</div>
                </div>
                <Button size="sm" variant="outline" className="w-full">
                  Study Materials
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Recent Grades
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentGrades.map((grade, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="space-y-1">
                  <p className="font-medium text-sm">{grade.assignment}</p>
                  <p className="text-xs text-muted-foreground">{grade.course}</p>
                  <p className="text-xs text-muted-foreground">{grade.date}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">{grade.grade}</div>
                  <div className="text-xs text-muted-foreground">{grade.score}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Study Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Semester Progress</span>
                <span>75%</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Assignment Completion</span>
                <span>85%</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Attendance Rate</span>
                <span>92%</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 text-sm">
              <div>
                <span className="text-muted-foreground">Current GPA:</span>
                <span className="ml-2 font-bold">3.8</span>
              </div>
              <div>
                <span className="text-muted-foreground">Credits:</span>
                <span className="ml-2 font-bold">18/120</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
