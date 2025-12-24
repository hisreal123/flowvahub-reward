import { RewardCard } from './RewardCard'
import { AwardIcon } from './icons/AwardIcon'
import { PointsAnimation } from './icons/PointsAnimation'

interface PointBalanceCardProps {
  totalPoints: number
}

export function PointBalanceCard({ totalPoints }: PointBalanceCardProps) {
  const progressPercentage = Math.min((totalPoints / 5000) * 100, 100)

  return (
    <RewardCard title="Point Balance" icon={<AwardIcon />}>
      <div className="flex items-center justify-between">
        <div className="font-extrabold text-[36px] text-rewards-primary my-2.5">{totalPoints}</div>
        <div className="bg-transparent m-0 outline-none overflow-hidden h-[100px] w-[100px] flex items-center justify-center">
          <PointsAnimation />
        </div>
      </div>

      <div className="mt-10">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-600">
            Progress to <span className="font-medium">$5 Gift Card</span>
          </span>
          <span className="font-medium">{totalPoints}/5000</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-br from-rewards-primary to-[#FF9FF5] rounded-full transition-[width] duration-500 ease-in-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-2">🚀 Just getting started — keep earning points!</p>
      </div>
    </RewardCard>
  )
}

