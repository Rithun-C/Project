import { useNavigation } from "../hooks/use-navigation"
import { DashboardPage } from "./pages/dashboard-page"
import { CoursesPage } from "./pages/courses-page"
import { AssignmentsPage } from "./pages/assignments-page"
import { GradesPage } from "./pages/grades-page"
import { TestsPage } from "./pages/tests-page"
import { SchedulePage } from "./pages/schedule-page"
import { MessagesPage } from "./pages/messages-page"
import { ChatbotPage } from "./pages/chatbot-page"
import { ProfilePage } from "./pages/profile-page"
import { SettingsPage } from "./pages/settings-page"

export function MainContent() {
  const { activePage } = useNavigation()

  console.log("Current active page:", activePage) // Debug log

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <DashboardPage />
      case "courses":
        return <CoursesPage />
      case "assignments":
        return <AssignmentsPage />
      case "grades":
        return <GradesPage />
      case "tests":
        return <TestsPage />
      case "schedule":
        return <SchedulePage />
      case "messages":
        return <MessagesPage />
      case "chatbot":
        return <ChatbotPage />
      case "profile":
        return <ProfilePage />
      case "settings":
        return <SettingsPage />
      default:
        console.log("Unknown page, defaulting to dashboard:", activePage)
        return <DashboardPage />
    }
  }

  return <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{renderPage()}</div>
}
