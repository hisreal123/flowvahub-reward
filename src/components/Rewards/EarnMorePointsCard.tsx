import type { ReactNode } from 'react'

interface EarnMorePointsCardProps {
  title: string
  subTitle?: string
  icon?: ReactNode
  children: ReactNode
  className?: string
}

export function EarnMorePointsCard({
  title,
  subTitle,
  icon,
  children,
  className = '',
}: EarnMorePointsCardProps) {
  return (
    <div
      className={`transition-all hover:border-[#9013fe] hover:translate-y-[-5px] hover:shadow-[0_10px_25px_rgba(0,_0,_0,_0.1)] ease-linear duration-200 border border-[#e5e7eb] rounded-xl overflow-hidden ${className}`}
    >
      <div
        className={`p-[1rem] border border-b-[#f3f4f6] border-t-0 border-r-0 border-l-0 bg-white flex items-center gap-[0.75rem]`}
      >
        <h3 className="text-base font-semibold flex items-center gap-2 text-gray-700 relative">
          <span className='w-[40px] h-[40px] rounded-[10px] flex items-center justify-center flex-shrink-0 bg-[rgba(228,144,230,0.1)] text-[#9013fe]'>{icon && <span>{icon}</span>}</span>
          {subTitle ? (
            <div className='flex flex-col items-start'>
              <span className='text-md'>{title}</span>
              <p className="text-sm text-gray-500">{subTitle}</p>
            </div>
          ) : (
            <span>{title}</span>
          )}
        </h3>
      </div>
      <div className={`p-3 relative bg-gray-50`}>{children}</div>
    </div>
  )
}

