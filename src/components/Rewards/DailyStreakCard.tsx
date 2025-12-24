import { RewardCard } from './RewardCard'
import { Button } from '../ui/button'
import { CalendarIcon } from './icons/CalendarIcon'
import { ZapIcon } from './icons/ZapIcon'

interface DailyStreakCardProps {
  streakDays: number
  isClaimed: boolean
  isLoading: boolean
  onClaim: () => void
}

export function DailyStreakCard({ streakDays, isClaimed, isLoading, onClaim }: DailyStreakCardProps) {
  const currentDay = new Date().getDay()
  const adjustedCurrentDay = currentDay === 0 ? 6 : currentDay - 1
  const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

  return (
    <RewardCard title="Daily Streak" icon={<CalendarIcon />}>
      <div>
        <div className="items-center mt-6 mx-4">
          <div className="font-extrabold text-[36px] text-rewards-primary mb-2">
            {streakDays} {streakDays === 1 ? 'Day' : 'Days'}
          </div>
        </div>

        <div className="mt-6">
          <div className="flex mt-4 space-x-2 justify-center mb-4">
            {daysOfWeek.map((day, index) => {
              const isCurrentDay = index === adjustedCurrentDay
              return (
                <div
                  key={index}
                  className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-200 bg-gray-200 text-gray-500 ${
                    isCurrentDay ? 'ring-2 ring-rewards-primary ring-offset-2' : ''
                  }`}
                >
                  {day}
                </div>
              )
            })}
          </div>
          <p className="text-sm text-gray-600 text-center mt-3">Check in daily to earn +5 points</p>
          <Button
            onClick={onClaim}
            disabled={isClaimed || isLoading}
            variant="outline"
            className={`mt-3 w-full rounded-full font-semibold flex items-center justify-center gap-2 transition-all duration-200 ${
              isClaimed || isLoading
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-rewards-primary hover:bg-[#7a0fe0] text-white cursor-pointer'
            }`}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Claiming...
              </>
            ) : isClaimed ? (
              <>
                <ZapIcon />
                Claimed Today
              </>
            ) : (
              <>
                <ZapIcon />
                Claim Daily Reward
              </>
            )}
          </Button>
        </div>
      </div>
    </RewardCard>
  )
}

