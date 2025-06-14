import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, FileText } from "lucide-react"

interface AssignmentCardProps {
  title: string
  course: string
  dueDate: string
  status: "pending" | "submitted" | "graded"
  priority: "high" | "medium" | "low"
}

export function AssignmentCard({ title, course, dueDate, status, priority }: AssignmentCardProps) {
  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    submitted: "bg-blue-100 text-blue-800",
    graded: "bg-green-100 text-green-800",
  }

  const priorityColors = {
    high: "bg-red-100 text-red-800",
    medium: "bg-orange-100 text-orange-800",
    low: "bg-gray-100 text-gray-800",
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <Badge className={statusColors[status]} variant="secondary">
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
          <Badge className={priorityColors[priority]} variant="secondary">
            {priority.charAt(0).toUpperCase() + priority.slice(1)}
          </Badge>
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{course}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>Due: {dueDate}</span>
        </div>
        <div className="flex gap-2">
          <Button size="sm" className="flex-1">
            <FileText className="w-4 h-4 mr-2" />
            View Details
          </Button>
          {status === "pending" && (
            <Button size="sm" variant="outline">
              Submit
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
