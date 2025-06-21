"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search } from "lucide-react"

export function SearchInput({ id, label, placeholder, value, onChange }) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          id={id}
          placeholder={placeholder}
          className="pl-10"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  )
}
