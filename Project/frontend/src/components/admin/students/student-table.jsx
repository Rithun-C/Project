import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, Edit, Trash2 } from "lucide-react"


export function StudentTable({ students }) {
  return (
    <Card className="border-teal-200">
      <CardHeader>
        <CardTitle>All Students</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Roll No</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Semester</TableHead>
              <TableHead>Section</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>GPA</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="font-medium">{student.name}</TableCell>
                <TableCell>{student.rollNo}</TableCell>
                <TableCell>
                  <Badge variant="outline">{student.year}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{student.semester}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{student.section}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{student.department}</Badge>
                </TableCell>
                <TableCell>
                  <Badge className={student.gpa >= 8 ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                    {student.gpa}
                  </Badge>
                </TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>
                  <Badge
                    className={student.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                  >
                    {student.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
