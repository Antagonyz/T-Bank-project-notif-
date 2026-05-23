import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  LayoutDashboard,
  CreditCard,
  BarChart3,
  Settings,
} from 'lucide-react'

const items = [
  { href: '/', icon: <LayoutDashboard size={20} />, label: 'Главная' },
  { href: '/subscriptions', icon: <CreditCard size={20} />, label: 'Подписки' },
  { href: '/analytics', icon: <BarChart3 size={20} />, label: 'Аналитика' },
]

export default function Sidebar() {
  const router = useRouter()

  return (
    <>
      <aside className="hidden w-72 border-r border-white/10 bg-white/5 p-6 backdrop-blur-xl md:block">
        <div className="mb-10">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-400 text-2xl font-black text-black shadow-lg shadow-yellow-400/20">
            T
          </div>

          <h1 className="text-3xl font-bold text-white">
            T-Подписки
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Контроль регулярных списаний
          </p>
        </div>

        <nav className="space-y-3">
          {items.map((item) => (
            <SidebarItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.label}
              active={router.pathname === item.href}
            />
          ))}

          <div className="flex items-center gap-3 rounded-2xl border border-transparent p-4 text-white/40">
            <Settings size={20} />
            <span>Настройки</span>
          </div>
        </nav>
      </aside>

      <header className="sticky top-0 z-30 border-b border-black/5 bg-white/80 px-4 py-3 backdrop-blur-xl md:hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-yellow-400 text-xl font-black text-black">
              T
            </div>
            <div>
              <div className="font-bold">T-Подписки</div>
              <div className="text-xs text-neutral-500">MVP для мобильного банка</div>
            </div>
          </div>
          <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            API online
          </div>
        </div>
      </header>

      <nav className="fixed bottom-0 left-0 right-0 z-40 grid grid-cols-3 border-t border-black/10 bg-white/95 px-2 pb-3 pt-2 shadow-2xl backdrop-blur-xl md:hidden">
        {items.map((item) => {
          const active = router.pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 rounded-2xl px-3 py-2 text-xs font-medium transition ${
                active ? 'bg-black text-yellow-300' : 'text-neutral-500'
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          )
        })}
      </nav>
    </>
  )
}

function SidebarItem({
  href,
  icon,
  label,
  active,
}: {
  href: string
  icon: React.ReactNode
  label: string
  active?: boolean
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-2xl border p-4 transition-all duration-200 ${
        active
          ? 'border-yellow-400/30 bg-yellow-400 text-black shadow-lg shadow-yellow-400/10'
          : 'border-transparent bg-white/5 text-white hover:border-white/10 hover:bg-white/10'
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  )
}
