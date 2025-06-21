import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Plus } from "lucide-react"

const weeklySchedule = [
  {
    day: "Monday",
    classes: [
      {
        time: "9:00 AM - 10:30 AM",
        course: "Advanced Mathematics",
        type: "Lecture",
        location: "Room 101",
        instructor: "Dr. Emily Johnson",
      },
      {
        time: "2:00 PM - 3:30 PM",
        course: "English Literature",
        type: "Discussion",
        location: "Room 150",
        instructor: "Prof. David Brown",
      },
    ],
  },
  {
    day: "Tuesday",
    classes: [
      {
        time: "10:00 AM - 11:30 AM",
        course: "Organic Chemistry",
        type: "Lecture",
        location: "Room 303",
        instructor: "Dr. Sarah Williams",
      },
      {
        time: "1:00 PM - 4:00 PM",
        course: "Physics Laboratory",
        type: "Lab",
        location: "Lab 205",
        instructor: "Prof. Michael Chen",
      },
    ],
  },
  {
    day: "Wednesday",
    classes: [
      {
        time: "9:00 AM - 10:30 AM",
        course: "Advanced Mathematics",
        type: "Lecture",
        location: "Room 101",
        instructor: "Dr. Emily Johnson",
      },
      {
        time: "2:00 PM - 3:30 PM",
        course: "Computer Science",
        type: "Lab",
        location: "Computer Lab A",
        instructor: "Dr. Alex Turner",
      },
    ],
  },
  {
    day: "Thursday",
    classes: [
      {
        time: "10:00 AM - 11:30 AM",
        course: "Organic Chemistry",
        type: "Lecture",
        location: "Room 303",
        instructor: "Dr. Sarah Williams",
      },
      {
        time: "11:00 AM - 12:30 PM",
        course: "History",
        type: "Lecture",
        location: "Room 201",
        instructor: "Prof. Maria Garcia",
      },
    ],
  },
  {
    day: "Friday",
    classes: [
      {
        time: "9:00 AM - 10:30 AM",
        course: "Advanced Mathematics",
        type: "Tutorial",
        location: "Room 101",
        instructor: "Dr. Emily Johnson",
      },
      {
        time: "2:00 PM - 3:30 PM",
        course: "English Literature",
        type: "Seminar",
        location: "Room 150",
        instructor: "Prof. David Brown",
      },
    ],
  },
]

const upcomingEvents = [
  {
    title: "Midterm Exam - Mathematics",
    date: "March 20, 2024",
    time: "9:00 AM - 11:00 AM",
    location: "Exam Hall A",
    type: "exam",
  },
  {
    title: "Chemistry Lab Quiz",
    date: "March 18, 2024",
    time: "2:00 PM - 2:30 PM",
    location: "Lab 205",
    type: "quiz",
  },
  {
    title: "Literature Essay Due",
    date: "March 22, 2024",
    time: "11:59 PM",
    location: "Online Submission",
    type: "assignment",
  },
]

export function SchedulePage() {
  const getTypeColor = (type) => {
    switch (type) {
      case "Lecture":
        return "bg-blue-100 text-blue-800"
      case "Lab":
        return "bg-green-100 text-green-800"
      case "Discussion":
        return "bg-purple-100 text-purple-800"
      case "Tutorial":
        return "bg-orange-100 text-orange-800"
      case "Seminar":
        return "bg-pink-100 text-pink-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getEventTypeColor = (type) => {
    switch (type) {
      case "exam":
        return "bg-red-100 text-red-800"
      case "quiz":
        return "bg-yellow-100 text-yellow-800"
      case "assignment":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Schedule</h1>
          <p className="text-muted-foreground">Your weekly class schedule and upcoming events</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Event
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Weekly Schedule
              </CardTitle>
              <CardDescription>Your regular class schedule</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {weeklySchedule.map((day, dayIndex) => (
                <div key={dayIndex} className="space-y-3">
                  <h3 className="font-semibold text-lg">{day.day}</h3>
                  {day.classes.length > 0 ? (
                    <div className="space-y-3">
                      {day.classes.map((classItem, classIndex) => (
                        <div key={classIndex} className="p-4 rounded-lg border space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{classItem.course}</h4>
                            <Badge className={getTypeColor(classItem.type)} variant="secondary">
                              {classItem.type}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{classItem.time}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              <span>{classItem.location}</span>
                            </div>
                            <div>
                              <span>{classItem.instructor}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm">No classes scheduled</p>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Important dates and deadlines</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="p-3 rounded-lg border space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm">{event.title}</h4>
                    <Badge className={getEventTypeColor(event.type)} variant="secondary">
                      {event.type}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Today's Classes</CardTitle>
              <CardDescription>March 15, 2024</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Advanced Mathematics</span>
                  <Badge className="bg-blue-100 text-blue-800" variant="secondary">
                    Next
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  <div>9:00 AM - 10:30 AM</div>
                  <div>Room 101</div>
                </div>
              </div>
              <div className="p-3 rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Physics Laboratory</span>
                  <Badge className="bg-green-100 text-green-800" variant="secondary">
                    Later
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  <div>2:00 PM - 4:00 PM</div>
                  <div>Lab 205</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
