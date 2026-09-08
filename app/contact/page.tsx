import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50 px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
            Trade 🤝 Barter
          </Link>
          <Link href="/help">
            <Button variant="outline">Help Center</Button>
          </Link>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-xl">
          <h1 className="mb-4 text-4xl font-bold text-slate-900">Contact Us</h1>
          <p className="mb-8 text-lg text-slate-600">We’re here to help with trade questions, support issues, or platform feedback.</p>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-slate-100 p-6">
              <h2 className="text-xl font-semibold text-slate-900">Email</h2>
              <p className="mt-2 text-slate-600">support@tradebarter.com</p>
            </div>
            <div className="rounded-2xl bg-slate-100 p-6">
              <h2 className="text-xl font-semibold text-slate-900">Phone</h2>
              <p className="mt-2 text-slate-600">+234 (0) 800 123 4567</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
