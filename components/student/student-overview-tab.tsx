"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockSessions, mockSubjects, mockNotifications } from "@/lib/mock-data"
import { useAuth } from "@/lib/auth-context"
import { Calendar, Clock, Bell, BookOpen, GraduationCap, User } from "lucide-react"

export function StudentOverviewTab() {
  const { user } = useAuth()

  // For students, we'll show all active sessions as their class schedule
  const studentSessions = mockSessions.filter((session) => session.isActive)
  const studentNotifications = mockNotifications.filter((notification) => notification.userId === user?.id)
  const unreadNotifications = studentNotifications.filter((notification) => !notification.isRead)

  // Get all subjects available to students
  const availableSubjects = mockSubjects.filter((subject) =>
    studentSessions.some((session) => session.subjectId === subject.id),
  )

  const stats = [
    {
      title: "Enrolled Classes",
      value: studentSessions.length,
      icon: Calendar,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Available Subjects",
      value: availableSubjects.length,
      icon: BookOpen,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Weekly Hours",
      value: Math.round(
        studentSessions.reduce((total, session) => {
          const duration = session.endTime.getTime() - session.startTime.getTime()
          return total + duration / (1000 * 60 * 60) // Convert to hours
        }, 0),
      ),
      icon: Clock,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Unread Notifications",
      value: unreadNotifications.length,
      icon: Bell,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ]

  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

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
            <CardTitle>Today's Classes</CardTitle>
          </CardHeader>
          <CardContent>
            {studentSessions.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No classes scheduled</p>
            ) : (
              <div className="space-y-3">
                {studentSessions.slice(0, 3).map((session) => {
                  const subject = availableSubjects.find((s) => s.id === session.subjectId)
                  return (
                    <div key={session.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{session.title}</p>
                        <p className="text-sm text-gray-600">
                          {subject?.name} • {session.room}
                        </p>
                        <p className="text-sm text-gray-500">
                          {session.startTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} -{" "}
                          {session.endTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                      <Badge variant="outline">{dayNames[session.dayOfWeek]}</Badge>
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            {studentNotifications.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No notifications</p>
            ) : (
              <div className="space-y-3">
                {studentNotifications.slice(0, 3).map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg ${
                      notification.isRead ? "bg-gray-50" : "bg-green-50 border border-green-200"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{notification.title}</p>
                        <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-2">{notification.createdAt.toLocaleDateString()}</p>
                      </div>
                      {!notification.isRead && <div className="w-2 h-2 bg-green-600 rounded-full mt-1"></div>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Your Subjects
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableSubjects.map((subject) => {
              const sessionCount = studentSessions.filter((session) => session.subjectId === subject.id).length
              return (
                <div key={subject.id} className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border">
                  <h3 className="font-semibold text-gray-900">{subject.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{subject.code}</p>
                  <p className="text-xs text-gray-500">{sessionCount} weekly sessions</p>
                  {subject.description && <p className="text-xs text-gray-500 mt-1">{subject.description}</p>}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg text-center">
              <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-medium text-blue-900">View Schedule</h3>
              <p className="text-sm text-blue-700">Check your weekly class schedule</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg text-center">
              <Bell className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-medium text-green-900">Notifications</h3>
              <p className="text-sm text-green-700">Stay updated with announcements</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg text-center">
              <User className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-medium text-purple-900">Profile</h3>
              <p className="text-sm text-purple-700">Manage your account settings</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
