"use client"

import { useState } from "react"
import { Search, Grid3X3, Download, MessageSquare, BookOpen, Users, Code, Globe, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function VerticalNavPage() {
  const [activeNav, setActiveNav] = useState("downloads")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { id: "forums", label: "Forums", icon: MessageSquare, emoji: "💬" },
    { id: "documentation", label: "Docs", icon: BookOpen, emoji: "📚" },
    { id: "downloads", label: "Downloads", icon: Download, emoji: "⬇" },
    { id: "demo", label: "Demo", icon: Users, emoji: "🎯" },
    { id: "tracker", label: "Tracker", icon: Search, emoji: "🔍" },
    { id: "development", label: "Dev", icon: Code, emoji: "💻" },
    { id: "translation", label: "i18n", icon: Globe, emoji: "🌍" },
  ]

  const handleNavClick = (navId) => {
    setActiveNav(navId)
    setIsMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden bg-teal-600 text-white hover:bg-teal-700"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Vertical Navigation Sidebar */}
      <nav
        className={`
        fixed md:static inset-y-0 left-0 z-40 w-20 bg-gradient-to-b from-teal-600 to-teal-800 
        transform ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 transition-transform duration-300 ease-in-out
        flex flex-col items-center py-6 shadow-lg
      `}
      >
        {/* Logo */}
        <div className="mb-8">
          <div className="w-12 h-12 bg-teal-400 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">M</span>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex flex-col space-y-3 flex-1">
          {navItems.map((item) => {
            const IconComponent = item.icon
            return (
              <Button
                key={item.id}
                variant="ghost"
                size="icon"
                className={`
                  w-12 h-12 rounded-xl transition-all duration-200 group relative
                  ${
                    activeNav === item.id
                      ? "bg-teal-400 text-white shadow-lg"
                      : "text-teal-100 hover:bg-teal-500 hover:text-white"
                  }
                `}
                onClick={() => handleNavClick(item.id)}
                title={item.label}
              >
                <IconComponent className="h-5 w-5" />

                {/* Tooltip */}
                <div
                  className="absolute left-16 bg-gray-900 text-white px-2 py-1 rounded text-xs 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-200 
                              pointer-events-none whitespace-nowrap z-50"
                >
                  {item.label}
                </div>
              </Button>
            )
          })}
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col space-y-3 mt-auto">
          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12 rounded-xl text-teal-100 hover:bg-teal-500 hover:text-white transition-all duration-200 group relative"
            title="Search"
          >
            <Search className="h-5 w-5" />
            <div
              className="absolute left-16 bg-gray-900 text-white px-2 py-1 rounded text-xs 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-200 
                          pointer-events-none whitespace-nowrap z-50"
            >
              Search
            </div>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12 rounded-xl text-teal-100 hover:bg-teal-500 hover:text-white transition-all duration-200 group relative"
            title="Menu"
          >
            <Grid3X3 className="h-5 w-5" />
            <div
              className="absolute left-16 bg-gray-900 text-white px-2 py-1 rounded text-xs 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-200 
                          pointer-events-none whitespace-nowrap z-50"
            >
              Menu
            </div>
          </Button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 md:ml-0 min-h-screen">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 ml-0 md:ml-0">
          <div className="flex items-center justify-between">
            <div className="ml-12 md:ml-0">
              <h1 className="text-2xl font-bold text-teal-800">Learning Platform</h1>
              <p className="text-gray-600 text-sm">Welcome to your dashboard</p>
            </div>

            {/* Right side emojis */}
            {/* <div className="flex items-center space-x-4 text-2xl">
              <span className="animate-bounce">🎉</span>
              <span className="animate-pulse">✨</span>
              <span className="animate-bounce delay-100">🚀</span>
              <span className="animate-pulse delay-200">🎯</span>
            </div> */}
          </div>
        </header>

        {/* Content Area */}
        <div className="p-6">
          {/* Active Section Display */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white p-6 rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="text-3xl">{navItems.find((item) => item.id === activeNav)?.emoji}</span>
                <div>
                  <h2 className="text-2xl font-bold capitalize">{activeNav}</h2>
                  <p className="text-teal-100">You're currently viewing the {activeNav} section</p>
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic Content Based on Active Nav */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeNav === "forums" && (
              <>
                <Card className="hover:shadow-lg transition-shadow border-teal-200">
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">💬</span>
                      <CardTitle className="text-teal-800">Community Discussions</CardTitle>
                    </div>
                    <CardDescription>Join conversations with fellow learners</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Connect with educators and students worldwide.</p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow border-teal-200">
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">❓</span>
                      <CardTitle className="text-teal-800">Q&A Section</CardTitle>
                    </div>
                    <CardDescription>Get help from the community</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Ask questions and share knowledge.</p>
                  </CardContent>
                </Card>
              </>
            )}

            {activeNav === "documentation" && (
              <>
                <Card className="hover:shadow-lg transition-shadow border-teal-200">
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">📚</span>
                      <CardTitle className="text-teal-800">User Guides</CardTitle>
                    </div>
                    <CardDescription>Comprehensive documentation</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Step-by-step guides for all features.</p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow border-teal-200">
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">🎓</span>
                      <CardTitle className="text-teal-800">Tutorials</CardTitle>
                    </div>
                    <CardDescription>Learn through examples</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Interactive tutorials and examples.</p>
                  </CardContent>
                </Card>
              </>
            )}

            {activeNav === "downloads" && (
              <>
                <Card className="hover:shadow-lg transition-shadow border-teal-200">
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">⬇</span>
                      <CardTitle className="text-teal-800">Latest Release</CardTitle>
                    </div>
                    <CardDescription>Download the newest version</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="bg-teal-600 hover:bg-teal-700 text-white">Download v4.3</Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow border-teal-200">
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">📦</span>
                      <CardTitle className="text-teal-800">Plugins</CardTitle>
                    </div>
                    <CardDescription>Extend functionality</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50">
                      Browse Plugins
                    </Button>
                  </CardContent>
                </Card>
              </>
            )}

            {activeNav === "demo" && (
              <>
                <Card className="hover:shadow-lg transition-shadow border-teal-200">
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">🎯</span>
                      <CardTitle className="text-teal-800">Live Demo</CardTitle>
                    </div>
                    <CardDescription>Try before you install</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="bg-teal-600 hover:bg-teal-700 text-white">Launch Demo</Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow border-teal-200">
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">🎮</span>
                      <CardTitle className="text-teal-800">Sandbox</CardTitle>
                    </div>
                    <CardDescription>Experiment freely</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50">
                      Open Sandbox
                    </Button>
                  </CardContent>
                </Card>
              </>
            )}

            {/* Default content for other sections */}
            {!["forums", "documentation", "downloads", "demo"].includes(activeNav) && (
              <Card className="hover:shadow-lg transition-shadow border-teal-200 md:col-span-2 lg:col-span-3">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{navItems.find((item) => item.id === activeNav)?.emoji}</span>
                    <CardTitle className="text-teal-800 capitalize">{activeNav} Section</CardTitle>
                  </div>
                  <CardDescription>Content for {activeNav} will be displayed here</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">This section is under development. More features coming soon! 🚧</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Fun Emoji Section */}
          {/* <div className="mt-12 text-center"> */}
            {/* <h3 className="text-lg font-semibold text-teal-800 mb-4">Quick Actions</h3>
            <div className="flex justify-center space-x-6 text-3xl"> */}
              {/* <button className="hover:scale-110 transition-transform" title="Celebrate">
                🎉
              </button>
              <button className="hover:scale-110 transition-transform" title="Ideas">
                💡
              </button>
              <button className="hover:scale-110 transition-transform" title="Rocket">
                🚀
              </button>
              <button className="hover:scale-110 transition-transform" title="Target">
                🎯
              </button>
              <button className="hover:scale-110 transition-transform" title="Star">
                ⭐
              </button>
              <button className="hover:scale-110 transition-transform" title="Heart">
                ❤
              </button>
              <button className="hover:scale-110 transition-transform" title="Fire">
                🔥
              </button>
              <button className="hover:scale-110 transition-transform" title="Thumbs up">
                👍
              </button> */}
            {/* </div>
          </div> */}
        </div>
      </main>
    </div>
  )
}
