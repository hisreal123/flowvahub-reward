import { useState, useMemo } from 'react'
import { Button } from '../ui/button'
import { EarnMorePointsCard } from './EarnMorePointsCard'
import { Share2, Star } from 'lucide-react'
import { SpotlightCard } from './SpotlightCard'
import { useAuth } from '../../context/AuthContext'
import { useUserPoints } from '../../hooks/useUserPoints'
import { useDailyClaim } from '../../hooks/useDailyClaim'
import { useReferrals } from '../../hooks/useReferrals'
import { useUserProfile } from '../../hooks/useUserProfile'
import { PointBalanceCard } from './PointBalanceCard'
import { DailyStreakCard } from './DailyStreakCard'
import { ReferralSection } from './ReferralSection'
import { ShareStackDialog } from './ShareStackDialog'

const BASE_URL = 'https://flowvahub-reward.vercel.app'

const EarnRewards = () => {
  const { session } = useAuth()
  const { totalPoints, streakDays, refetch } = useUserPoints(session)
  const { isClaimed, isLoading, claimDailyReward } = useDailyClaim(session, refetch)
  const { referralCount, pointsEarned } = useReferrals(session)
  const { profile, loading: profileLoading } = useUserProfile(session)
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false)

  const referralLink = useMemo(() => {
    if (!profile?.referral_code) {
      return `${BASE_URL}/signup`
    }
    return `${BASE_URL}/signup/?ref=${profile.referral_code}`
  }, [profile])

  return (
    <>
      <main>
        <div>
          <h2 className="text-lg md:text-2xl my-3 text-black border-l-4 border-l-rewards-primary pl-3 font-semibold">
            Your Rewards Journey
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PointBalanceCard totalPoints={totalPoints} />
          <DailyStreakCard
            streakDays={streakDays}
            isClaimed={isClaimed}
            isLoading={isLoading}
            onClaim={claimDailyReward}
          />
          <SpotlightCard />
        </div>
      </main>

      <main className="mt-6">
        <div>
          <h2 className="text-lg md:text-2xl my-3 text-black border-l-4 border-l-rewards-primary pl-3 font-semibold">
            Earn More Points
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <EarnMorePointsCard
              title="Refer and win 10,000 points!"
              icon={<Star className="text-rewards-primary" size={24} />}
            >
              <div className="p-4">
                <p className="font-medium text-sm">
                  Invite 3 friends by Nov 20 and earn a chance to be one of 5 winners of{' '}
                  <span className="text-rewards-primary">10,000 points</span>. Friends must complete onboarding to
                  qualify.
                </p>
              </div>
            </EarnMorePointsCard>

            <EarnMorePointsCard
              title="Share Your Stack!"
              subTitle="Earn +25 pts"
              icon={<Share2 className="text-rewards-primary" size={24} />}
            >
              <div className="p-4 flex items-center justify-between group">
                <p className="font-medium text-sm">Share your tool stack</p>
                <Button
                  variant="outline"
                  onClick={() => setIsShareDialogOpen(true)}
                  className="group bg-rewards-primary-light hover:text-white hover:bg-rewards-primary text-rewards-primary rounded-full font-semibold text-sm transition-all duration-200 inline-flex items-center border-0"
                >
                  <Share2 className="stroke-rewards-primary group-hover:stroke-white transition-colors duration-200" size={16} />
                  Share
                </Button>
              </div>
            </EarnMorePointsCard>
          </div>
        </div>
      </main>

      <ReferralSection
        referralLink={referralLink}
        referralCount={referralCount}
        pointsEarned={pointsEarned}
        isLoading={profileLoading}
        hasReferralCode={!!profile?.referral_code}
      />

      <ShareStackDialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen} />
    </>
  )
}

export default EarnRewards
