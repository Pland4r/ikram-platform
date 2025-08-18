"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { mockUsers, generateUniqueCode } from "@/lib/mock-data"
import { Check, X, Mail } from "lucide-react"
import type { User } from "@/lib/types"

export function UserApprovalsTab() {
  const [users, setUsers] = useState(mockUsers)
  const [processingUsers, setProcessingUsers] = useState<Set<string>>(new Set())

  const pendingUsers = users.filter((user) => user.status === "pending")

  const handleApproveUser = async (userId: string) => {
    setProcessingUsers((prev) => new Set(prev).add(userId))

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setUsers((prevUsers) =>
      prevUsers.map((user) => {
        if (user.id === userId) {
          const uniqueCode = user.role === "admin" ? undefined : generateUniqueCode(user.role as "teacher" | "student")
          return {
            ...user,
            status: "approved" as const,
            uniqueCode,
            updatedAt: new Date(),
          }
        }
        return user
      }),
    )

    setProcessingUsers((prev) => {
      const newSet = new Set(prev)
      newSet.delete(userId)
      return newSet
    })
  }

  const handleRejectUser = async (userId: string) => {
    setProcessingUsers((prev) => new Set(prev).add(userId))

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, status: "rejected" as const, updatedAt: new Date() } : user,
      ),
    )

    setProcessingUsers((prev) => {
      const newSet = new Set(prev)
      newSet.delete(userId)
      return newSet
    })
  }

  const sendEmailNotification = (user: User, approved: boolean) => {
    // In a real app, this would send an actual email
    console.log(`Email sent to ${user.email}:`, {
      approved,
      uniqueCode: approved ? user.uniqueCode : undefined,
      message: approved
        ? `Your account has been approved. Your login code is: ${user.uniqueCode}`
        : "Your account application has been rejected.",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">User Approvals</h2>
        <p className="text-gray-600">Review and approve pending user registrations</p>
      </div>

      {pendingUsers.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Pending Approvals</h3>
            <p className="text-gray-600">All user registrations have been processed.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          <Alert>
            <Mail className="h-4 w-4" />
            <AlertDescription>
              Approved users will receive their unique login codes via email automatically.
            </AlertDescription>
          </Alert>

          {pendingUsers.map((user) => (
            <Card key={user.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">
                        {user.firstName} {user.lastName}
                      </h3>
                      <Badge variant={user.role === "teacher" ? "default" : "secondary"}>{user.role}</Badge>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>
                        <strong>Email:</strong> {user.email}
                      </p>
                      <p>
                        <strong>Registration Date:</strong> {user.createdAt.toLocaleDateString()}
                      </p>
                      <p>
                        <strong>Role:</strong> {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRejectUser(user.id)}
                      disabled={processingUsers.has(user.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleApproveUser(user.id)}
                      disabled={processingUsers.has(user.id)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Check className="h-4 w-4 mr-1" />
                      {processingUsers.has(user.id) ? "Processing..." : "Approve"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Approval Process</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
                1
              </div>
              <div>
                <p className="font-medium">Review Application</p>
                <p className="text-gray-600">Check user details and role assignment</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
                2
              </div>
              <div>
                <p className="font-medium">Approve or Reject</p>
                <p className="text-gray-600">Make decision based on institutional policies</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
                3
              </div>
              <div>
                <p className="font-medium">Automatic Notification</p>
                <p className="text-gray-600">
                  User receives email with login credentials (T-prefix for teachers, E-prefix for students)
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
