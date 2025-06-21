"use client"

import { Button } from "@/components/ui/button"
import { FilterCard } from "@/components/filters/filter-card"
import { SearchInput } from "@/components/filters/search-input"
import { FilterSelect } from "@/components/filters/filter-select"
import { FilterSummary } from "@/components/filters/filter-summary"

export function StudentFilters({
  searchQuery,
  setSearchQuery,
  selectedYear,
  setSelectedYear,
  selectedDepartment,
  setSelectedDepartment,
  selectedStatus,
  setSelectedStatus,
  departments,
  totalCount,
  filteredCount,
}) {
  const yearOptions = [
    { value: "all", label: "All Years" },
    { value: "1", label: "1st Year" },
    { value: "2", label: "2nd Year" },
    { value: "3", label: "3rd Year" },
    { value: "4", label: "4th Year" },
  ]

  const departmentOptions = [
    { value: "all", label: "All Departments" },
    ...departments.map((dept) => ({ value: dept.id, label: dept.name })),
  ]

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
  ]

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedYear("all")
    setSelectedDepartment("all")
    setSelectedStatus("all")
  }

  const activeFilters = [
    ...(searchQuery ? [{ label: "Search", value: `"${searchQuery}"` }] : []),
    ...(selectedYear !== "all" ? [{ label: "Year", value: selectedYear }] : []),
    ...(selectedDepartment !== "all"
      ? [{ label: "Dept", value: departments.find((d) => d.id === selectedDepartment)?.name || "" }]
      : []),
    ...(selectedStatus !== "all" ? [{ label: "Status", value: selectedStatus }] : []),
  ]

  return (
    <FilterCard>
      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
        <SearchInput
          id="search-students"
          label="Search Students"
          placeholder="Name, roll no, email..."
          value={searchQuery}
          onChange={setSearchQuery}
        />
        <FilterSelect
          id="filter-year"
          label="Year"
          placeholder="All Years"
          value={selectedYear}
          onChange={setSelectedYear}
          options={yearOptions}
        />
        <FilterSelect
          id="filter-dept-students"
          label="Department"
          placeholder="All Departments"
          value={selectedDepartment}
          onChange={setSelectedDepartment}
          options={departmentOptions}
        />
        <FilterSelect
          id="filter-status-students"
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
