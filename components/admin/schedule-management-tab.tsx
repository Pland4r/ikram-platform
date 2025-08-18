"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { mockSessions, mockSubjects, mockUsers } from "@/lib/mock-data"
import { Plus, Edit, Trash2 } from "lucide-react"
import type { ClassSession } from "@/lib/types"

export function ScheduleManagementTab() {
  const [sessions, setSessions] = useState(mockSessions)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingSession, setEditingSession] = useState<ClassSession | null>(null)

  const teachers = mockUsers.filter((user) => user.role === "teacher" && user.status === "approved")
  const subjects = mockSubjects

  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  const handleCreateSession = (sessionData: Partial<ClassSession>) => {
    const newSession: ClassSession = {
      id: Date.now().toString(),
      subjectId: sessionData.subjectId!,
      teacherId: sessionData.teacherId!,
      title: sessionData.title!,
      startTime: sessionData.startTime!,
      endTime: sessionData.endTime!,
      dayOfWeek: sessionData.dayOfWeek!,
      room: sessionData.room,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setSessions([...sessions, newSession])
    setIsCreateDialogOpen(false)
  }

  const handleDeleteSession = (sessionId: string) => {
    setSessions(sessions.filter((session) => session.id !== sessionId))
  }

  const handleToggleSession = (sessionId: string) => {
    setSessions(
      sessions.map((session) =>
        session.id === sessionId ? { ...session, isActive: !session.isActive, updatedAt: new Date() } : session,
      ),
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Schedule Management</h2>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Session
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Session</DialogTitle>
            </DialogHeader>
            <SessionForm
              onSubmit={handleCreateSession}
              onCancel={() => setIsCreateDialogOpen(false)}
              teachers={teachers}
              subjects={subjects}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {sessions.map((session) => {
          const subject = subjects.find((s) => s.id === session.subjectId)
          const teacher = teachers.find((t) => t.id === session.teacherId)

          return (
            <Card key={session.id} className={!session.isActive ? "opacity-60" : ""}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{session.title}</h3>
                      <Badge variant={session.isActive ? "default" : "secondary"}>
                        {session.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <p>
                          <strong>Subject:</strong> {subject?.name} ({subject?.code})
                        </p>
                        <p>
                          <strong>Teacher:</strong> {teacher?.firstName} {teacher?.lastName}
                        </p>
                      </div>
                      <div>
                        <p>
                          <strong>Day:</strong> {dayNames[session.dayOfWeek]}
                        </p>
                        <p>
                          <strong>Time:</strong>{" "}
                          {session.startTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} -{" "}
                          {session.endTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                        {session.room && (
                          <p>
                            <strong>Room:</strong> {session.room}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleToggleSession(session.id)}>
                      {session.isActive ? "Deactivate" : "Activate"}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setEditingSession(session)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteSession(session.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

interface SessionFormProps {
  onSubmit: (data: Partial<ClassSession>) => void
  onCancel: () => void
  teachers: any[]
  subjects: any[]
  initialData?: Partial<ClassSession>
}

function SessionForm({ onSubmit, onCancel, teachers, subjects, initialData }: SessionFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    subjectId: initialData?.subjectId || "",
    teacherId: initialData?.teacherId || "",
    dayOfWeek: initialData?.dayOfWeek?.toString() || "",
    startTime: initialData?.startTime ? initialData.startTime.toTimeString().slice(0, 5) : "",
    endTime: initialData?.endTime ? initialData.endTime.toTimeString().slice(0, 5) : "",
    room: initialData?.room || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const startDate = new Date()
    const endDate = new Date()
    const [startHour, startMinute] = formData.startTime.split(":")
    const [endHour, endMinute] = formData.endTime.split(":")

    startDate.setHours(Number.parseInt(startHour), Number.parseInt(startMinute), 0, 0)
    endDate.setHours(Number.parseInt(endHour), Number.parseInt(endMinute), 0, 0)

    onSubmit({
      ...formData,
      dayOfWeek: Number.parseInt(formData.dayOfWeek),
      startTime: startDate,
      endTime: endDate,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Session Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="subject">Subject</Label>
        <Select value={formData.subjectId} onValueChange={(value) => setFormData({ ...formData, subjectId: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select subject" />
          </SelectTrigger>
          <SelectContent>
            {subjects.map((subject) => (
              <SelectItem key={subject.id} value={subject.id}>
                {subject.name} ({subject.code})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="teacher">Teacher</Label>
        <Select value={formData.teacherId} onValueChange={(value) => setFormData({ ...formData, teacherId: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select teacher" />
          </SelectTrigger>
          <SelectContent>
            {teachers.map((teacher) => (
              <SelectItem key={teacher.id} value={teacher.id}>
                {teacher.firstName} {teacher.lastName} ({teacher.uniqueCode})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="day">Day of Week</Label>
        <Select value={formData.dayOfWeek} onValueChange={(value) => setFormData({ ...formData, dayOfWeek: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select day" />
          </SelectTrigger>
          <SelectContent>
            {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day, index) => (
              <SelectItem key={index} value={index.toString()}>
                {day}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="startTime">Start Time</Label>
          <Input
            id="startTime"
            type="time"
            value={formData.startTime}
            onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="endTime">End Time</Label>
          <Input
            id="endTime"
            type="time"
            value={formData.endTime}
            onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="room">Room (Optional)</Label>
        <Input
          id="room"
          value={formData.room}
          onChange={(e) => setFormData({ ...formData, room: e.target.value })}
          placeholder="e.g., Room 101, Computer Lab"
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{initialData ? "Update" : "Create"} Session</Button>
      </div>
    </form>
  )
}
