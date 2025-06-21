"use client"

import { Badge } from "@/components/ui/badge"

export function DraggableTeacher({ teacher, dragType, colorScheme = "teal" }) {
  const colorClasses = {
    teal: {
      bg: "bg-teal-100",
      text: "text-teal-800",
      border: "hover:border-teal-300",
    },
    purple: {
      bg: "bg-purple-100",
      text: "text-purple-800",
      border: "hover:border-purple-300",
    },
  }

  const colors = colorClasses[colorScheme]

  return (
    <div
      draggable
      className={`p-4 bg-white border-2 border-gray-200 rounded-lg cursor-move ${colors.border} hover:shadow-md transition-all duration-200 group`}
      onDragStart={(e) => {
        e.dataTransfer.setData(dragType, JSON.stringify(teacher))
      }}
    >
      <div className="flex items-center space-x-3">
        <div className={`w-10 h-10 ${colors.bg} rounded-full flex items-center justify-center`}>
          <span className={`${colors.text} font-semibold text-sm`}>
            {teacher.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </span>
        </div>
        <div className="flex-1">
          <p className="font-medium text-gray-900">{teacher.name}</p>
          <p className="text-sm text-gray-600">{teacher.department}</p>
          {teacher.subjects && (
            <div className="flex flex-wrap gap-1 mt-1">
              {teacher.subjects.map((subject, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {subject}
                </Badge>
              ))}
            </div>
          )}
          {teacher.qualification && teacher.experience && (
            <p className="text-xs text-gray-500">
              {teacher.qualification} • {teacher.experience}
            </p>
          )}
          {teacher.quizzes !== undefined && teacher.sections && (
            <div className="flex items-center space-x-2 mt-1">
              <Badge variant="outline" className="text-xs">
                {teacher.quizzes} Quizzes
              </Badge>
              <Badge variant="outline" className="text-xs">
                {teacher.sections.length} Sections
              </Badge>
            </div>
          )}
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-xs text-gray-500">Drag me →</span>
        </div>
      </div>
    </div>
  )
}
