import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Edit, Mail, Phone, MapPin, Calendar, Award, BookOpen } from "lucide-react"

const studentInfo = {
  name: "John Smith",
  studentId: "2024001",
  email: "john.smith@university.edu",
  phone: "+1 (555) 123-4567",
  address: "123 Campus Drive, University City, UC 12345",
  dateOfBirth: "January 15, 2002",
  enrollmentDate: "September 2022",
  expectedGraduation: "May 2026",
  major: "Computer Science",
  minor: "Mathematics",
  advisor: "Dr. Sarah Johnson",
  gpa: 3.7,
  totalCredits: 78,
  completedCredits: 60,
}

const achievements = [
  {
    title: "Dean's List",
    description: "Fall 2023 Semester",
    date: "December 2023",
    type: "academic",
  },
  {
    title: "Outstanding Student Award",
    description: "Mathematics Department",
    date: "May 2023",
    type: "award",
  },
  {
    title: "Research Assistant",
    description: "AI Research Lab",
    date: "September 2023",
    type: "experience",
  },
  {
    title: "Volunteer of the Month",
    description: "Campus Community Service",
    date: "March 2023",
    type: "service",
  },
]

const skills = [
  { name: "Python Programming", level: 90 },
  { name: "Data Structures", level: 85 },
  { name: "Web Development", level: 80 },
  { name: "Database Design", level: 75 },
  { name: "Machine Learning", level: 70 },
  { name: "Project Management", level: 65 },
]

export function ProfilePage() {
  const getAchievementIcon = (type: string) => {
    switch (type) {
      case "academic":
        return <BookOpen className="h-4 w-4 text-blue-600" />
      case "award":
        return <Award className="h-4 w-4 text-yellow-600" />
      case "experience":
        return <Calendar className="h-4 w-4 text-green-600" />
      case "service":
        return <Award className="h-4 w-4 text-purple-600" />
      default:
        return <Award className="h-4 w-4 text-gray-600" />
    }
  }

  const getAchievementColor = (type: string) => {
    switch (type) {
      case "academic":
        return "bg-blue-100 text-blue-800"
      case "award":
        return "bg-yellow-100 text-yellow-800"
      case "experience":
        return "bg-green-100 text-green-800"
      case "service":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
          <p className="text-muted-foreground">Manage your personal information and academic profile</p>
        </div>
        <Button>
          <Edit className="h-4 w-4 mr-2" />
          Edit Profile
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Your basic profile details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Profile" />
                  <AvatarFallback className="text-lg">JS</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">{studentInfo.name}</h3>
                  <p className="text-muted-foreground">Student ID: {studentInfo.studentId}</p>
                  <Button size="sm" variant="outline">
                    Change Photo
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <Input id="email" value={studentInfo.email} readOnly />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <Input id="phone" value={studentInfo.phone} />
                  </div>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <Input id="address" value={studentInfo.address} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth</Label>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <Input id="dob" value={studentInfo.dateOfBirth} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="advisor">Academic Advisor</Label>
                  <Input id="advisor" value={studentInfo.advisor} readOnly />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Academic Information</CardTitle>
              <CardDescription>Your degree and academic progress</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Major</Label>
                  <p className="font-medium">{studentInfo.major}</p>
                </div>
                <div className="space-y-2">
                  <Label>Minor</Label>
                  <p className="font-medium">{studentInfo.minor}</p>
                </div>
                <div className="space-y-2">
                  <Label>Enrollment Date</Label>
                  <p className="font-medium">{studentInfo.enrollmentDate}</p>
                </div>
                <div className="space-y-2">
                  <Label>Expected Graduation</Label>
                  <p className="font-medium">{studentInfo.expectedGraduation}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Degree Progress</Label>
                    <span className="text-sm text-muted-foreground">
                      {studentInfo.completedCredits} / {studentInfo.totalCredits} credits
                    </span>
                  </div>
                  <Progress value={(studentInfo.completedCredits / studentInfo.totalCredits) * 100} className="h-2" />
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Current GPA</span>
                  <span className="font-medium">{studentInfo.gpa}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Skills & Competencies</CardTitle>
              <CardDescription>Your technical and academic skills</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {skills.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{skill.name}</span>
                    <span className="text-sm text-muted-foreground">{skill.level}%</span>
                  </div>
                  <Progress value={skill.level} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Current Semester</span>
                <span className="font-medium">Spring 2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Credits This Semester</span>
                <span className="font-medium">18</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Years Completed</span>
                <span className="font-medium">2 of 4</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Class Rank</span>
                <span className="font-medium">Top 15%</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Achievements & Awards</CardTitle>
              <CardDescription>Your academic accomplishments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg border">
                  <div className="mt-1">{getAchievementIcon(achievement.type)}</div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm">{achievement.title}</h4>
                      <Badge className={getAchievementColor(achievement.type)} variant="secondary">
                        {achievement.type}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{achievement.description}</p>
                    <p className="text-xs text-muted-foreground">{achievement.date}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Emergency Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-1">
                <Label className="text-xs">Name</Label>
                <p className="text-sm font-medium">Sarah Smith (Mother)</p>
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Phone</Label>
                <p className="text-sm">+1 (555) 987-6543</p>
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Relationship</Label>
                <p className="text-sm">Parent</p>
              </div>
              <Button size="sm" variant="outline" className="w-full">
                Update Contact
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
