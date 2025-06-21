"use client"

import { Badge } from "@/components/ui/badge"

import { Button } from "@/components/ui/button"
import { FilterCard } from "@/components/filters/filter-card"
import { SearchInput } from "@/components/filters/search-input"
import { FilterSelect } from "@/components/filters/filter-select"

export function MappingFilters({
  searchQuery,
  setSearchQuery,
  selectedDepartment,
  setSelectedDepartment,
  departments,
}) {
  const departmentOptions = [
    { value: "all", label: "All Departments" },
    ...departments.map((dept) => ({ value: dept.id, label: dept.name })),
  ]

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedDepartment("all")
  }

  const activeFilters = [
    ...(searchQuery ? [{ label: "Search", value: `"${searchQuery}"` }] : []),
    ...(selectedDepartment !== "all"
      ? [{ label: "Dept", value: departments.find((d) => d.id === selectedDepartment)?.name || "" }]
      : []),
  ]

  return (
    <FilterCard title="Mapping Filters & Search">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <SearchInput
          id="search-mapping"
          label="Search"
          placeholder="Search teachers, subjects..."
          value={searchQuery}
          onChange={setSearchQuery}
        />
        <FilterSelect
          id="filter-dept-mapping"
          label="Department"
          placeholder="All Departments"
          value={selectedDepartment}
          onChange={setSelectedDepartment}
          options={departmentOptions}
        />
        <div className="flex items-end">
          <Button variant="outline" onClick={clearFilters} className="w-full">
            Clear Filters
          </Button>
        </div>
      </div>
      <div className="mt-4 flex items-center space-x-4 text-sm text-gray-600">
        <span>Filtered results based on current selection</span>
        {activeFilters.map((filter, index) => (
          <Badge key={index} variant="outline">
            {filter.label}: {filter.value}
          </Badge>
        ))}
      </div>
    </FilterCard>
  )
}
