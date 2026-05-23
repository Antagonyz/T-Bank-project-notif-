export default function Button({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <button className="bg-yellow-400 text-black px-6 py-3 rounded-2xl font-semibold hover:scale-[1.02] transition-all duration-200">
      {children}
    </button>
  )
}