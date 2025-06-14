import { AssignmentCard } from "../assignment-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter } from "lucide-react"

const allAssignments = [
  {
    title: "Calculus Problem Set #5",
    course: "Advanced Mathematics",
    dueDate: "March 15, 2024",
    status: "pending" as const,
    priority: "high" as const,
  },
  {
    title: "Lab Report: Wave Interference",
    course: "Physics Laboratory",
    dueDate: "March 18, 2024",
    status: "submitted" as const,
    priority: "medium" as const,
  },
  {
    title: "Organic Synthesis Essay",
    course: "Organic Chemistry",
    dueDate: "March 20, 2024",
    status: "pending" as const,
    priority: "medium" as const,
  },
  {
    title: "Shakespeare Analysis",
    course: "English Literature",
    dueDate: "March 12, 2024",
    status: "graded" as const,
    priority: "low" as const,
  },
  {
    title: "Programming Project #3",
    course: "Computer Science",
    dueDate: "March 25, 2024",
    status: "pending" as const,
    priority: "high" as const,
  },
  {
    title: "Historical Research Paper",
    course: "History",
    dueDate: "March 10, 2024",
    status: "graded" as const,
    priority: "medium" as const,
  },
]

export function AssignmentsPage() {
  const pendingAssignments = allAssignments.filter((a) => a.status === "pending")
  const submittedAssignments = allAssignments.filter((a) => a.status === "submitted")
  const gradedAssignments = allAssignments.filter((a) => a.status === "graded")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Assignments</h1>
          <p className="text-muted-foreground">Track your assignments and submissions</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input placeholder="Search assignments..." className="pl-10" />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">Pending ({pendingAssignments.length})</TabsTrigger>
          <TabsTrigger value="submitted">Submitted ({submittedAssignments.length})</TabsTrigger>
          <TabsTrigger value="graded">Graded ({gradedAssignments.length})</TabsTrigger>
          <TabsTrigger value="all">All ({allAssignments.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pendingAssignments.map((assignment, index) => (
              <AssignmentCard key={index} {...assignment} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="submitted" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {submittedAssignments.map((assignment, index) => (
              <AssignmentCard key={index} {...assignment} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="graded" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {gradedAssignments.map((assignment, index) => (
              <AssignmentCard key={index} {...assignment} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {allAssignments.map((assignment, index) => (
              <AssignmentCard key={index} {...assignment} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
