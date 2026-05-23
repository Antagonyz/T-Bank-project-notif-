import { useMemo, useState } from 'react'
import { Bell, TrendingUp, CalendarClock, ShieldAlert, WalletCards } from 'lucide-react'
import type { Subscription } from '@/services/subscriptions'

const dayMs = 24 * 60 * 60 * 1000

export default function NotificationDemo({ subscriptions }: { subscriptions: Subscription[] }) {
  const [selected, setSelected] = useState(0)

  const notifications = useMemo(() => {
    const enabled = subscriptions.filter((item) => item.notifications_enabled)
    const sorted = [...enabled].sort((a, b) => {
      const aDate = a.billing_date ? new Date(a.billing_date).getTime() : Number.MAX_SAFE_INTEGER
      const bDate = b.billing_date ? new Date(b.billing_date).getTime() : Number.MAX_SAFE_INTEGER
      return aDate - bDate
    })

    const items = sorted.slice(0, 4).map((sub) => {
      const diff = sub.billing_date
        ? Math.max(0, Math.ceil((new Date(sub.billing_date).getTime() - Date.now()) / dayMs))
        : null

      if (sub.status === 'price_increased') {
        return {
          icon: <TrendingUp size={18} />,
          title: 'Цена подписки выросла',
          text: `${sub.name}: ${Number(sub.previous_price || 0).toLocaleString('ru-RU')} ₽ → ${Number(sub.price).toLocaleString('ru-RU')} ₽`,
          tone: 'danger',
        }
      }

      if (sub.status === 'trial') {
        return {
          icon: <ShieldAlert size={18} />,
          title: 'Скоро первое платное списание',
          text: `${sub.name}: ${Number(sub.price).toLocaleString('ru-RU')} ₽ после пробного периода`,
          tone: 'warning',
        }
      }

      if (sub.status === 'rarely_used') {
        return {
          icon: <WalletCards size={18} />,
          title: 'Возможно лишняя подписка',
          text: `${sub.name}: сервис выглядит редко используемым. Можно сэкономить ${Number(sub.price).toLocaleString('ru-RU')} ₽`,
          tone: 'warning',
        }
      }

      return {
        icon: <CalendarClock size={18} />,
        title: 'Ближайшее списание',
        text: `${diff !== null ? `Через ${diff} дн. ` : ''}спишется ${Number(sub.price).toLocaleString('ru-RU')} ₽ за ${sub.name}`,
        tone: 'info',
      }
    })

    return items.length ? items : [
      {
        icon: <Bell size={18} />,
        title: 'Уведомления готовы',
        text: 'Когда backend вернёт подписки, здесь появятся реальные предупреждения о платежах.',
        tone: 'info',
      },
    ]
  }, [subscriptions])

  const active = notifications[selected] || notifications[0]

  return (
    <section className="rounded-[2rem] bg-black p-4 text-white shadow-2xl shadow-black/10 md:bg-white/5 md:p-6 md:shadow-none">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm text-yellow-300">Демонстрация push</p>
          <h2 className="text-2xl font-bold">Уведомления</h2>
        </div>
        <div className="rounded-full bg-yellow-400 px-3 py-1 text-xs font-bold text-black">
          Live
        </div>
      </div>

      <div className="mx-auto max-w-sm rounded-[2.5rem] border border-white/10 bg-[#111318] p-3 shadow-2xl">
        <div className="rounded-[2rem] bg-[#F5F6F8] p-4 text-black">
          <div className="mb-4 flex items-center justify-between text-xs text-neutral-500">
            <span>Сейчас</span>
            <span>T-Банк</span>
          </div>

          <div className={`rounded-3xl border p-4 ${toneStyle(active.tone)}`}>
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-yellow-400 text-black">
                {active.icon}
              </div>
              <div>
                <div className="text-sm font-bold">{active.title}</div>
                <div className="text-xs text-neutral-500">Финансовый ассистент</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-neutral-700">{active.text}</p>
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {notifications.map((item, index) => (
          <button
            key={`${item.title}-${index}`}
            onClick={() => setSelected(index)}
            className={`rounded-2xl px-3 py-2 text-left text-xs transition ${
              selected === index
                ? 'bg-yellow-400 text-black'
                : 'bg-white/10 text-white/70 hover:bg-white/15'
            }`}
          >
            {item.title}
          </button>
        ))}
      </div>
    </section>
  )
}

function toneStyle(tone: string) {
  if (tone === 'danger') return 'border-red-200 bg-red-50'
  if (tone === 'warning') return 'border-yellow-200 bg-yellow-50'
  return 'border-blue-100 bg-white'
}
