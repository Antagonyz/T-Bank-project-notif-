import { useEffect, useState } from 'react'
import Layout from '@/components/layout/layout'
import Card from '@/components/ui/card'
import { getAnalyticsSummary, type AnalyticsSummary } from '@/services/subscriptions'

export default function AnalyticsPage() {
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    getAnalyticsSummary()
      .then(setSummary)
      .catch(() => setError('Не удалось загрузить аналитику из Laravel API'))
  }, [])

  return (
    <Layout>
      <div className="mb-6 rounded-[2rem] bg-white p-5 text-black shadow-sm md:mb-10 md:bg-transparent md:p-0 md:text-white md:shadow-none">
        <h1 className="text-4xl font-black leading-tight md:text-5xl">
          Аналитика и рекомендации
        </h1>

        <p className="mt-3 text-base text-neutral-500 md:text-lg md:text-gray-400">
          Простые объяснимые инсайты: сколько уходит на подписки, что дороже всего и где можно сэкономить.
        </p>
      </div>

      {error && (
        <div className="mb-8 rounded-3xl border border-red-400/20 bg-red-400/10 p-5 text-red-200">
          {error}
        </div>
      )}

      <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-2 md:gap-6">
        <Card>
          <h2 className="text-2xl font-bold mb-6">
            Расходы в месяц
          </h2>

          <div className="h-64 rounded-2xl bg-gradient-to-br from-yellow-400/20 to-transparent border border-white/10 flex flex-col items-center justify-center">
            <div className="text-4xl font-black text-yellow-500 md:text-6xl md:text-yellow-300">
              {Math.round(summary?.monthly_total || 0).toLocaleString('ru-RU')} ₽
            </div>
            <div className="text-gray-400 mt-3">
              {summary?.subscriptions_count || 0} активных подписок найдено
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-2xl font-bold mb-6">
            Категории
          </h2>

          <div className="space-y-4">
            {(summary?.categories || []).map((item) => (
              <AnalyticsRow
                key={item.category}
                category={`${item.category} · ${item.count}`}
                value={`${Math.round(item.total).toLocaleString('ru-RU')} ₽`}
              />
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <h2 className="text-3xl font-bold mb-6 text-yellow-400">
          Рекомендации
        </h2>

        <div className="space-y-4">
          {(summary?.insights || []).map((insight) => (
            <Insight
              key={insight.title}
              type={insight.type}
              title={insight.title}
              description={insight.description}
            />
          ))}
        </div>
      </Card>
    </Layout>
  )
}

function AnalyticsRow({
  category,
  value,
}: {
  category: string
  value: string
}) {
  return (
    <div className="flex items-center justify-between bg-white/5 p-4 rounded-2xl">
      <span>{category}</span>
      <span className="font-bold">{value}</span>
    </div>
  )
}

function Insight({
  title,
  description,
  type,
}: {
  title: string
  description: string
  type: 'warning' | 'success' | 'info'
}) {
  const styles = {
    warning: 'border-yellow-400/30 bg-yellow-400/10',
    success: 'border-green-400/30 bg-green-400/10',
    info: 'border-blue-400/30 bg-blue-400/10',
  }

  return (
    <div
      className={`
        rounded-3xl
        border
        p-6
        transition-all
        duration-300
        hover:scale-[1.01]
        ${styles[type]}
      `}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold mb-2">
            {title}
          </h3>

          <p className="text-gray-300 leading-relaxed">
            {description}
          </p>
        </div>

        <div
          className={`
            w-3 h-3 rounded-full mt-2
            ${
              type === 'warning'
                ? 'bg-yellow-400'
                : type === 'success'
                ? 'bg-green-400'
                : 'bg-blue-400'
            }
          `}
        />
      </div>
    </div>
  )
}
