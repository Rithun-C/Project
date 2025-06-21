"use client"

import { BookOpen } from "lucide-react"

export function DraggableSubject({ subject, dragType }) {
  return (
    <div
      draggable
      className="p-4 bg-white border-2 border-gray-200 rounded-lg cursor-move hover:border-teal-300 hover:shadow-md transition-all duration-200 group"
      onDragStart={(e) => {
        e.dataTransfer.setData(dragType, JSON.stringify(subject))
      }}
    >
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
          <BookOpen className="h-5 w-5 text-blue-600" />
        </div>
        <div className="flex-1">
          <p className="font-medium text-gray-900">{subject.name}</p>
          <p className="text-sm text-gray-600">
            {subject.code} • {subject.department}
          </p>
          <p className="text-xs text-gray-500">
            {subject.credits} Credits
            {subject.year && subject.semester && ` • ${subject.year} • ${subject.semester}`}
          </p>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-xs text-gray-500">Drag me →</span>
        </div>
      </div>
    </div>
  )
}
