"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { TestTube, Calendar, Clock, AlertCircle, ArrowLeft, Timer } from "lucide-react"

const tests = [
  {
    id: 1,
    title: "Midterm Examination",
    course: "Advanced Mathematics",
    courseCode: "MATH 301",
    date: "March 25, 2024",
    time: "9:00 AM - 11:00 AM",
    duration: 120,
    type: "Midterm",
    status: "upcoming",
    chapters: ["Ch 1-5"],
    totalQuestions: 25,
    totalPoints: 100,
    instructions: "This is a comprehensive midterm covering chapters 1-5. Calculator allowed.",
    timeLeft: "5 days",
  },
  {
    id: 2,
    title: "Unit Test - Thermodynamics",
    course: "Physics Laboratory",
    courseCode: "PHYS 201",
    date: "March 28, 2024",
    time: "2:00 PM - 3:30 PM",
    duration: 90,
    type: "Unit Test",
    status: "upcoming",
    chapters: ["Ch 8-10"],
    totalQuestions: 20,
    totalPoints: 75,
    timeLeft: "8 days",
  },
  {
    id: 3,
    title: "Quiz #4 - Organic Reactions",
    course: "Organic Chemistry",
    courseCode: "CHEM 301",
    date: "March 15, 2024",
    time: "10:00 AM - 10:30 AM",
    duration: 30,
    type: "Quiz",
    status: "completed",
    chapters: ["Ch 6"],
    totalQuestions: 10,
    totalPoints: 25,
    score: "23/25",
    grade: "A",
    completedDate: "March 15, 2024",
  },
]

const sampleQuestions = [
  {
    id: 1,
    question: "What is the derivative of f(x) = x² + 3x - 2?",
    options: ["2x + 3", "x² + 3", "2x - 2", "x + 3"],
    correctAnswer: 0,
    points: 4,
  },
  {
    id: 2,
    question: "Which of the following is the correct formula for integration by parts?",
    options: ["∫u dv = uv - ∫v du", "∫u dv = uv + ∫v du", "∫u dv = u/v - ∫v du", "∫u dv = uv - ∫u dv"],
    correctAnswer: 0,
    points: 4,
  },
]

export function TestsPage() {
  const [selectedTest, setSelectedTest] = useState<any>(null)
  const [isTestActive, setIsTestActive] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [timeRemaining, setTimeRemaining] = useState(7200) // 2 hours in seconds

  const upcomingTests = tests.filter((t) => t.status === "upcoming")
  const completedTests = tests.filter((t) => t.status === "completed")

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  if (isTestActive && selectedTest) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
          <div>
            <h1 className="text-xl font-bold">{selectedTest.title}</h1>
            <p className="text-muted-foreground">{selectedTest.course}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-orange-600">
              <Timer className="h-5 w-5" />
              <span className="font-mono text-lg">{formatTime(timeRemaining)}</span>
            </div>
            <Badge variant="outline">
              Question {currentQuestion + 1} of {sampleQuestions.length}
            </Badge>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Question {currentQuestion + 1}</CardTitle>
                <CardDescription>{sampleQuestions[currentQuestion].points} points</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">{sampleQuestions[currentQuestion].question}</h3>
                  <RadioGroup
                    value={answers[currentQuestion]?.toString()}
                    onValueChange={(value) => setAnswers({ ...answers, [currentQuestion]: Number.parseInt(value) })}
                  >
                    {sampleQuestions[currentQuestion].options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-muted/50">
                        <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                        <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    disabled={currentQuestion === 0}
                    onClick={() => setCurrentQuestion(currentQuestion - 1)}
                  >
                    Previous
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline">Save & Continue Later</Button>
                    {currentQuestion < sampleQuestions.length - 1 ? (
                      <Button onClick={() => setCurrentQuestion(currentQuestion + 1)}>Next Question</Button>
                    ) : (
                      <Button onClick={() => setIsTestActive(false)}>Submit Test</Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Completed</span>
                    <span>
                      {Object.keys(answers).length}/{sampleQuestions.length}
                    </span>
                  </div>
                  <Progress value={(Object.keys(answers).length / sampleQuestions.length) * 100} />
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>Answered: {Object.keys(answers).length}</p>
                  <p>Remaining: {sampleQuestions.length - Object.keys(answers).length}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Question Navigator</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-2">
                  {sampleQuestions.map((_, index) => (
                    <Button
                      key={index}
                      variant={
                        currentQuestion === index ? "default" : answers[index] !== undefined ? "secondary" : "outline"
                      }
                      size="sm"
                      onClick={() => setCurrentQuestion(index)}
                      className="aspect-square"
                    >
                      {index + 1}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (selectedTest && !isTestActive) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => setSelectedTest(null)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Tests
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">{selectedTest.title}</CardTitle>
                    <CardDescription>
                      {selectedTest.course} • {selectedTest.courseCode}
                    </CardDescription>
                  </div>
                  <Badge variant={selectedTest.status === "upcoming" ? "default" : "secondary"}>
                    {selectedTest.status.charAt(0).toUpperCase() + selectedTest.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Test Information</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Date & Time</p>
                      <p className="font-medium">{selectedTest.date}</p>
                      <p className="font-medium">{selectedTest.time}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p className="font-medium">{selectedTest.duration} minutes</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Questions</p>
                      <p className="font-medium">{selectedTest.totalQuestions}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Points</p>
                      <p className="font-medium">{selectedTest.totalPoints}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Chapters Covered</h3>
                  <div className="flex gap-2">
                    {selectedTest.chapters.map((chapter, index) => (
                      <Badge key={index} variant="outline">
                        {chapter}
                      </Badge>
                    ))}
                  </div>
                </div>

                {selectedTest.instructions && (
                  <div>
                    <h3 className="font-semibold mb-2">Instructions</h3>
                    <p className="text-muted-foreground">{selectedTest.instructions}</p>
                  </div>
                )}

                {selectedTest.status === "upcoming" && (
                  <div className="flex gap-4">
                    <Button onClick={() => setIsTestActive(true)} className="flex-1">
                      Start Test
                    </Button>
                    <Button variant="outline">Study Materials</Button>
                  </div>
                )}

                {selectedTest.status === "completed" && (
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-green-800">Test Completed</h4>
                        <p className="text-sm text-green-600">Submitted on {selectedTest.completedDate}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-800">{selectedTest.grade}</div>
                        <div className="text-sm text-green-600">{selectedTest.score}</div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Test Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type</span>
                  <span className="font-medium">{selectedTest.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-medium">{selectedTest.duration} min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Questions</span>
                  <span className="font-medium">{selectedTest.totalQuestions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Points</span>
                  <span className="font-medium">{selectedTest.totalPoints}</span>
                </div>
                {selectedTest.status === "upcoming" && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time Left</span>
                    <span className="font-medium text-orange-600">{selectedTest.timeLeft}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {selectedTest.status === "upcoming" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-orange-600" />
                    Preparation Tips
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm space-y-2">
                    <p>• Review chapters: {selectedTest.chapters.join(", ")}</p>
                    <p>• Practice similar problems</p>
                    <p>• Ensure stable internet connection</p>
                    <p>• Have calculator ready if allowed</p>
                    <p>• Find a quiet environment</p>
                  </div>
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
          <h1 className="text-3xl font-bold tracking-tight">Tests & Exams</h1>
          <p className="text-muted-foreground">View and take your scheduled tests</p>
        </div>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming ({upcomingTests.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedTests.length})</TabsTrigger>
          <TabsTrigger value="all">All Tests ({tests.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {upcomingTests.map((test) => (
              <TestCard key={test.id} test={test} onClick={() => setSelectedTest(test)} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {completedTests.map((test) => (
              <TestCard key={test.id} test={test} onClick={() => setSelectedTest(test)} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tests.map((test) => (
              <TestCard key={test.id} test={test} onClick={() => setSelectedTest(test)} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function TestCard({ test, onClick }) {
  const statusColors = {
    upcoming: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
  }

  const typeColors = {
    Midterm: "bg-red-100 text-red-800",
    "Unit Test": "bg-orange-100 text-orange-800",
    Quiz: "bg-purple-100 text-purple-800",
  }

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={onClick}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <Badge className={statusColors[test.status ]} variant="secondary">
            {test.status.charAt(0).toUpperCase() + test.status.slice(1)}
          </Badge>
          <Badge className={typeColors[test.type ]} variant="secondary">
            {test.type}
          </Badge>
        </div>
        <CardTitle className="text-lg">{test.title}</CardTitle>
        <CardDescription>{test.course}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>{test.date}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>{test.time}</span>
        </div>
        {test.status === "upcoming" && test.timeLeft && (
          <div className="flex items-center gap-2 text-sm text-orange-600">
            <AlertCircle className="w-4 h-4" />
            <span>{test.timeLeft} remaining</span>
          </div>
        )}
        {test.grade && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Grade:</span>
            <span className="font-medium text-green-600">{test.grade}</span>
          </div>
        )}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Points:</span>
          <span className="font-medium">{test.totalPoints}</span>
        </div>
        <Button size="sm" className="w-full">
          <TestTube className="w-4 h-4 mr-2" />
          {test.status === "upcoming" ? "Take Test" : "View Results"}
        </Button>
      </CardContent>
    </Card>
  )
}
