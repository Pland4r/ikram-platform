"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/lib/auth-context"
import { Loader2 } from "lucide-react"
import Link from "next/link"

export function LoginForm() {
  const [emailOrCode, setEmailOrCode] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsSubmitting(true)

    try {
      const success = await login(emailOrCode, password)
      if (success) {
        router.push("/dashboard")
      } else {
        setError("Invalid credentials or account not approved")
      }
    } catch (err) {
      setError("An error occurred during login")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
        <CardDescription className="text-center">
          Enter your email or unique code to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="emailOrCode">Email or Unique Code</Label>
            <Input
              id="emailOrCode"
              type="text"
              placeholder="admin@school.edu or T001"
              value={emailOrCode}
              onChange={(e) => setEmailOrCode(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        <div className="mt-4 space-y-2 text-center">
          <Button variant="link" className="p-0 h-auto text-sm" asChild>
            <Link href="/forgot-password">Forgot your password?</Link>
          </Button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Button variant="link" className="p-0 h-auto" asChild>
              <Link href="/register">Register here</Link>
            </Button>
          </p>
        </div>

        <div className="mt-4 text-center text-sm text-muted-foreground">
          <p>Demo Accounts:</p>
          <p>Admin: admin@school.edu / admin123</p>
          <p>Teacher: T001 / teacher123</p>
          <p>Student: E001 / student123</p>
        </div>
      </CardContent>
    </Card>
  )
}
