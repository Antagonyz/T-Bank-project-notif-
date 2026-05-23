import { useEffect, useState } from 'react'
import Link from 'next/link'
import Layout from '@/components/layout/layout'
import StatsCard from '@/components/dashboard/statsCard'
import SubscriptionCard from '@/components/subscriptions/subscriptionCard'
import Button from '@/components/ui/button'
import NotificationDemo from '@/components/notifications/notificationDemo'
import {
  getAnalyticsSummary,
  getSubscriptions,
  toggleImportant,
  toggleNotifications,
  hideSubscription,
  markFalsePositive,
  type AnalyticsSummary,
  type Subscription,
} from '@/services/subscriptions'

export default function HomePage(){
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadData = async () => {
    try {
      setError('')
      const [subs, analytics] = await Promise.all([
        getSubscriptions(),
        getAnalyticsSummary(),
      ])
      setSubscriptions(subs)
      setSummary(analytics)
    } catch {
      setError('Не удалось подключиться к Laravel API. Проверь backend и NEXT_PUBLIC_API_URL')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const updateAction = async (action: () => Promise<unknown>) => {
    await action()
    await loadData()
  }

  return (
    <Layout>
      <div className="mb-6 rounded-[2rem] bg-white p-5 text-black shadow-sm md:mb-10 md:bg-transparent md:p-0 md:text-white md:shadow-none">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-3 inline-flex rounded-full bg-yellow-100 px-3 py-1 text-xs font-bold text-black md:bg-yellow-400">
              T-Банк · контроль подписок
            </div>

            <h1 className="text-4xl font-black leading-tight md:text-5xl">
              Управление подписками
            </h1>

            <p className="mt-3 text-base text-neutral-500 md:text-lg md:text-gray-400">
              Находим регулярные списания, предупреждаем о платежах и показываем, где можно сэкономить.
            </p>
          </div>

          <Link href="/subscriptions" className="w-full md:w-auto">
            <Button className="w-full md:w-auto">
              Все подписки
            </Button>
          </Link>
        </div>
      </div>

      {error && (
        <div className="mb-8 rounded-3xl border border-red-400/20 bg-red-400/10 p-5 text-red-200">
          {error}
        </div>
      )}

      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3 md:mb-10 md:gap-6">
        <StatsCard
          title="Расходы в месяц"
          value={`${Math.round(summary?.monthly_total || 0).toLocaleString('ru-RU')} ₽`}
        />

        <StatsCard
          title="Найдено подписок"
          value={`${summary?.subscriptions_count ?? subscriptions.length}`}
        />

        <StatsCard
          title="Можно сэкономить"
          value={`${Math.round(summary?.potential_savings || 0).toLocaleString('ru-RU')} ₽`}
        />
      </div>

      <NotificationDemo subscriptions={subscriptions} />

      <div className="mb-8 mt-8">
        <h2 className="mb-4 text-2xl font-black md:mb-6 md:text-3xl">
          Ближайшие и важные подписки
        </h2>

        {loading ? (
          <div className="text-gray-400">Загружаем данные из backend...</div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 md:gap-6">
            {subscriptions.slice(0, 3).map((subscription) => (
              <SubscriptionCard
                key={subscription.id}
                subscription={subscription}
                onToggleImportant={(id) => updateAction(() => toggleImportant(id))}
                onToggleNotifications={(id) => updateAction(() => toggleNotifications(id))}
                onHide={(id) => updateAction(() => hideSubscription(id))}
                onFalsePositive={(id) => updateAction(() => markFalsePositive(id))}
              />
            ))}
          </div>
        )}
      </div>

      <div className="mt-8 rounded-[2rem] bg-gradient-to-r from-yellow-400 to-yellow-300 p-6 text-black md:mt-12 md:p-8">
        <h2 className="text-3xl font-bold mb-4">
          Финансовый инсайт
        </h2>

        <p className="text-lg mb-6">
          {summary?.insights?.[2]?.description || 'Подключи backend, чтобы увидеть рекомендации по экономии.'}
        </p>

        <Link href="/analytics">
          <button className="bg-black text-white px-6 py-3 rounded-2xl hover:bg-neutral-800 transition">
            Смотреть аналитику
          </button>
        </Link>
      </div>
    </Layout>
  )
}
