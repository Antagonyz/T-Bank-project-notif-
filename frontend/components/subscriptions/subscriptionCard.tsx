import { Bell, BellOff, EyeOff, Star, Trash2 } from 'lucide-react'
import type { Subscription } from '@/services/subscriptions'

const statusLabels: Record<string, string> = {
  active: 'Активна',
  rarely_used: 'Возможно не используется',
  price_increased: 'Цена выросла',
  trial: 'Пробный период',
}

const statusStyles: Record<string, string> = {
  active: 'bg-emerald-400/10 text-emerald-300 border-emerald-400/20',
  rarely_used: 'bg-orange-400/10 text-orange-300 border-orange-400/20',
  price_increased: 'bg-red-400/10 text-red-300 border-red-400/20',
  trial: 'bg-blue-400/10 text-blue-300 border-blue-400/20',
}

export default function SubscriptionCard({
  subscription,
  onToggleImportant,
  onToggleNotifications,
  onHide,
  onFalsePositive,
}: {
  subscription: Subscription
  onToggleImportant?: (id: number) => void
  onToggleNotifications?: (id: number) => void
  onHide?: (id: number) => void
  onFalsePositive?: (id: number) => void
}) {
  const price = Number(subscription.price)
  const previousPrice = subscription.previous_price ? Number(subscription.previous_price) : null
  const billingDate = subscription.billing_date
    ? new Date(subscription.billing_date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })
    : 'Не указана'

  return (
    <div className="rounded-[2rem] border border-black/5 bg-white p-5 text-black shadow-sm backdrop-blur-xl transition-all duration-300 hover:translate-y-[-2px] md:rounded-3xl md:border-white/10 md:bg-white/5 md:p-6 md:text-white md:hover:translate-y-[-4px]">
      <div className="flex justify-between items-start mb-5">
        <div>
          <h3 className="text-2xl font-semibold mb-1">
            {subscription.name}
          </h3>

          <p className="text-neutral-500 md:text-gray-400">
            {subscription.category}
          </p>
        </div>

        <button
          onClick={() => onToggleImportant?.(subscription.id)}
          className={`${subscription.is_important ? 'text-yellow-400' : 'text-white/30'} hover:scale-110 transition`}
          title="Отметить как важную"
        >
          <Star fill={subscription.is_important ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className={`inline-flex mb-5 px-3 py-1 rounded-full border text-sm ${statusStyles[subscription.status] || statusStyles.active}`}>
        {statusLabels[subscription.status] || subscription.status}
      </div>

      <div className="flex items-end justify-between mb-5">
        <div>
          <p className="text-neutral-500 text-sm md:text-gray-400">
            Ежемесячное списание
          </p>

          <h4 className="text-3xl font-bold mt-1">
            {price.toLocaleString('ru-RU')} {subscription.currency}
          </h4>

          {previousPrice && previousPrice < price && (
            <p className="text-sm text-red-300 mt-1">
              Раньше: {previousPrice.toLocaleString('ru-RU')} {subscription.currency}
            </p>
          )}
        </div>

        <button
          onClick={() => onToggleNotifications?.(subscription.id)}
          className="rounded-2xl bg-black/5 p-3 transition hover:bg-black/10 md:bg-white/10 md:hover:bg-white/20"
          title="Включить/выключить уведомления"
        >
          {subscription.notifications_enabled ? <Bell size={18} /> : <BellOff size={18} />}
        </button>
      </div>

      <div className="space-y-3 text-sm text-gray-300 border-t border-white/10 pt-4">
        <div className="flex justify-between gap-4">
          <span className="text-neutral-500 md:text-gray-500">Следующий платёж</span>
          <span>{billingDate}</span>
        </div>

        <div className="flex justify-between gap-4">
          <span className="text-neutral-500 md:text-gray-500">Уверенность</span>
          <span>{subscription.confidence}%</span>
        </div>

        {subscription.explanation && (
          <p className="leading-relaxed text-neutral-500 md:text-gray-400">
            {subscription.explanation}
          </p>
        )}
      </div>

      <div className="flex gap-2 mt-5">
        <button
          onClick={() => onFalsePositive?.(subscription.id)}
          className="flex-1 rounded-2xl bg-black/5 px-3 py-2 text-sm text-neutral-600 transition hover:bg-black/10 md:bg-white/5 md:text-gray-300 md:hover:bg-white/10"
        >
          Ошибка
        </button>

        <button
          onClick={() => onHide?.(subscription.id)}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-black/5 px-3 py-2 text-sm text-neutral-600 transition hover:bg-black/10 md:bg-white/5 md:text-gray-300 md:hover:bg-white/10"
        >
          <EyeOff size={14} /> Скрыть
        </button>
      </div>
    </div>
  )
}
