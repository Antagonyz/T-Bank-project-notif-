import Layout from '@/components/layout/layout'
import Card from '@/components/ui/card'

export default function AnalyticsPage() {
  return (
    <Layout>
      <div className="mb-10">
        <h1 className="text-5xl font-bold mb-3">
          Analytics
        </h1>

        <p className="text-gray-400 text-lg">
          Spending insights and recommendations
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <h2 className="text-2xl font-bold mb-6">
            Monthly Spending
          </h2>

          <div className="h-64 rounded-2xl bg-gradient-to-br from-yellow-400/20 to-transparent border border-white/10 flex items-center justify-center text-gray-400">
            Chart Placeholder
          </div>
        </Card>

        <Card>
          <h2 className="text-2xl font-bold mb-6">
            Category Breakdown
          </h2>

          <div className="space-y-4">
            <AnalyticsRow
              category="Streaming"
              value="€34"
            />

            <AnalyticsRow
              category="Music"
              value="€17"
            />

            <AnalyticsRow
              category="Productivity"
              value="€23"
            />

            <AnalyticsRow
              category="Social"
              value="€10"
            />
          </div>
        </Card>
      </div>

      <Card>
        <h2 className="text-3xl font-bold mb-6 text-yellow-400">
          AI Insights
        </h2>

        <div className="space-y-4">
        <Insight
            type="warning"
            title="Unused subscription detected"
            description="Spotify usage dropped by 70% this month. Consider disabling Premium."
        />

        <Insight
            type="info"
            title="Overlapping services"
            description="You currently pay for Netflix, YouTube Premium and Apple TV+."
        />

        <Insight
            type="success"
            title="Potential savings"
            description="Switching to a family plan may save up to €12/month."
        />
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