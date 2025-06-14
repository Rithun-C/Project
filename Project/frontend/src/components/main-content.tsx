import { useNavigation } from "../../../test/hooks/use-navigation"
import { DashboardPage } from "../../../test/components/pages/dashboard-page"
import { CoursesPage } from "../../../test/components/pages/courses-page"
import { AssignmentsPage } from "../../../test/components/pages/assignments-page"
import { GradesPage } from "../../../test/components/pages/grades-page"
import { SchedulePage } from "../../../test/components/pages/schedule-page"
import { MessagesPage } from "../../../test/components/pages/messages-page"
import { NotificationsPage } from "../../../test/components/pages/notifications-page"
import { ProfilePage } from "../../../test/components/pages/profile-page"
import { SettingsPage } from "../../../test/components/pages/settings-page"

export function MainContent() {
  const { activePage } = useNavigation()

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
      case "schedule":
        return <SchedulePage />
      case "messages":
        return <MessagesPage />
      case "notifications":
        return <NotificationsPage />
      case "profile":
        return <ProfilePage />
      case "settings":
        return <SettingsPage />
      default:
        return <DashboardPage />
    }
  }

  return <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{renderPage()}</div>
}
