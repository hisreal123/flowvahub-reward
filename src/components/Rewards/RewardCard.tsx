import type { ReactNode } from 'react'

interface RewardCardProps {
  title: string
  icon?: ReactNode
  children: ReactNode
  headerBgColor?: string
  className?: string
}

export function RewardCard({
  title,
  icon,
  children,
  headerBgColor = 'bg-[#eef2ff]',
  className = '',
}: RewardCardProps) {
  return (
    <div
      className={`h-[350px] shadow-[0_5px_15px_rgba(0,_0,_0,_0.05)] rounded-[16px] hover:translate-y-[-5px] hover:shadow-[0_10px_25px_rgba(0,_0,_0,_0.1)] border border-[#f3f4f6] overflow-hidden transition-shadow duration-200 ${className}`}
    >
      <div
        className={`p-3 relative border border-b-[#f3f4f6] ${headerBgColor} border-t-0 border-r-0 border-l-0 relative`}
      >
        <h3 className="text-base font-semibold flex items-center gap-2 text-gray-700 relative">
          {icon && <span>{icon}</span>}
          {title}
        </h3>
      </div>
      <div className="p-3 relative">{children}</div>
    </div>
  )
}

