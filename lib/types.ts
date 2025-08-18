export type UserRole = "admin" | "teacher" | "student"

export type UserStatus = "pending" | "approved" | "rejected"

export interface User {
  id: string
  email: string
  password: string
  firstName: string
  lastName: string
  role: UserRole
  status: UserStatus
  uniqueCode?: string // T-prefix for teachers, E-prefix for students
  createdAt: Date
  updatedAt: Date
}

export interface Subject {
  id: string
  name: string
  code: string
  description?: string
}

export interface ClassSession {
  id: string
  subjectId: string
  teacherId: string
  title: string
  startTime: Date
  endTime: Date
  dayOfWeek: number // 0-6 (Sunday-Saturday)
  room?: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Notification {
  id: string
  userId: string
  title: string
  message: string
  type: "schedule_update" | "session_cancelled" | "session_added" | "general"
  isRead: boolean
  createdAt: Date
}

export interface ScheduleUpdate {
  id: string
  sessionId: string
  updateType: "modified" | "cancelled" | "added"
  oldData?: Partial<ClassSession>
  newData?: Partial<ClassSession>
  reason?: string
  createdBy: string
  createdAt: Date
}

// Auth context types
export interface AuthUser {
  id: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
  uniqueCode?: string
}

export interface AuthContextType {
  user: AuthUser | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}
