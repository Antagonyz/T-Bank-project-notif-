import Layout from '@/components/layout/layout'
import SubscriptionCard from '@/components/subscriptions/subscriptionCard'
import Button from '@/components/ui/button'

export default function SubscriptionsPage() {
  return (
    <Layout>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-5xl font-bold mb-3">
            Subscriptions
          </h1>

          <p className="text-gray-400 text-lg">
            Track and manage recurring payments
          </p>
        </div>

        <Button>
          Add New
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <SubscriptionCard
          name="Spotify"
          category="Music"
          price="€9.99"
        />

        <SubscriptionCard
          name="Netflix"
          category="Streaming"
          price="€15.99"
        />

        <SubscriptionCard
          name="Apple Music"
          category="Music"
          price="€7.99"
        />

        <SubscriptionCard
          name="YouTube Premium"
          category="Video"
          price="€11.99"
        />

        <SubscriptionCard
          name="Telegram Premium"
          category="Social"
          price="€4.99"
        />

        <SubscriptionCard
          name="Notion"
          category="Productivity"
          price="€12.99"
        />
      </div>
    </Layout>
  )
}