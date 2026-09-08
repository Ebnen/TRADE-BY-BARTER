import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function SafetyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
            Trade 🤝 Barter
          </Link>
          <Link href="/discover">
            <Button className="bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600">
              Browse
            </Button>
          </Link>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-xl">
          <h1 className="mb-4 text-4xl font-bold text-slate-900">Safety First</h1>
          <p className="mb-8 text-lg text-slate-600">
            We want every exchange to feel secure, transparent, and respectful.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-slate-100 p-6">
              <h2 className="mb-3 text-xl font-semibold text-slate-900">Meet safely</h2>
              <p className="text-slate-600">Choose a public place for handoff, tell someone where you are meeting, and trust your instincts.</p>
            </div>
            <div className="rounded-2xl bg-slate-100 p-6">
              <h2 className="mb-3 text-xl font-semibold text-slate-900">Verify before trading</h2>
              <p className="text-slate-600">Check item quality, confirm conditions, and communicate clearly before finalizing the exchange.</p>
            </div>
            <div className="rounded-2xl bg-slate-100 p-6">
              <h2 className="mb-3 text-xl font-semibold text-slate-900">Report issues quickly</h2>
              <p className="text-slate-600">If anything feels wrong, report the issue so the community can respond promptly.</p>
            </div>
            <div className="rounded-2xl bg-slate-100 p-6">
              <h2 className="mb-3 text-xl font-semibold text-slate-900">Build trust</h2>
              <p className="text-slate-600">Ratings, completed trades, and clear communication help everyone make safer decisions.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
