export default function StatsCard({
  title,
  value,
}: {
  title: string
  value: string
}) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl hover:scale-[1.02] transition-all duration-300">
      <p className="text-gray-400 mb-3">
        {title}
      </p>

      <h2 className="text-4xl font-bold">
        {value}
      </h2>
    </div>
  )
}