import type { ButtonHTMLAttributes, ReactNode } from 'react'

export default function Button({
  children,
  className = '',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
}) {
  return (
    <button
      {...props}
      className={`bg-yellow-400 text-black px-6 py-3 rounded-2xl font-semibold hover:scale-[1.02] transition-all duration-200 ${className}`}
    >
      {children}
    </button>
  )
}
