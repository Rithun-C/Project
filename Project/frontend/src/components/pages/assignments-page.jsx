"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Search, FileText, Upload, Calendar, Clock, AlertCircle, ArrowLeft } from "lucide-react"

const assignments = [
  {
    id: 1,
    title: "Calculus Integration Problems",
    course: "Advanced Mathematics",
    courseCode: "MATH 301",
    dueDate: "March 18, 2024",
    dueTime: "11:59 PM",
    status: "pending",
    priority: "high",
    points: 100,
    description:
      "Solve integration problems using various techniques including substitution, integration by parts, and partial fractions.",
    instructions:
      "Complete all 15 problems in the attached worksheet. Show all work and provide step-by-step solutions.",
    timeLeft: "2 days",
    submissionType: "file",
    allowedFormats: [".pdf", ".doc", ".docx"],
    attempts: 1,
    maxAttempts: 3,
  },
  {
    id: 2,
    title: "Physics Lab Report #4",
    course: "Physics Laboratory",
    courseCode: "PHYS 201",
    dueDate: "March 20, 2024",
    dueTime: "5:00 PM",
    status: "submitted",
    priority: "medium",
    points: 75,
    description: "Write a comprehensive lab report on the thermodynamics experiment conducted in class.",
    submittedDate: "March 18, 2024",
    grade: "A-",
    score: "68/75",
    feedback: "Excellent analysis and methodology. Minor improvements needed in conclusion section.",
    timeLeft: "4 days",
    submissionType: "file",
  },
  {
    id: 3,
    title: "Chemistry Molecular Structure Essay",
    course: "Organic Chemistry",
    courseCode: "CHEM 301",
    dueDate: "March 25, 2024",
    dueTime: "11:59 PM",
    status: "pending",
    priority: "medium",
    points: 150,
    description: "Write a 2000-word essay on molecular structure and its impact on chemical properties.",
    timeLeft: "9 days",
    submissionType: "text",
  },
  {
    id: 4,
    title: "Literature Analysis Paper",
    course: "English Literature",
    courseCode: "ENG 201",
    dueDate: "March 12, 2024",
    dueTime: "11:59 PM",
    status: "graded",
    priority: "low",
    points: 100,
    grade: "A",
    score: "92/100",
    feedback: "Outstanding analysis of themes and character development. Well-structured arguments.",
    submittedDate: "March 10, 2024",
  },
]

export function AssignmentsPage() {
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null)
  const [submissionText, setSubmissionText] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const pendingAssignments = assignments.filter((a) => a.status === "pending")
  const submittedAssignments = assignments.filter((a) => a.status === "submitted")
  const gradedAssignments = assignments.filter((a) => a.status === "graded")

  const filteredAssignments = assignments.filter(
    (assignment) =>
      assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.course.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (selectedAssignment) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => setSelectedAssignment(null)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Assignments
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">{selectedAssignment.title}</CardTitle>
                    <CardDescription>
                      {selectedAssignment.course} • {selectedAssignment.courseCode}
                    </CardDescription>
                  </div>
                  <Badge
                    variant={
                      selectedAssignment.status === "pending"
                        ? "destructive"
                        : selectedAssignment.status === "submitted"
                          ? "default"
                          : "secondary"
                    }
                  >
                    {selectedAssignment.status.charAt(0).toUpperCase() + selectedAssignment.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground">{selectedAssignment.description}</p>
                </div>

                {selectedAssignment.instructions && (
                  <div>
                    <h3 className="font-semibold mb-2">Instructions</h3>
                    <p className="text-muted-foreground">{selectedAssignment.instructions}</p>
                  </div>
                )}

                {selectedAssignment.status === "pending" && (
                  <div className="space-y-4">
                    <h3 className="font-semibold">Submit Assignment</h3>
                    {selectedAssignment.submissionType === "file" ? (
                      <div className="space-y-4">
                        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                          <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                          <p className="text-muted-foreground mb-2">Drag and drop your file here, or click to browse</p>
                          <p className="text-xs text-muted-foreground">
                            Allowed formats: {selectedAssignment.allowedFormats?.join(", ")}
                          </p>
                          <Button className="mt-4">Choose File</Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <Textarea
                          placeholder="Type your submission here..."
                          value={submissionText}
                          onChange={(e) => setSubmissionText(e.target.value)}
                          className="min-h-[200px]"
                        />
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-muted-foreground">{submissionText.length} characters</p>
                          <Button>Submit Assignment</Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {selectedAssignment.status === "graded" && selectedAssignment.feedback && (
                  <div>
                    <h3 className="font-semibold mb-2">Instructor Feedback</h3>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-muted-foreground">{selectedAssignment.feedback}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Assignment Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Points</span>
                  <span className="font-medium">{selectedAssignment.points}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Due Date</span>
                  <span className="font-medium">{selectedAssignment.dueDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Due Time</span>
                  <span className="font-medium">{selectedAssignment.dueTime}</span>
                </div>
                {selectedAssignment.status === "pending" && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time Left</span>
                    <span className="font-medium text-orange-600">{selectedAssignment.timeLeft}</span>
                  </div>
                )}
                {selectedAssignment.attempts && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Attempts</span>
                    <span className="font-medium">
                      {selectedAssignment.attempts}/{selectedAssignment.maxAttempts}
                    </span>
                  </div>
                )}
                {selectedAssignment.grade && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Grade</span>
                      <span className="font-medium text-green-600">{selectedAssignment.grade}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Score</span>
                      <span className="font-medium">{selectedAssignment.score}</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {selectedAssignment.status === "pending" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-orange-600" />
                    Reminder
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    This assignment is due in {selectedAssignment.timeLeft}. Make sure to submit before the deadline to
                    avoid late penalties.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Assignments</h1>
          <p className="text-muted-foreground">Track and submit your assignments</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search assignments..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">Pending ({pendingAssignments.length})</TabsTrigger>
          <TabsTrigger value="submitted">Submitted ({submittedAssignments.length})</TabsTrigger>
          <TabsTrigger value="graded">Graded ({gradedAssignments.length})</TabsTrigger>
          <TabsTrigger value="all">All ({assignments.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pendingAssignments.map((assignment) => (
              <AssignmentCard
                key={assignment.id}
                assignment={assignment}
                onClick={() => setSelectedAssignment(assignment)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="submitted" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {submittedAssignments.map((assignment) => (
              <AssignmentCard
                key={assignment.id}
                assignment={assignment}
                onClick={() => setSelectedAssignment(assignment)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="graded" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {gradedAssignments.map((assignment) => (
              <AssignmentCard
                key={assignment.id}
                assignment={assignment}
                onClick={() => setSelectedAssignment(assignment)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredAssignments.map((assignment) => (
              <AssignmentCard
                key={assignment.id}
                assignment={assignment}
                onClick={() => setSelectedAssignment(assignment)}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function AssignmentCard({ assignment, onClick }) {
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
    <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={onClick}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <Badge className={statusColors[assignment.status]} variant="secondary">
            {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
          </Badge>
          <Badge className={priorityColors[assignment.priority ]} variant="secondary">
            {assignment.priority}
          </Badge>
        </div>
        <CardTitle className="text-lg">{assignment.title}</CardTitle>
        <CardDescription>{assignment.course}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>Due: {assignment.dueDate}</span>
        </div>
        {assignment.status === "pending" && (
          <div className="flex items-center gap-2 text-sm text-orange-600">
            <Clock className="w-4 h-4" />
            <span>{assignment.timeLeft} left</span>
          </div>
        )}
        {assignment.grade && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Grade:</span>
            <span className="font-medium text-green-600">{assignment.grade}</span>
          </div>
        )}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Points:</span>
          <span className="font-medium">{assignment.points}</span>
        </div>
        <Button size="sm" className="w-full">
          <FileText className="w-4 h-4 mr-2" />
          {assignment.status === "pending" ? "Start Assignment" : "View Details"}
        </Button>
      </CardContent>
    </Card>
  )
}
