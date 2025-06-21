import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Bell, CheckCircle, AlertCircle, Info, Calendar } from "lucide-react"

const notifications = [
  {
    id: 1,
    type: "assignment",
    title: "Assignment Due Tomorrow",
    message: "Calculus Problem Set #5 is due tomorrow at 11:59 PM",
    timestamp: "2 hours ago",
    read: false,
    priority: "high",
  },
  {
    id: 2,
    type: "grade",
    title: "New Grade Posted",
    message: "Your Physics Lab Report #2 has been graded: 85/100",
    timestamp: "4 hours ago",
    read: false,
    priority: "medium",
  },
  {
    id: 3,
    type: "announcement",
    title: "Class Cancelled",
    message: "Tomorrow's Chemistry lecture has been cancelled due to instructor illness",
    timestamp: "6 hours ago",
    read: true,
    priority: "high",
  },
  {
    id: 4,
    type: "reminder",
    title: "Study Group Meeting",
    message: "Physics study group meeting in 30 minutes at Library Room 204",
    timestamp: "1 day ago",
    read: true,
    priority: "medium",
  },
  {
    id: 5,
    type: "system",
    title: "Course Registration Opens",
    message: "Registration for Fall 2024 semester opens next Monday",
    timestamp: "2 days ago",
    read: true,
    priority: "low",
  },
]

const notificationSettings = [
  {
    category: "Assignments",
    description: "Due dates and submission reminders",
    enabled: true,
  },
  {
    category: "Grades",
    description: "New grades and feedback notifications",
    enabled: true,
  },
  {
    category: "Announcements",
    description: "Course and campus announcements",
    enabled: true,
  },
  {
    category: "Schedule Changes",
    description: "Class cancellations and time changes",
    enabled: true,
  },
  {
    category: "Messages",
    description: "New messages from professors and classmates",
    enabled: false,
  },
  {
    category: "System Updates",
    description: "Platform updates and maintenance notices",
    enabled: false,
  },
]

export function NotificationsPage() {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "assignment":
        return <AlertCircle className="h-4 w-4 text-orange-600" />
      case "grade":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "announcement":
        return <Info className="h-4 w-4 text-blue-600" />
      case "reminder":
        return <Calendar className="h-4 w-4 text-purple-600" />
      case "system":
        return <Bell className="h-4 w-4 text-gray-600" />
      default:
        return <Bell className="h-4 w-4 text-gray-600" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-orange-100 text-orange-800"
      case "low":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">
            Stay updated with your academic activities
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount} unread
              </Badge>
            )}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Mark All Read
          </Button>
          <Button size="sm">
            <Bell className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Notifications</CardTitle>
              <CardDescription>Your latest updates and alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg border transition-colors ${
                    !notification.read ? "bg-blue-50 border-blue-200" : "hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="mt-1">{getNotificationIcon(notification.type)}</div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{notification.title}</h4>
                        <div className="flex items-center gap-2">
                          <Badge className={getPriorityColor(notification.priority)} variant="secondary">
                            {notification.priority}
                          </Badge>
                          {!notification.read && <div className="w-2 h-2 bg-blue-600 rounded-full" />}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{notification.message}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{notification.timestamp}</span>
                        <div className="flex gap-2">
                          {!notification.read && (
                            <Button size="sm" variant="ghost">
                              Mark as Read
                            </Button>
                          )}
                          <Button size="sm" variant="ghost">
                            Dismiss
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Customize your notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {notificationSettings.map((setting, index) => (
                <div key={index} className="flex items-center justify-between space-x-2">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{setting.category}</p>
                    <p className="text-xs text-muted-foreground">{setting.description}</p>
                  </div>
                  <Switch defaultChecked={setting.enabled} />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total Notifications</span>
                <span className="font-medium">{notifications.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Unread</span>
                <span className="font-medium">{unreadCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">High Priority</span>
                <span className="font-medium">{notifications.filter((n) => n.priority === "high").length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">This Week</span>
                <span className="font-medium">
                  {notifications.filter((n) => n.timestamp.includes("hour") || n.timestamp.includes("day")).length}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
