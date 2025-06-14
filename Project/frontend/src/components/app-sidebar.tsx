"use client"

import type * as React from "react"
import { BookOpen, Calendar, FileText, GraduationCap, Home, MessageSquare, Settings, User, Bell } from "lucide-react"
import { useNavigation } from "../../../test/hooks/use-navigation"

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
      title: "Notifications",
      id: "notifications",
      icon: Bell,
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

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <button onClick={() => setActivePage("dashboard")}>
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <GraduationCap className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">EduPortal</span>
                  <span className="truncate text-xs">Student Dashboard</span>
                </div>
              </button>
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
                  <SidebarMenuButton asChild isActive={activePage === item.id}>
                    <button onClick={() => setActivePage(item.id)}>
                      <item.icon />
                      <span>{item.title}</span>
                    </button>
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
                  <SidebarMenuButton asChild size="sm" isActive={activePage === item.id}>
                    <button onClick={() => setActivePage(item.id)}>
                      <item.icon />
                      <span>{item.title}</span>
                    </button>
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
            <SidebarMenuButton size="lg" asChild>
              <button onClick={() => setActivePage("profile")}>
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Student" />
                  <AvatarFallback className="rounded-lg">JS</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">John Smith</span>
                  <span className="truncate text-xs">Student ID: 2024001</span>
                </div>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
