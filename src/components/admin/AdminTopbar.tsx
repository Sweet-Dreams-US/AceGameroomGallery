"use client"

import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"

export default function AdminTopbar() {
  const router = useRouter()

  const handleLogout = () => {
    // Stub: will call supabase.auth.signOut() when connected
    router.push("/admin/login")
  }

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 lg:px-8">
      <h1 className="text-lg font-semibold text-gray-800 lg:ml-0 ml-12">
        Admin Dashboard
      </h1>
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-ace-red transition-colors"
      >
        <LogOut className="w-4 h-4" />
        Logout
      </button>
    </header>
  )
}
