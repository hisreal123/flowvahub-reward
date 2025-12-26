import { Link2, UsersRound, CopyIcon, Check } from 'lucide-react'
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard'

interface ReferralSectionProps {
  referralLink: string
  referralCount?: number
  pointsEarned?: number
  isLoading?: boolean
  hasReferralCode?: boolean
}

export function ReferralSection({
  referralLink,
  referralCount = 0,
  pointsEarned = 0,
  isLoading = false,
  hasReferralCode = false,
}: ReferralSectionProps) {
  const { isCopied, copyToClipboard } = useCopyToClipboard()

  return (
    <main className="mt-6">
      <div className="hover:translate-y-[-5px] hover:shadow-[0_10px_25px_rgba(0,_0,_0,_0.1)] ease-linear duration-200 border border-[#e5e7eb] rounded-xl overflow-hidden">
        <div className="p-4 bg-rewards-primary-light border-b border-gray-200 flex items-center gap-3">
          <h3 className="text-base font-semibold flex items-center gap-2 text-gray-700">
            <span className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-rewards-primary-icon-bg">
              <UsersRound className="text-rewards-primary" size={24} />
            </span>
            <div className="flex flex-col items-start">
              <span className="text-base">Share Your Link</span>
              <p className="text-sm text-gray-500">Invite friends and earn 25 points when they join!</p>
            </div>
          </h3>
        </div>
        <div className="p-3">
          <div className="flex items-center justify-around">
            <div className="flex items-center gap-2 flex-col">
              <p className="text-[36px] font-medium text-rewards-primary">{referralCount}</p>
              <p className="text-sm text-gray-500">Referrals</p>
            </div>
            <div className="flex items-center gap-2 flex-col">
              <p className="text-[36px] font-medium text-rewards-primary">{pointsEarned}</p>
              <p className="text-sm text-gray-500">Points Earned</p>
            </div>
          </div>
        </div>

        <div className="p-4">
          {isLoading ? (
            <div className="bg-gray-50 border border-gray-200 rounded-md p-3">
              <p className="text-sm text-gray-600">Loading your referral link...</p>
            </div>
          ) : hasReferralCode && referralLink.includes('/signup/?ref=') ? (
            <>
              <p className="text-sm text-gray-500 mb-2">Your personal referral link:</p>
              <div className="bg-white border border-gray-200 hover:border-rewards-primary p-2 flex justify-between items-center gap-2 rounded-md transition-colors duration-200">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <Link2 className="stroke-rewards-primary flex-shrink-0" size={18} />
                  <input
                    type="text"
                    value={referralLink}
                    readOnly
                    className="text-sm text-gray-800 bg-transparent border-0 outline-none flex-1 min-w-0"
                  />
                </div>
                <button
                  onClick={() => copyToClipboard(referralLink)}
                  className="flex-shrink-0 p-1 hover:bg-gray-100 rounded transition-colors duration-200"
                  aria-label="Copy referral link"
                >
                  {isCopied ? (
                    <Check className="stroke-green-500" size={18} />
                  ) : (
                    <CopyIcon className="stroke-rewards-primary transition-colors duration-200" size={18} />
                  )}
                </button>
              </div>
            </>
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
              <p className="text-sm text-yellow-800">
                <strong>Referral code not found.</strong> Please refresh the page.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

