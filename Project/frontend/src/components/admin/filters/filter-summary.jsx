import { Badge } from "@/components/ui/badge"


export function FilterSummary({ totalCount, filteredCount, activeFilters }) {
  return (
    <div className="mt-4 flex items-center space-x-4 text-sm text-gray-600">
      <span>
        Showing {filteredCount} of {totalCount} items
      </span>
      {activeFilters.map((filter, index) => (
        <Badge key={index} variant="outline">
          {filter.label}: {filter.value}
        </Badge>
      ))}
    </div>
  )
}
