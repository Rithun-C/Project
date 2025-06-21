"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, BookOpen, Clock, Users, FileText, Video, Download, ArrowLeft } from "lucide-react"
import { useNavigation } from "../../hooks/use-navigation"

const courses = [
  {
    id: 1,
    title: "Advanced Mathematics",
    code: "MATH 301",
    instructor: "Dr. Emily Johnson",
    credits: 4,
    progress: 75,
    nextClass: "Tomorrow 9:00 AM",
    students: 28,
    color: "blue",
    description: "Advanced calculus, differential equations, and mathematical analysis",
    chapters: [
      {
        id: 1,
        title: "Chapter 1: Limits and Continuity",
        progress: 100,
        materials: [
          { type: "pdf", title: "Lecture Notes - Limits", size: "2.3 MB" },
          { type: "video", title: "Introduction to Limits", duration: "45 min" },
          { type: "pdf", title: "Practice Problems", size: "1.8 MB" },
        ],
      },
      {
        id: 2,
        title: "Chapter 2: Derivatives",
        progress: 90,
        materials: [
          { type: "pdf", title: "Derivative Rules", size: "3.1 MB" },
          { type: "video", title: "Chain Rule Explained", duration: "32 min" },
          { type: "pdf", title: "Derivative Applications", size: "2.7 MB" },
        ],
      },
      {
        id: 3,
        title: "Chapter 3: Integration",
        progress: 60,
        materials: [
          { type: "pdf", title: "Integration Techniques", size: "4.2 MB" },
          { type: "video", title: "Integration by Parts", duration: "38 min" },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Physics Laboratory",
    code: "PHYS 201",
    instructor: "Prof. Michael Chen",
    credits: 3,
    progress: 60,
    nextClass: "Today 2:00 PM",
    students: 24,
    color: "green",
    description: "Experimental physics with hands-on laboratory work",
    chapters: [
      {
        id: 1,
        title: "Chapter 1: Mechanics",
        progress: 100,
        materials: [
          { type: "pdf", title: "Lab Manual - Mechanics", size: "5.1 MB" },
          { type: "video", title: "Safety Procedures", duration: "15 min" },
        ],
      },
      {
        id: 2,
        title: "Chapter 2: Thermodynamics",
        progress: 80,
        materials: [
          { type: "pdf", title: "Heat Transfer Lab", size: "3.8 MB" },
          { type: "video", title: "Calorimetry Experiment", duration: "28 min" },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Organic Chemistry",
    code: "CHEM 301",
    instructor: "Dr. Sarah Williams",
    credits: 4,
    progress: 85,
    nextClass: "Friday 10:00 AM",
    students: 32,
    color: "purple",
    description: "Study of carbon compounds and their reactions",
    chapters: [
      {
        id: 1,
        title: "Chapter 1: Structure and Bonding",
        progress: 100,
        materials: [
          { type: "pdf", title: "Molecular Structure", size: "6.2 MB" },
          { type: "video", title: "3D Molecular Models", duration: "42 min" },
        ],
      },
    ],
  },
]

export function CoursesPage() {
  const { selectedCourse, setSelectedCourse, activeSubPage, setActivePage } = useNavigation()
  const [searchTerm, setSearchTerm] = useState("")

  if (selectedCourse) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => setSelectedCourse(undefined)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Courses
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{selectedCourse.title}</h1>
            <p className="text-muted-foreground">
              {selectedCourse.code} • {selectedCourse.instructor}
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">Course Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Credits</p>
                <p className="font-medium">{selectedCourse.credits}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Progress</p>
                <div className="space-y-2">
                  <Progress value={selectedCourse.progress} className="h-2" />
                  <p className="text-sm font-medium">{selectedCourse.progress}%</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Next Class</p>
                <p className="font-medium">{selectedCourse.nextClass}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Students</p>
                <p className="font-medium">{selectedCourse.students}</p>
              </div>
            </CardContent>
          </Card>

          <div className="md:col-span-3">
            <Tabs defaultValue="chapters" className="space-y-4">
              <TabsList>
                <TabsTrigger value="chapters">Chapters & Notes</TabsTrigger>
                <TabsTrigger value="assignments">Assignments</TabsTrigger>
                <TabsTrigger value="grades">Grades</TabsTrigger>
                <TabsTrigger value="discussions">Discussions</TabsTrigger>
              </TabsList>

              <TabsContent value="chapters" className="space-y-4">
                <div className="space-y-4">
                  {selectedCourse.chapters.map((chapter) => (
                    <Card key={chapter.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{chapter.title}</CardTitle>
                          <Badge variant="outline">{chapter.progress}% Complete</Badge>
                        </div>
                        <Progress value={chapter.progress} className="h-2" />
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <h4 className="font-medium">Study Materials</h4>
                          {chapter.materials.map((material, index) => (
                            <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                              <div className="flex items-center gap-3">
                                {material.type === "pdf" ? (
                                  <FileText className="h-5 w-5 text-red-600" />
                                ) : (
                                  <Video className="h-5 w-5 text-blue-600" />
                                )}
                                <div>
                                  <p className="font-medium text-sm">{material.title}</p>
                                  <p className="text-xs text-muted-foreground">{material.size || material.duration}</p>
                                </div>
                              </div>
                              <Button size="sm" variant="outline">
                                <Download className="h-4 w-4 mr-2" />
                                {material.type === "pdf" ? "Download" : "Watch"}
                              </Button>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="assignments">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Assignments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Assignment details for {selectedCourse.title} will be displayed here.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="grades">
                <Card>
                  <CardHeader>
                    <CardTitle>Grade Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Grade information for {selectedCourse.title} will be displayed here.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="discussions">
                <Card>
                  <CardHeader>
                    <CardTitle>Class Discussions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Discussion forum for {selectedCourse.title} will be displayed here.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    )
  }

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Courses</h1>
          <p className="text-muted-foreground">Manage and access your enrolled courses</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search courses..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className={`w-3 h-3 rounded-full bg-${course.color}-500`} />
                <Badge variant="secondary" className="text-xs">
                  {course.credits} Credits
                </Badge>
              </div>
              <CardTitle className="text-lg">{course.title}</CardTitle>
              <CardDescription>
                {course.code} • {course.instructor}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{course.description}</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-2" />
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{course.nextClass}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{course.students}</span>
                </div>
              </div>
              <Button className="w-full" onClick={() => setSelectedCourse(course)}>
                <BookOpen className="w-4 h-4 mr-2" />
                Enter Course
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
