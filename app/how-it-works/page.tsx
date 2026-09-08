import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-orange-50 px-4 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
            Trade 🤝 Barter
          </Link>
          <Link href="/discover">
            <Button className="bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600">
              Explore
            </Button>
          </Link>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-xl">
          <h1 className="mb-4 text-4xl font-bold text-slate-900">How It Works</h1>
          <p className="mb-8 text-lg text-slate-600">
            Trading should be simple, safe, and rewarding. Here’s how the platform helps people exchange items and find what they need.
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-purple-100 bg-purple-50 p-6">
              <div className="mb-4 text-3xl">1</div>
              <h2 className="mb-2 text-xl font-semibold text-slate-900">Create a profile</h2>
              <p className="text-slate-600">Sign up, add a few details, and start building trust with other traders.</p>
            </div>
            <div className="rounded-2xl border border-orange-100 bg-orange-50 p-6">
              <div className="mb-4 text-3xl">2</div>
              <h2 className="mb-2 text-xl font-semibold text-slate-900">Post or find items</h2>
              <p className="text-slate-600">List the things you want to trade or browse posts from people nearby.</p>
            </div>
            <div className="rounded-2xl border border-green-100 bg-green-50 p-6">
              <div className="mb-4 text-3xl">3</div>
              <h2 className="mb-2 text-xl font-semibold text-slate-900">Chat and complete</h2>
              <p className="text-slate-600">Negotiate details, meet safely, and confirm the trade once both sides agree.</p>
            </div>
          </div>

          <div className="mt-10 rounded-2xl bg-slate-900 p-6 text-white">
            <h2 className="mb-3 text-2xl font-semibold">Why people love it</h2>
            <ul className="space-y-2 text-slate-200">
              <li>• Simple item discovery and matching</li>
              <li>• Faster local trading without extra hassles</li>
              <li>• A community-first platform built around trust</li>
              <li>• Flexible exchanges that include barter and finder opportunities</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
