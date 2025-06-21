"use client"

import type * as React from "react"
import {
  BookOpen,
  Calendar,
  FileText,
  GraduationCap,
  Home,
  MessageSquare,
  Settings,
  User,
  TestTube,
  MessageCircle,
} from "lucide-react"
import { useNavigation } from "../hooks/use-navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const data = {
  navMain: [
    {
      title: "Dashboard",
      id: "dashboard",
      icon: Home,
    },
    {
      title: "My Courses",
      id: "courses",
      icon: BookOpen,
    },
    {
      title: "Assignments",
      id: "assignments",
      icon: FileText,
    },
    {
      title: "Grades",
      id: "grades",
      icon: GraduationCap,
    },
    {
      title: "Tests",
      id: "tests",
      icon: TestTube,
    },
    {
      title: "Schedule",
      id: "schedule",
      icon: Calendar,
    },
    {
      title: "Messages",
      id: "messages",
      icon: MessageSquare,
    },
    {
      title: "AI Assistant",
      id: "chatbot",
      icon: MessageCircle,
    },
  ],
  navSecondary: [
    {
      title: "Profile",
      id: "profile",
      icon: User,
    },
    {
      title: "Settings",
      id: "settings",
      icon: Settings,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { activePage, setActivePage } = useNavigation()

  const handleNavigation = (pageId: string) => {
    console.log("Navigating to:", pageId) // Debug log
    setActivePage(pageId)
  }

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" onClick={() => handleNavigation("dashboard")}>
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <GraduationCap className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">EduPortal</span>
                <span className="truncate text-xs">Student Dashboard</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton isActive={activePage === item.id} onClick={() => handleNavigation(item.id)}>
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navSecondary.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    size="sm"
                    isActive={activePage === item.id}
                    onClick={() => handleNavigation(item.id)}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" onClick={() => handleNavigation("profile")}>
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Student" />
                <AvatarFallback className="rounded-lg">JS</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">John Smith</span>
                <span className="truncate text-xs">Student ID: 2024001</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
