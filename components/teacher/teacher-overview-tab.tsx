"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockSessions, mockSubjects, mockNotifications } from "@/lib/mock-data"
import { useAuth } from "@/lib/auth-context"
import { Calendar, Clock, Bell, BookOpen } from "lucide-react"

export function TeacherOverviewTab() {
  const { user } = useAuth()

  // Filter sessions for current teacher
  const teacherSessions = mockSessions.filter((session) => session.teacherId === user?.id && session.isActive)
  const teacherNotifications = mockNotifications.filter((notification) => notification.userId === user?.id)
  const unreadNotifications = teacherNotifications.filter((notification) => !notification.isRead)

  // Get unique subjects taught by this teacher
  const teacherSubjects = mockSubjects.filter((subject) =>
    teacherSessions.some((session) => session.subjectId === subject.id),
  )

  const stats = [
    {
      title: "Active Classes",
      value: teacherSessions.length,
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Subjects Teaching",
      value: teacherSubjects.length,
      icon: BookOpen,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "This Week's Classes",
      value: teacherSessions.length * 7, // Simplified calculation
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
            {teacherSessions.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No classes scheduled</p>
            ) : (
              <div className="space-y-3">
                {teacherSessions.slice(0, 3).map((session) => {
                  const subject = teacherSubjects.find((s) => s.id === session.subjectId)
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
            {teacherNotifications.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No notifications</p>
            ) : (
              <div className="space-y-3">
                {teacherNotifications.slice(0, 3).map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg ${
                      notification.isRead ? "bg-gray-50" : "bg-blue-50 border border-blue-200"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{notification.title}</p>
                        <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-2">{notification.createdAt.toLocaleDateString()}</p>
                      </div>
                      {!notification.isRead && <div className="w-2 h-2 bg-blue-600 rounded-full mt-1"></div>}
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
          <CardTitle>Subjects You Teach</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teacherSubjects.map((subject) => {
              const sessionCount = teacherSessions.filter((session) => session.subjectId === subject.id).length
              return (
                <div key={subject.id} className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border">
                  <h3 className="font-semibold text-gray-900">{subject.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{subject.code}</p>
                  <p className="text-xs text-gray-500">{sessionCount} active sessions</p>
                  {subject.description && <p className="text-xs text-gray-500 mt-1">{subject.description}</p>}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
