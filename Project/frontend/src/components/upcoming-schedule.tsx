import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin } from "lucide-react"

const scheduleData = [
  {
    time: "9:00 AM",
    course: "Mathematics",
    type: "Lecture",
    location: "Room 101",
    duration: "1h 30m",
  },
  {
    time: "11:00 AM",
    course: "Physics",
    type: "Lab",
    location: "Lab 205",
    duration: "2h",
  },
  {
    time: "2:00 PM",
    course: "Chemistry",
    type: "Lecture",
    location: "Room 303",
    duration: "1h 30m",
  },
  {
    time: "4:00 PM",
    course: "English Literature",
    type: "Discussion",
    location: "Room 150",
    duration: "1h",
  },
]

export function UpcomingSchedule() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Schedule</CardTitle>
        <CardDescription>Your classes for today</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {scheduleData.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">{item.course}</span>
                <Badge variant="outline" className="text-xs">
                  {item.type}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{item.time}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{item.location}</span>
                </div>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">{item.duration}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
