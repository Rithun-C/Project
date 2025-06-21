import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"


export function StatsCard({ title, value, description }) {
  return (
    <Card className="border-teal-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-teal-800">{value}</div>
        <p className="text-xs text-gray-500">{description}</p>
      </CardContent>
    </Card>
  )
}
