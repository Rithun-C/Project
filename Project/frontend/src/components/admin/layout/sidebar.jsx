"use client"

import { Button } from "@/components/ui/button"
import { Users, GraduationCap, Upload, Settings, BarChart3, BookOpen, Building, Menu, X } from "lucide-react"

export function Sidebar({ activeTab, setActiveTab, isMobileMenuOpen, setIsMobileMenuOpen }) {
  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3, emoji: "📊" },
    { id: "teachers", label: "Teachers", icon: Users, emoji: "👨‍🏫" },
    { id: "students", label: "Students", icon: GraduationCap, emoji: "🎓" },
    { id: "departments", label: "Departments", icon: Building, emoji: "🏢" },
    { id: "subjects", label: "Subjects", icon: BookOpen, emoji: "📚" },
    { id: "mappings", label: "Mappings", icon: Settings, emoji: "🔗" },
    { id: "uploads", label: "Bulk Upload", icon: Upload, emoji: "📤" },
  ]

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden bg-teal-600 text-white hover:bg-teal-700"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Sidebar Navigation */}
      <nav
        className={`
        fixed md:static inset-y-0 left-0 z-40 w-64 bg-gradient-to-b from-teal-600 to-teal-800 
        transform ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 transition-transform duration-300 ease-in-out
        flex flex-col py-6 shadow-lg overflow-y-auto
      `}
      >
        {/* Logo */}
        <div className="px-6 mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-teal-400 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">AdminHub</h2>
              <p className="text-teal-200 text-xs">Admin Dashboard</p>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex flex-col space-y-2 flex-1 px-4">
          {navigationItems.map((item) => {
            const IconComponent = item.icon
            return (
              <Button
                key={item.id}
                variant="ghost"
                className={`w-full justify-start rounded-xl h-12 ${
                  activeTab === item.id
                    ? "bg-teal-400 text-white shadow-lg"
                    : "text-teal-100 hover:bg-teal-500 hover:text-white"
                }`}
                onClick={() => setActiveTab(item.id)}
              >
                <IconComponent className="h-5 w-5 mr-3" />
                <span>{item.label}</span>
                <span className="ml-auto">{item.emoji}</span>
              </Button>
            )
          })}
        </div>
      </nav>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}
