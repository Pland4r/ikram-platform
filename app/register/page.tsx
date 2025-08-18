import { RegistrationForm } from "@/components/registration-form"

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Join Our Platform</h1>
          <p className="text-gray-600">Register to access your academic schedule</p>
        </div>
        <RegistrationForm />
      </div>
    </div>
  )
}
