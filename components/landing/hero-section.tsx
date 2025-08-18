"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Play } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
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
          A comprehensive platform for administrators, teachers, and students to manage class schedules, track updates,
          and stay connected with real-time notifications.
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

        <div className="mt-16">
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-2xl p-8 border">
              <div className="aspect-video bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="p-4 bg-blue-600 rounded-full w-fit mx-auto mb-4">
                    <Play className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">See SchoolTime in Action</h3>
                  <p className="text-gray-600">Watch how easy it is to manage your school's schedule</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
