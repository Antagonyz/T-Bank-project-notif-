import Link from 'next/link'
import {
  LayoutDashboard,
  CreditCard,
  BarChart3,
  Settings,
} from 'lucide-react'

export default function Sidebar() {
  return (
    <aside className="w-72 border-r border-white/10 bg-white/5 backdrop-blur-xl p-6 hidden md:block">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-yellow-400">
          T-Subscriptions
        </h1>

        <p className="text-gray-400 mt-2 text-sm">
          Smart subscription manager
        </p>
      </div>

      <nav className="space-y-4">
        <SidebarItem
          href="/"
          icon={<LayoutDashboard size={20} />}
          label="Dashboard"
        />

        <SidebarItem
          href="/subscriptions"
          icon={<CreditCard size={20} />}
          label="Subscriptions"
        />

        <SidebarItem
          href="/analytics"
          icon={<BarChart3 size={20} />}
          label="Analytics"
        />

        <SidebarItem
          href="#"
          icon={<Settings size={20} />}
          label="Settings"
        />
      </nav>
    </aside>
  )
}

function SidebarItem({
  href,
  icon,
  label,
}: {
  href: string
  icon: React.ReactNode
  label: string
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-200 border border-transparent hover:border-white/10"
    >
      {icon}
      <span>{label}</span>
    </Link>
  )
}