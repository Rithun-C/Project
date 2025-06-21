import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, Calendar } from "lucide-react"

const announcements = [
  {
    title: "Midterm Exam Schedule Released",
    course: "Mathematics",
    date: "2 hours ago",
    priority: "high",
    content: "The midterm examination schedule has been posted. Please check your student portal for details.",
  },
  {
    title: "Assignment Extension",
    course: "Physics",
    date: "1 day ago",
    priority: "medium",
    content: "The deadline for Physics Lab Report #3 has been extended to Friday.",
  },
  {
    title: "Guest Lecture Tomorrow",
    course: "Chemistry",
    date: "2 days ago",
    priority: "low",
    content: "Dr. Sarah Johnson will be giving a guest lecture on Organic Chemistry applications.",
  },
]

export function RecentAnnouncements() {
  const priorityColors = {
    high: "bg-red-100 text-red-800",
    medium: "bg-orange-100 text-orange-800",
    low: "bg-blue-100 text-blue-800",
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Recent Announcements
        </CardTitle>
        <CardDescription>Latest updates from your courses</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {announcements.map((announcement, index) => (
          <div key={index} className="p-4 rounded-lg border space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">{announcement.title}</h4>
              <Badge
                className={priorityColors[announcement.priority as keyof typeof priorityColors]}
                variant="secondary"
              >
                {announcement.priority}
              </Badge>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="font-medium">{announcement.course}</span>
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{announcement.date}</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{announcement.content}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
