import { useState } from 'react'
import EarnRewards from '../components/Rewards/Earn-Rewards'
import RedeemRewards from '../components/Rewards/Redeem-Rewards'

export function RewardsPage() {
  const [activeTab, setActiveTab] = useState<'earn' | 'redeem'>('earn')

  return (
    <div>
      {/* Header */}
      <div className="sticky top-0 left-0 right-0 z-10 flex flex-row justify-between items-center gap-4 p-4 bg-background">
        <div>
          <h1 className="ext-xl md:text-[1.5rem] font-normal mb-2">Rewards Hubs</h1>
          <p className="text-muted-foreground ">
            Earn points, unlock rewards, and celebrate your progress!
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 p-4">
        <button
          onClick={() => setActiveTab('earn')}
          className={`px-6 py-3 font-medium transition-all duration-300 ease-in-out relative ${
            activeTab === 'earn'
              ? 'tab-active text-rewards-primary border-b-2 border-rewards-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Earn Points
        </button>
        <button
          onClick={() => setActiveTab('redeem')}
          className={`px-6 py-3 font-medium transition-all duration-300 ease-in-out relative ${
            activeTab === 'redeem'
              ? 'tab-active text-rewards-primary border-b-2 border-rewards-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Redeem Rewards
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-4 relative min-h-[200px]">
        <div
          key={activeTab}
          className="animate-in fade-in slide-in-from-right-4 duration-300"
        >
          {activeTab === 'earn' && <EarnRewards />}
          {activeTab === 'redeem' && <RedeemRewards />}
        </div>
      </div>
    </div>
  )
}

