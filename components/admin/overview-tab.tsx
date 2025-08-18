"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockUsers, mockSessions, mockNotifications } from "@/lib/mock-data"
import { Users, Calendar, Bell, UserCheck } from "lucide-react"

export function OverviewTab() {
  const pendingUsers = mockUsers.filter((user) => user.status === "pending")
  const activeSessions = mockSessions.filter((session) => session.isActive)
  const unreadNotifications = mockNotifications.filter((notification) => !notification.isRead)
  const totalUsers = mockUsers.filter((user) => user.status === "approved").length

  const stats = [
    {
      title: "Total Users",
      value: totalUsers,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Active Sessions",
      value: activeSessions.length,
      icon: Calendar,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Pending Approvals",
      value: pendingUsers.length,
      icon: UserCheck,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      title: "Notifications",
      value: unreadNotifications.length,
      icon: Bell,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Pending User Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            {pendingUsers.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No pending approvals</p>
            ) : (
              <div className="space-y-3">
                {pendingUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                    <Badge variant={user.role === "teacher" ? "default" : "secondary"}>{user.role}</Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                <Calendar className="h-5 w-5 text-blue-600 mr-3" />
                <div>
                  <p className="font-medium">New session created</p>
                  <p className="text-sm text-gray-600">Mathematics - Room 101</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-green-50 rounded-lg">
                <UserCheck className="h-5 w-5 text-green-600 mr-3" />
                <div>
                  <p className="font-medium">User approved</p>
                  <p className="text-sm text-gray-600">Sarah Johnson (Teacher)</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-orange-50 rounded-lg">
                <Bell className="h-5 w-5 text-orange-600 mr-3" />
                <div>
                  <p className="font-medium">Schedule updated</p>
                  <p className="text-sm text-gray-600">Physics class moved to Room 103</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
