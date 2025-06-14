import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

interface GradeCardProps {
  course: string
  currentGrade: string
  percentage: number
  trend: "up" | "down" | "stable"
  lastAssignment: string
  lastScore: string
}

export function GradeCard({ course, currentGrade, percentage, trend, lastAssignment, lastScore }: GradeCardProps) {
  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-600" />
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-600" />
      default:
        return <Minus className="w-4 h-4 text-gray-600" />
    }
  }

  const getGradeColor = (grade: string) => {
    if (grade.startsWith("A")) return "bg-green-100 text-green-800"
    if (grade.startsWith("B")) return "bg-blue-100 text-blue-800"
    if (grade.startsWith("C")) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{course}</CardTitle>
          <div className="flex items-center gap-2">
            {getTrendIcon()}
            <Badge className={getGradeColor(currentGrade)} variant="secondary">
              {currentGrade}
            </Badge>
          </div>
        </div>
        <CardDescription>{percentage}% Overall</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Last Assignment:</span>
            <span className="font-medium">{lastAssignment}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Score:</span>
            <span className="font-medium">{lastScore}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
