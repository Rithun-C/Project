"use client"

import { Button } from "@/components/ui/button"
import { FilterCard } from "@/components/filters/filter-card"
import { SearchInput } from "@/components/filters/search-input"
import { FilterSelect } from "@/components/filters/filter-select"
import { FilterSummary } from "@/components/filters/filter-summary"

export function TeacherFilters({
  searchQuery,
  setSearchQuery,
  selectedDepartment,
  setSelectedDepartment,
  selectedStatus,
  setSelectedStatus,
  departments,
  totalCount,
  filteredCount,
}) {
  const departmentOptions = [
    { value: "all", label: "All Departments" },
    ...departments.map((dept) => ({ value: dept.id, label: dept.name })),
  ]

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "Active", label: "Active" },
    { value: "On Leave", label: "On Leave" },
    { value: "Inactive", label: "Inactive" },
  ]

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedDepartment("all")
    setSelectedStatus("all")
  }

  const activeFilters = [
    ...(searchQuery ? [{ label: "Search", value: `"${searchQuery}"` }] : []),
    ...(selectedDepartment !== "all"
      ? [{ label: "Dept", value: departments.find((d) => d.id === selectedDepartment)?.name || "" }]
      : []),
    ...(selectedStatus !== "all" ? [{ label: "Status", value: selectedStatus }] : []),
  ]

  return (
    <FilterCard>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SearchInput
          id="search-teachers"
          label="Search Teachers"
          placeholder="Name, email, department..."
          value={searchQuery}
          onChange={setSearchQuery}
        />
        <FilterSelect
          id="filter-dept"
          label="Department"
          placeholder="All Departments"
          value={selectedDepartment}
          onChange={setSelectedDepartment}
          options={departmentOptions}
        />
        <FilterSelect
          id="filter-status"
          label="Status"
          placeholder="All Status"
          value={selectedStatus}
          onChange={setSelectedStatus}
          options={statusOptions}
        />
        <div className="flex items-end">
          <Button variant="outline" onClick={clearFilters} className="w-full">
            Clear Filters
          </Button>
        </div>
      </div>
      <FilterSummary totalCount={totalCount} filteredCount={filteredCount} activeFilters={activeFilters} />
    </FilterCard>
  )
}
