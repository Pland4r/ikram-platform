"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Loader2,
  Calendar,
  Users,
  Bell,
  Shield,
  Clock,
  BookOpen,
  GraduationCap,
  UserCheck,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [showLanding, setShowLanding] = useState(false)

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        router.push("/dashboard")
      } else {
        setShowLanding(true)
      }
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!showLanding) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">SchoolTime</h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            Complete School Management Solution
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Streamline Your
            <span className="text-blue-600 block">Academic Schedule</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            A comprehensive platform for administrators, teachers, and students to manage class schedules, track
            updates, and stay connected with real-time notifications.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/register">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/login">Sign In to Dashboard</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Manage School Schedules
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful tools designed for educational institutions of all sizes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="p-2 bg-blue-100 rounded-lg w-fit">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Schedule Management</CardTitle>
                <CardDescription>
                  Create, modify, and manage class schedules with ease. Handle special cases and last-minute changes
                  effortlessly.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="p-2 bg-green-100 rounded-lg w-fit">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  Streamlined registration and approval process for teachers and students with automatic code
                  generation.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="p-2 bg-purple-100 rounded-lg w-fit">
                  <Bell className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Real-time Notifications</CardTitle>
                <CardDescription>
                  Instant updates for schedule changes, cancellations, and important announcements across all users.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="p-2 bg-orange-100 rounded-lg w-fit">
                  <Shield className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle>Role-based Access</CardTitle>
                <CardDescription>
                  Secure dashboards tailored for administrators, teachers, and students with appropriate permissions.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="p-2 bg-red-100 rounded-lg w-fit">
                  <Clock className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle>Time Tracking</CardTitle>
                <CardDescription>
                  Monitor class hours, track attendance patterns, and generate comprehensive scheduling reports.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="p-2 bg-indigo-100 rounded-lg w-fit">
                  <BookOpen className="h-6 w-6 text-indigo-600" />
                </div>
                <CardTitle>Subject Organization</CardTitle>
                <CardDescription>
                  Organize courses by subjects, assign teachers, and manage classroom resources efficiently.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* User Types Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Built for Every Role in Education</h2>
            <p className="text-xl text-gray-600">Tailored experiences for administrators, teachers, and students</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
              <CardHeader className="text-center">
                <div className="p-3 bg-blue-600 rounded-full w-fit mx-auto mb-4">
                  <UserCheck className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-blue-900">Administrators</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-blue-800">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    Complete schedule management control
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    User registration approval system
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    Real-time platform oversight
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    Emergency schedule modifications
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
              <CardHeader className="text-center">
                <div className="p-3 bg-green-600 rounded-full w-fit mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-green-900">Teachers</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-green-800">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    Personal schedule dashboard
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    Class and subject management
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    Instant change notifications
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    Weekly and monthly views
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
              <CardHeader className="text-center">
                <div className="p-3 bg-purple-600 rounded-full w-fit mx-auto mb-4">
                  <GraduationCap className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-purple-900">Students</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-purple-800">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    Personalized class schedules
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    Subject and teacher information
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    Schedule change alerts
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    Mobile-friendly interface
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your School's Schedule Management?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of educational institutions already using SchoolTime to streamline their operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/register">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
              asChild
            >
              <Link href="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-bold">SchoolTime</h3>
              </div>
              <p className="text-gray-400">
                Streamlining academic schedule management for educational institutions worldwide.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/register" className="hover:text-white">
                    Get Started
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="hover:text-white">
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link href="/forgot-password" className="hover:text-white">
                    Reset Password
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Schedule Management</li>
                <li>User Administration</li>
                <li>Real-time Notifications</li>
                <li>Role-based Access</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Demo Accounts</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Admin: admin@school.edu</li>
                <li>Teacher: T001</li>
                <li>Student: E001</li>
                <li>Password: respective123</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 SchoolTime. Built with modern web technologies for educational excellence.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
