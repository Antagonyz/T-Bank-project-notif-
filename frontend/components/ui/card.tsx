export default function Card({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="rounded-[2rem] border border-black/5 bg-white p-5 text-black shadow-sm backdrop-blur-xl md:rounded-3xl md:border-white/10 md:bg-white/5 md:p-6 md:text-white">
      {children}
    </div>
  )
}
