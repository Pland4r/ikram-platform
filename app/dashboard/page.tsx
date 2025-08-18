"use client"

import { useState } from "react"
import { ProtectedRoute } from "@/components/protected-route"
import { AdminDashboardLayout } from "@/components/admin/dashboard-layout"
import { OverviewTab } from "@/components/admin/overview-tab"
import { ScheduleManagementTab } from "@/components/admin/schedule-management-tab"
import { UserApprovalsTab } from "@/components/admin/user-approvals-tab"
import { AdminProfileTab } from "@/components/admin/admin-profile-tab"
import { TeacherDashboardLayout } from "@/components/teacher/teacher-dashboard-layout"
import { TeacherOverviewTab } from "@/components/teacher/teacher-overview-tab"
import { TeacherScheduleTab } from "@/components/teacher/teacher-schedule-tab"
import { TeacherNotificationsTab } from "@/components/teacher/teacher-notifications-tab"
import { TeacherProfileTab } from "@/components/teacher/teacher-profile-tab"
import { StudentDashboardLayout } from "@/components/student/student-dashboard-layout"
import { StudentOverviewTab } from "@/components/student/student-overview-tab"
import { StudentScheduleTab } from "@/components/student/student-schedule-tab"
import { StudentNotificationsTab } from "@/components/student/student-notifications-tab"
import { StudentProfileTab } from "@/components/student/student-profile-tab"
import { useAuth } from "@/lib/auth-context"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const { user } = useAuth()

  const renderAdminContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab />
      case "schedule":
        return <ScheduleManagementTab />
      case "users":
        return <UserApprovalsTab />
      case "manage-users":
        return <div>Manage Users Tab - Coming Soon</div>
      case "profile":
        return <AdminProfileTab />
      default:
        return <OverviewTab />
    }
  }

  const renderTeacherContent = () => {
    switch (activeTab) {
      case "overview":
        return <TeacherOverviewTab />
      case "schedule":
        return <TeacherScheduleTab />
      case "notifications":
        return <TeacherNotificationsTab />
      case "profile":
        return <TeacherProfileTab />
      default:
        return <TeacherOverviewTab />
    }
  }

  const renderStudentContent = () => {
    switch (activeTab) {
      case "overview":
        return <StudentOverviewTab />
      case "schedule":
        return <StudentScheduleTab />
      case "notifications":
        return <StudentNotificationsTab />
      case "profile":
        return <StudentProfileTab />
      default:
        return <StudentOverviewTab />
    }
  }

  if (user?.role === "admin") {
    return (
      <ProtectedRoute allowedRoles={["admin"]}>
        <AdminDashboardLayout activeTab={activeTab} onTabChange={setActiveTab}>
          {renderAdminContent()}
        </AdminDashboardLayout>
      </ProtectedRoute>
    )
  }

  if (user?.role === "teacher") {
    return (
      <ProtectedRoute allowedRoles={["teacher"]}>
        <TeacherDashboardLayout activeTab={activeTab} onTabChange={setActiveTab}>
          {renderTeacherContent()}
        </TeacherDashboardLayout>
      </ProtectedRoute>
    )
  }

  if (user?.role === "student") {
    return (
      <ProtectedRoute allowedRoles={["student"]}>
        <StudentDashboardLayout activeTab={activeTab} onTabChange={setActiveTab}>
          {renderStudentContent()}
        </StudentDashboardLayout>
      </ProtectedRoute>
    )
  }

  return null
}
