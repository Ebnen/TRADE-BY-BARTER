import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
            Trade 🤝 Barter
          </Link>
          <Link href="/login">
            <Button className="bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600">
              Sign In
            </Button>
          </Link>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-xl">
          <h1 className="mb-4 text-4xl font-bold text-slate-900">Help Center</h1>
          <p className="mb-8 text-lg text-slate-600">Find quick guidance for using the marketplace, creating posts, and trading safely.</p>

          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 p-5">
              <h2 className="text-xl font-semibold text-slate-900">How do I post an item?</h2>
              <p className="mt-2 text-slate-600">Go to the post page, add a title, description, and a clear image or video, then publish your listing.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 p-5">
              <h2 className="text-xl font-semibold text-slate-900">Can I find specific items?</h2>
              <p className="mt-2 text-slate-600">Yes. Use the discover page and filters to search by category, keyword, or item type.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 p-5">
              <h2 className="text-xl font-semibold text-slate-900">What if I need support?</h2>
              <p className="mt-2 text-slate-600">Use the contact page or report a concern directly from the message or trade flow.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
