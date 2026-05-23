export default function StatsCard({
  title,
  value,
}: {
  title: string
  value: string
}) {
  return (
    <div className="rounded-[1.6rem] border border-black/5 bg-white p-5 text-black shadow-sm transition-all duration-300 hover:scale-[1.01] md:rounded-3xl md:border-white/10 md:bg-white/5 md:p-6 md:text-white md:backdrop-blur-xl">
      <p className="mb-2 text-sm text-neutral-500 md:mb-3 md:text-base md:text-gray-400">
        {title}
      </p>

      <h2 className="text-3xl font-black md:text-4xl md:font-bold">
        {value}
      </h2>
    </div>
  )
}
