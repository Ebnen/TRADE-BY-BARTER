import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
            Trade 🤝 Barter
          </Link>
          <Link href="/signup">
            <Button className="bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600">
              Create Account
            </Button>
          </Link>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-xl">
          <h1 className="mb-4 text-4xl font-bold text-slate-900">Terms of Service</h1>
          <p className="mb-8 text-lg text-slate-600">By using Trade 🤝 Barter, you agree to use the platform responsibly and respectfully.</p>

          <div className="space-y-4 text-slate-600">
            <p>Users must provide accurate information and use the platform for lawful, honest trade activities.</p>
            <p>All trades are conducted between users, and the platform is a facilitator for discovery and communication.</p>
            <p>Misrepresentation, fraud, or unsafe behavior may result in restrictions or account action.</p>
            <p>We reserve the right to update these terms as the platform evolves.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
