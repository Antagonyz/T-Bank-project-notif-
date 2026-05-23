import { useEffect, useState } from 'react'
import Layout from '@/components/layout/layout'
import SubscriptionCard from '@/components/subscriptions/subscriptionCard'
import Button from '@/components/ui/button'
import NotificationDemo from '@/components/notifications/notificationDemo'
import {
  createSubscription,
  getSubscriptions,
  hideSubscription,
  markFalsePositive,
  toggleImportant,
  toggleNotifications,
  type Subscription,
} from '@/services/subscriptions'

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadData = async () => {
    try {
      setError('')
      setSubscriptions(await getSubscriptions())
    } catch {
      setError('Не удалось загрузить подписки из Laravel API')
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

  const addDemoSubscription = async () => {
    await updateAction(() => createSubscription({
      name: 'Новая подписка',
      category: 'Добавлено вручную',
      price: 399,
      currency: '₽',
      billing_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
      explanation: 'Добавлено вручную из интерфейса MVP.',
      recommendation: 'Проверьте, нужна ли эта подписка каждый месяц.',
    }))
  }

  return (
    <Layout>
      <div className="mb-6 rounded-[2rem] bg-white p-5 text-black shadow-sm md:mb-10 md:bg-transparent md:p-0 md:text-white md:shadow-none">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-black leading-tight md:text-5xl">
              Витрина подписок
            </h1>

            <p className="mt-3 text-base text-neutral-500 md:text-lg md:text-gray-400">
              Найденные регулярные списания, статусы, даты следующих платежей и управление уведомлениями.
            </p>
          </div>

          <Button onClick={addDemoSubscription} className="w-full md:w-auto">
            Добавить вручную
          </Button>
        </div>
      </div>

      {error && (
        <div className="mb-8 rounded-3xl border border-red-400/20 bg-red-400/10 p-5 text-red-200">
          {error}
        </div>
      )}

      {!loading && <div className="mb-8"><NotificationDemo subscriptions={subscriptions} /></div>}

      {loading ? (
        <div className="text-neutral-500 md:text-gray-400">Загружаем данные...</div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 md:gap-6">
          {subscriptions.map((subscription) => (
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
    </Layout>
  )
}
