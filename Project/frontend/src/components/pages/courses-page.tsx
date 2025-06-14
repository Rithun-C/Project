import { CourseCard } from "../course-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter } from "lucide-react"

const allCourses = [
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
  {
    title: "Organic Chemistry",
    instructor: "Dr. Sarah Williams",
    progress: 85,
    nextClass: "Friday 10:00 AM",
    students: 32,
    color: "purple",
  },
  {
    title: "English Literature",
    instructor: "Prof. David Brown",
    progress: 90,
    nextClass: "Monday 11:00 AM",
    students: 20,
    color: "orange",
  },
  {
    title: "Computer Science",
    instructor: "Dr. Alex Turner",
    progress: 70,
    nextClass: "Wednesday 2:00 PM",
    students: 35,
    color: "red",
  },
  {
    title: "History",
    instructor: "Prof. Maria Garcia",
    progress: 95,
    nextClass: "Thursday 11:00 AM",
    students: 22,
    color: "yellow",
  },
]

export function CoursesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Courses</h1>
          <p className="text-muted-foreground">Manage and track your enrolled courses</p>
        </div>
        <Button>Enroll in Course</Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input placeholder="Search courses..." className="pl-10" />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {allCourses.map((course, index) => (
          <CourseCard key={index} {...course} />
        ))}
      </div>
    </div>
  )
}
