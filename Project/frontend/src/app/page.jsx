"use client"

import { useState } from "react"
import Navigation from "../components/studentPages/Navigation"
import Dashboard from "../components/studentPages/Dashboard"
import Assignments from "../components/studentPages/Assignments"
import Quizzes from "../components/studentPages/Quizzes"
import Tests from "../components/Tests"
import Grades from "../components/studentPages/Grades"
import Notifications from "../components/Notifications"
import Notes from "../components/Notes"
import Profile from "../components/studentPages/Profile"

export default function Home() {
  const [currentPage, setCurrentPage] = useState("dashboard")

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />
      case "assignments":
        return <Assignments />
      case "quizzes":
        return <Quizzes />
      case "tests":
        return <Tests />
      case "grades":
        return <Grades />
      case "notifications":
        return <Notifications />
      case "notes":
        return <Notes />
      case "profile":
        return <Profile />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-64 flex-shrink-0">
        <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      </div>
      <div className="flex-1 overflow-auto">{renderCurrentPage()}</div>
    </div>
  )
}
