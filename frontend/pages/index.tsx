import Layout from '@/components/layout/layout'
import StatsCard from '@/components/dashboard/statsCard'
import SubscriptionCard from '@/components/subscriptions/subscriptionCard'
import Button from '@/components/ui/button'
export default function HomePage(){
    return (
    <Layout>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-5xl font-bold mb-3">
            Dashboard
          </h1>

          <p className="text-gray-400 text-lg">
            Manage all your subscriptions in one place
          </p>
        </div>

        <Button>
          Add Subscription
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatsCard
          title="Monthly Spend"
          value="€84.99"
        />

        <StatsCard
          title="Active Subscriptions"
          value="12"
        />

        <StatsCard
          title="Potential Savings"
          value="€27"
        />
      </div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-6">
          Popular Subscriptions
        </h2>

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
            name="Telegram Premium"
            category="Social"
            price="€4.99"
          />
        </div>
      </div>

      <div className="bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-3xl p-8 text-black mt-12">
        <h2 className="text-3xl font-bold mb-4">
          AI Recommendation
        </h2>

        <p className="text-lg mb-6">
          You can save €27/month by disabling unused subscriptions.
        </p>

        <button className="bg-black text-white px-6 py-3 rounded-2xl hover:bg-neutral-800 transition">
          View Insights
        </button>
      </div>
    </Layout>
    )
}
       