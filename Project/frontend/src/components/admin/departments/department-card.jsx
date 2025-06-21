import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit } from "lucide-react"

export function DepartmentCard({ department }) {
  return (
    <Card className="border-teal-200">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{department.name}</span>
          <Button size="sm" variant="outline">
            <Edit className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Teachers:</span>
            <Badge variant="secondary">{department.teachers}</Badge>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Subjects:</span>
            <Badge variant="secondary">{department.subjects}</Badge>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Head:</span>
            <Badge variant="outline" className="text-xs">
              {department.head}
            </Badge>
          </div>
          <Button className="w-full mt-4" variant="outline">
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
