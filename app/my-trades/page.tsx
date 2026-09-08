import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function MyTradesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 px-4 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
            Trade 🤝 Barter
          </Link>
          <Link href="/discover">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Discover More
            </Button>
          </Link>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-xl">
          <h1 className="mb-4 text-4xl font-bold text-slate-900">My Trades</h1>
          <p className="mb-8 text-lg text-slate-600">Keep track of your active offers, recent matches, and completed exchanges.</p>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl bg-blue-50 p-6">
              <h2 className="text-lg font-semibold text-slate-900">Open Offers</h2>
              <p className="mt-2 text-3xl font-bold text-blue-600">4</p>
            </div>
            <div className="rounded-2xl bg-green-50 p-6">
              <h2 className="text-lg font-semibold text-slate-900">Completed</h2>
              <p className="mt-2 text-3xl font-bold text-green-600">12</p>
            </div>
            <div className="rounded-2xl bg-orange-50 p-6">
              <h2 className="text-lg font-semibold text-slate-900">Pending</h2>
              <p className="mt-2 text-3xl font-bold text-orange-600">2</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
