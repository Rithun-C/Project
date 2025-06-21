import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Plus, MessageCircle, Users } from "lucide-react"

const conversations = [
  {
    id: 1,
    name: "Dr. Emily Johnson",
    role: "Mathematics Professor",
    lastMessage: "Your assignment submission looks great! Just a few minor corrections needed.",
    timestamp: "2 hours ago",
    unread: 2,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Study Group - Physics",
    role: "Group Chat",
    lastMessage: "Sarah: Are we still meeting tomorrow at 3 PM?",
    timestamp: "4 hours ago",
    unread: 0,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Prof. Michael Chen",
    role: "Physics Professor",
    lastMessage: "Lab report deadline extended to Friday. Please check the updated requirements.",
    timestamp: "1 day ago",
    unread: 1,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Academic Advisor",
    role: "Student Services",
    lastMessage: "Let's schedule a meeting to discuss your course selection for next semester.",
    timestamp: "2 days ago",
    unread: 0,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    name: "Chemistry Lab Partners",
    role: "Group Chat",
    lastMessage: "Mike: I've uploaded the data from today's experiment to our shared folder.",
    timestamp: "3 days ago",
    unread: 0,
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

const announcements = [
  {
    title: "Library Hours Extended",
    content: "The library will be open 24/7 during finals week starting March 20th.",
    timestamp: "1 hour ago",
    priority: "medium",
  },
  {
    title: "Campus WiFi Maintenance",
    content: "Network maintenance scheduled for this weekend. Expect brief interruptions.",
    timestamp: "6 hours ago",
    priority: "high",
  },
  {
    title: "Spring Break Reminder",
    content: "Classes resume on April 1st. Have a great break!",
    timestamp: "2 days ago",
    priority: "low",
  },
]

export function MessagesPage() {
  const getPriorityColor = (priority) => {
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
          <p className="text-muted-foreground">Communicate with professors and classmates</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Message
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input placeholder="Search messages..." className="pl-10" />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Conversations
              </CardTitle>
              <CardDescription>Your recent messages and conversations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className="flex items-center space-x-4 p-4 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors"
                >
                  <Avatar>
                    <AvatarImage src={conversation.avatar || "/placeholder.svg"} alt={conversation.name} />
                    <AvatarFallback>
                      {conversation.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{conversation.name}</p>
                      <div className="flex items-center gap-2">
                        {conversation.unread > 0 && (
                          <Badge variant="destructive" className="text-xs">
                            {conversation.unread}
                          </Badge>
                        )}
                        <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{conversation.role}</p>
                    <p className="text-sm text-muted-foreground line-clamp-2">{conversation.lastMessage}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <MessageCircle className="h-4 w-4 mr-2" />
                Message Professor
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Users className="h-4 w-4 mr-2" />
                Join Study Group
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Create Group Chat
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Campus Announcements</CardTitle>
              <CardDescription>Important updates and notices</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {announcements.map((announcement, index) => (
                <div key={index} className="p-3 rounded-lg border space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm">{announcement.title}</h4>
                    <Badge className={getPriorityColor(announcement.priority)} variant="secondary">
                      {announcement.priority}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{announcement.content}</p>
                  <p className="text-xs text-muted-foreground">{announcement.timestamp}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
