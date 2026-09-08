import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
            Trade 🤝 Barter
          </Link>
          <Link href="/signup">
            <Button className="bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600">
              Join Now
            </Button>
          </Link>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-xl">
          <h1 className="mb-4 text-4xl font-bold text-slate-900">Privacy Policy</h1>
          <p className="mb-8 text-lg text-slate-600">
            We value your privacy and protect your information with care.
          </p>

          <div className="space-y-4 text-slate-600">
            <p>We collect only the information needed to operate the platform safely and provide a better trading experience.</p>
            <p>Account details, messages, and transaction-related data may be used to support communication, fraud prevention, and service improvements.</p>
            <p>We do not sell personal data to third parties. We keep the platform secure and limit access to sensitive information.</p>
            <p>By continuing to use the platform, you agree to the practices described in this policy.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
