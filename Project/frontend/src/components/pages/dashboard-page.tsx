import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, FileText, GraduationCap, Clock } from "lucide-react"
import { CourseCard } from "../course-card"
import { AssignmentCard } from "../assignment-card"
import { UpcomingSchedule } from "../upcoming-schedule"
import { RecentAnnouncements } from "../recent-announcements"

const courses = [
  {
    title: "Advanced Mathematics",
    instructor: "Dr. Emily Johnson",
    progress: 75,
    nextClass: "Tomorrow 9:00 AM",
    students: 28,
    color: "blue",
  },
  {
    title: "Physics Laboratory",
    instructor: "Prof. Michael Chen",
    progress: 60,
    nextClass: "Today 2:00 PM",
    students: 24,
    color: "green",
  },
]

const recentAssignments = [
  {
    title: "Calculus Problem Set #5",
    course: "Advanced Mathematics",
    dueDate: "March 15, 2024",
    status: "pending" as const,
    priority: "high" as const,
  },
  {
    title: "Lab Report: Wave Interference",
    course: "Physics Laboratory",
    dueDate: "March 18, 2024",
    status: "submitted" as const,
    priority: "medium" as const,
  },
]

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your academic overview.</p>
      </div>

      <div className="grid auto-rows-min gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">Active this semester</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Assignments</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Due this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Grade</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">A-</div>
            <p className="text-xs text-muted-foreground">89.5% overall</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Class</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2:00 PM</div>
            <p className="text-xs text-muted-foreground">Physics Lab</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Recent Courses</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {courses.map((course, index) => (
                <CourseCard key={index} {...course} />
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Upcoming Assignments</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {recentAssignments.map((assignment, index) => (
                <AssignmentCard key={index} {...assignment} />
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <UpcomingSchedule />
          <RecentAnnouncements />
        </div>
      </div>
    </div>
  )
}
