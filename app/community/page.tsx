import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
            Trade 🤝 Barter
          </Link>
          <Link href="/discover">
            <Button className="bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600">
              Meet Community
            </Button>
          </Link>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-xl">
          <h1 className="mb-4 text-4xl font-bold text-slate-900">Community</h1>
          <p className="mb-8 text-lg text-slate-600">Connect with local traders, share ideas, and help each other discover great deals.</p>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl bg-purple-50 p-6">
              <h2 className="text-xl font-semibold text-slate-900">Local Events</h2>
              <p className="mt-2 text-slate-600">Community meetups and trading circles grow stronger together.</p>
            </div>
            <div className="rounded-2xl bg-orange-50 p-6">
              <h2 className="text-xl font-semibold text-slate-900">Shared Wins</h2>
              <p className="mt-2 text-slate-600">Members swap recommendations, wins, and practical advice.</p>
            </div>
            <div className="rounded-2xl bg-green-50 p-6">
              <h2 className="text-xl font-semibold text-slate-900">Support</h2>
              <p className="mt-2 text-slate-600">Friendly support helps everyone navigate safer, easier trades.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
