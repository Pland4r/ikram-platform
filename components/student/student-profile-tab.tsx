"use client"
import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, BookOpen, Calendar, GraduationCap, Eye, EyeOff } from "lucide-react"
import { toast } from "sonner"

export function StudentProfileTab() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: user?.email || "",
    password: "",
  })

  if (!user) return null

  const handleSave = () => {
    // In a real app, this would make an API call to update the user
    toast.success("Profile updated successfully!")
    setIsEditing(false)
    setFormData({ ...formData, password: "" })
  }

  const handleCancel = () => {
    setFormData({
      email: user.email,
      password: "",
    })
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Profile Settings</h2>
        <Badge variant="secondary" className="bg-green-600">
          <GraduationCap className="h-4 w-4 mr-1" />
          Student
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" value={user.firstName} readOnly />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" value={user.lastName} readOnly />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                value={isEditing ? formData.email : user.email}
                readOnly={!isEditing}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={isEditing ? "border-green-300 focus:border-green-500" : ""}
              />
            </div>
            {isEditing && (
              <div className="grid gap-2">
                <Label htmlFor="password">New Password (optional)</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Enter new password"
                    className="border-green-300 focus:border-green-500 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Academic Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="studentCode">Student Code</Label>
              <Input id="studentCode" value={user.uniqueCode} readOnly />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="program">Program</Label>
              <Input id="program" value="Computer Science" readOnly />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="year">Academic Year</Label>
              <Input id="year" value="2024-2025" readOnly />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Enrolled Courses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="font-medium">Mathematics</span>
              <Badge variant="secondary">Core</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="font-medium">Physics</span>
              <Badge variant="secondary">Core</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="font-medium">Computer Science</span>
              <Badge variant="secondary">Major</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="font-medium">English</span>
              <Badge variant="secondary">Elective</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        {isEditing ? (
          <>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
              Save Changes
            </Button>
          </>
        ) : (
          <Button variant="outline" onClick={() => setIsEditing(true)}>
            Edit Profile
          </Button>
        )}
      </div>
    </div>
  )
}
