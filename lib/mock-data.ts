import type { User, Subject, ClassSession, Notification } from "./types"

export const mockUsers: User[] = [
  {
    id: "1",
    email: "admin@school.edu",
    password: "admin123",
    firstName: "John",
    lastName: "Director",
    role: "admin",
    status: "approved",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    email: "teacher1@school.edu",
    password: "teacher123",
    firstName: "Sarah",
    lastName: "Johnson",
    role: "teacher",
    status: "approved",
    uniqueCode: "T001",
    createdAt: new Date("2024-01-02"),
    updatedAt: new Date("2024-01-02"),
  },
  {
    id: "3",
    email: "student1@school.edu",
    password: "student123",
    firstName: "Mike",
    lastName: "Smith",
    role: "student",
    status: "approved",
    uniqueCode: "E001",
    createdAt: new Date("2024-01-03"),
    updatedAt: new Date("2024-01-03"),
  },
  {
    id: "4",
    email: "pending.teacher@school.edu",
    password: "pending123",
    firstName: "Emma",
    lastName: "Wilson",
    role: "teacher",
    status: "pending",
    createdAt: new Date("2024-01-04"),
    updatedAt: new Date("2024-01-04"),
  },
  {
    id: "5",
    email: "pending.student@school.edu",
    password: "pending123",
    firstName: "Alex",
    lastName: "Brown",
    role: "student",
    status: "pending",
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-05"),
  },
]

export const mockSubjects: Subject[] = [
  {
    id: "1",
    name: "Mathematics",
    code: "MATH101",
    description: "Introduction to Calculus",
  },
  {
    id: "2",
    name: "Physics",
    code: "PHYS101",
    description: "Classical Mechanics",
  },
  {
    id: "3",
    name: "Computer Science",
    code: "CS101",
    description: "Programming Fundamentals",
  },
  {
    id: "4",
    name: "English Literature",
    code: "ENG101",
    description: "Modern Literature Analysis",
  },
]

export const mockSessions: ClassSession[] = [
  {
    id: "1",
    subjectId: "1",
    teacherId: "2",
    title: "Calculus Basics",
    startTime: new Date("2024-01-08T09:00:00"),
    endTime: new Date("2024-01-08T10:30:00"),
    dayOfWeek: 1, // Monday
    room: "Room 101",
    isActive: true,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    subjectId: "2",
    teacherId: "2",
    title: "Newton's Laws",
    startTime: new Date("2024-01-08T11:00:00"),
    endTime: new Date("2024-01-08T12:30:00"),
    dayOfWeek: 1, // Monday
    room: "Room 102",
    isActive: true,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "3",
    subjectId: "3",
    teacherId: "2",
    title: "Introduction to Programming",
    startTime: new Date("2024-01-09T14:00:00"),
    endTime: new Date("2024-01-09T15:30:00"),
    dayOfWeek: 2, // Tuesday
    room: "Computer Lab",
    isActive: true,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
]

export const mockNotifications: Notification[] = [
  {
    id: "1",
    userId: "3",
    title: "Schedule Update",
    message: "Mathematics class has been moved to Room 103",
    type: "schedule_update",
    isRead: false,
    createdAt: new Date("2024-01-07T10:00:00"),
  },
  {
    id: "2",
    userId: "2",
    title: "Class Cancelled",
    message: "Physics class on Monday has been cancelled due to teacher illness",
    type: "session_cancelled",
    isRead: false,
    createdAt: new Date("2024-01-07T08:00:00"),
  },
]

// Helper functions for mock data operations
export const generateUniqueCode = (role: "teacher" | "student"): string => {
  const prefix = role === "teacher" ? "T" : "E"
  const existingCodes = mockUsers
    .filter((user) => user.role === role && user.uniqueCode)
    .map((user) => user.uniqueCode!)

  let counter = 1
  let newCode = `${prefix}${counter.toString().padStart(3, "0")}`

  while (existingCodes.includes(newCode)) {
    counter++
    newCode = `${prefix}${counter.toString().padStart(3, "0")}`
  }

  return newCode
}

export const findUserByEmailAndPassword = (email: string, password: string): User | null => {
  return mockUsers.find((user) => user.email === email && user.password === password) || null
}

export const findUserByUniqueCode = (uniqueCode: string, password: string): User | null => {
  return mockUsers.find((user) => user.uniqueCode === uniqueCode && user.password === password) || null
}
