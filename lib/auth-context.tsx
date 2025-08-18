"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { AuthContextType, AuthUser } from "./types"
import { findUserByEmailAndPassword, findUserByUniqueCode } from "./mock-data"
import { useRouter } from "next/navigation"

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("school-platform-user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (emailOrCode: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Try login with email first
    let foundUser = findUserByEmailAndPassword(emailOrCode, password)

    // If not found, try with unique code
    if (!foundUser) {
      foundUser = findUserByUniqueCode(emailOrCode, password)
    }

    if (foundUser && foundUser.status === "approved") {
      const authUser: AuthUser = {
        id: foundUser.id,
        email: foundUser.email,
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
        role: foundUser.role,
        uniqueCode: foundUser.uniqueCode,
      }

      setUser(authUser)
      localStorage.setItem("school-platform-user", JSON.stringify(authUser))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("school-platform-user")
    router.push("/login")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
