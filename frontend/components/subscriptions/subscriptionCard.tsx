import { Bell, Star } from 'lucide-react'

export default function SubscriptionCard({
  name,
  price,
  category,
}: {
  name: string
  price: string
  category: string
}) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl hover:translate-y-[-4px] transition-all duration-300">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-2xl font-semibold mb-1">
            {name}
          </h3>

          <p className="text-gray-400">
            {category}
          </p>
        </div>

        <button className="text-yellow-400 hover:scale-110 transition">
          <Star />
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm">
            Monthly payment
          </p>

          <h4 className="text-3xl font-bold mt-1">
            {price}
          </h4>
        </div>

        <button className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 transition">
          <Bell size={18} />
        </button>
      </div>
    </div>
  )
}