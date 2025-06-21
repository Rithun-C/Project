export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="ml-12 md:ml-0">
          <h1 className="text-2xl font-bold text-teal-800">Admin Dashboard</h1>
          <p className="text-gray-600 text-sm">Manage your institution</p>
        </div>
        <div className="flex items-center space-x-4 text-2xl">
          <span className="animate-bounce">🎯</span>
          <span className="animate-pulse">⚡</span>
          <span className="animate-bounce delay-100">🚀</span>
        </div>
      </div>
    </header>
  )
}
