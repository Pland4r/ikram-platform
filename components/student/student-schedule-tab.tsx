"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockSessions, mockSubjects, mockUsers } from "@/lib/mock-data"
import { useAuth } from "@/lib/auth-context"
import { Calendar, Clock, MapPin, BookOpen, User } from "lucide-react"

export function StudentScheduleTab() {
  const { user } = useAuth()
  const [viewMode, setViewMode] = useState<"week" | "month">("week")

  // For students, show all active sessions as their class schedule
  const studentSessions = mockSessions.filter((session) => session.isActive)

  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  // Group sessions by day of week
  const sessionsByDay = dayNames.map((dayName, dayIndex) => ({
    day: dayName,
    dayIndex,
    sessions: studentSessions.filter((session) => session.dayOfWeek === dayIndex),
  }))

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">My Class Schedule</h2>
        <div className="flex items-center gap-4">
          <Select value={viewMode} onValueChange={(value: "week" | "month") => setViewMode(value)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Week View</SelectItem>
              <SelectItem value="month">Month View</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {studentSessions.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Classes Available</h3>
            <p className="text-gray-600">There are no classes scheduled at the moment. Check back later.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {viewMode === "week" && (
            <div className="grid gap-4">
              {sessionsByDay.map(({ day, sessions }) => (
                <Card key={day} className={sessions.length === 0 ? "opacity-60" : ""}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      {day}
                      <Badge variant="outline" className="ml-auto">
                        {sessions.length} {sessions.length === 1 ? "class" : "classes"}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {sessions.length === 0 ? (
                      <p className="text-gray-500 text-center py-4">No classes scheduled</p>
                    ) : (
                      <div className="space-y-3">
                        {sessions
                          .sort((a, b) => a.startTime.getTime() - b.startTime.getTime())
                          .map((session) => {
                            const subject = mockSubjects.find((s) => s.id === session.subjectId)
                            const teacher = mockUsers.find((u) => u.id === session.teacherId)
                            return (
                              <div
                                key={session.id}
                                className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border"
                              >
                                <div className="flex-1">
                                  <h3 className="font-semibold text-gray-900 mb-1">{session.title}</h3>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                                    <div className="flex items-center gap-1">
                                      <BookOpen className="h-4 w-4" />
                                      {subject?.name} ({subject?.code})
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <User className="h-4 w-4" />
                                      {teacher?.firstName} {teacher?.lastName}
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Clock className="h-4 w-4" />
                                      {session.startTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}{" "}
                                      - {session.endTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                    </div>
                                    {session.room && (
                                      <div className="flex items-center gap-1">
                                        <MapPin className="h-4 w-4" />
                                        {session.room}
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <Badge variant="default" className="bg-green-600">
                                  Enrolled
                                </Badge>
                              </div>
                            )
                          })}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {viewMode === "month" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  {monthNames[new Date().getMonth()]} {new Date().getFullYear()}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {dayNames.map((day) => (
                    <div key={day} className="p-2 text-center font-medium text-gray-600 text-sm">
                      {day.slice(0, 3)}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 35 }, (_, i) => {
                    const dayIndex = i % 7
                    const dayNumber = Math.floor(i / 7) * 7 + dayIndex + 1
                    const daySessions = studentSessions.filter((session) => session.dayOfWeek === dayIndex)

                    return (
                      <div
                        key={i}
                        className={`p-2 min-h-[80px] border rounded-lg ${
                          daySessions.length > 0 ? "bg-green-50 border-green-200" : "bg-gray-50"
                        }`}
                      >
                        <div className="text-sm font-medium text-gray-900 mb-1">{dayNumber}</div>
                        {daySessions.slice(0, 2).map((session) => (
                          <div key={session.id} className="text-xs bg-green-100 text-green-800 p-1 rounded mb-1">
                            {session.title}
                          </div>
                        ))}
                        {daySessions.length > 2 && (
                          <div className="text-xs text-gray-600">+{daySessions.length - 2} more</div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Schedule Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{studentSessions.length}</div>
              <div className="text-sm text-green-800">Total Classes</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {new Set(studentSessions.map((s) => s.subjectId)).size}
              </div>
              <div className="text-sm text-blue-800">Different Subjects</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {studentSessions
                  .reduce((total, session) => {
                    const duration = session.endTime.getTime() - session.startTime.getTime()
                    return total + duration / (1000 * 60 * 60) // Convert to hours
                  }, 0)
                  .toFixed(1)}
              </div>
              <div className="text-sm text-purple-800">Hours per Week</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
