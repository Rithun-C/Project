import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function DepartmentOverview({ departments }) {
  return (
    <Card className="border-teal-200">
      <CardHeader>
        <CardTitle>Department Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {departments.map((dept) => (
            <div key={dept.id} className="p-4 border rounded-lg bg-gray-50">
              <h3 className="font-semibold text-teal-800">{dept.name}</h3>
              <div className="mt-2 space-y-1 text-sm text-gray-600">
                <p>Teachers: {dept.teachers}</p>
                <p>Subjects: {dept.subjects}</p>
                <p>Head: {dept.head}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
