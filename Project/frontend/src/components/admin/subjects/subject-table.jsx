import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit, Trash2 } from "lucide-react"

export function SubjectTable({ subjects }) {
  return (
    <Card className="border-teal-200">
      <CardHeader>
        <CardTitle>All Subjects</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Subject Name</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Semester</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Credits</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subjects.map((subject) => (
              <TableRow key={subject.id}>
                <TableCell className="font-medium">{subject.name}</TableCell>
                <TableCell>{subject.code}</TableCell>
                <TableCell>
                  <Badge variant="outline">{subject.year}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{subject.semester}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{subject.department}</Badge>
                </TableCell>
                <TableCell>{subject.credits}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
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
