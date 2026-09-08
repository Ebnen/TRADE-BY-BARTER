import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <div className="mb-8 text-center">
          <Link href="/" className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Trade 🤝 Barter
          </Link>
          <p className="mt-2 text-slate-600">Reset your password</p>
        </div>

        <h1 className="mb-4 text-2xl font-bold text-slate-900">Forgot Password?</h1>
        <p className="mb-6 text-slate-600">
          Enter your email address and we’ll send you instructions to reset your password.
        </p>

        <div className="space-y-4">
          <Input type="email" placeholder="Enter your email" />
          <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            Send Reset Link
          </Button>
        </div>

        <div className="mt-6 text-center text-sm text-slate-600">
          Back to <Link href="/login" className="font-medium text-blue-600 hover:underline">Sign In</Link>
        </div>
      </div>
    </div>
  )
}
