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

        <div className="p-3 rounded-full h-10 w-10 flex items-center justify-center bg-gray-200 hover:bg-purple-200 group transition-colors">
         <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bell" className="svg-inline--fa fa-bell text-[#2D3748] group-hover:text-[#9013fe] group-hover:rotate-[10deg] group-hover:scale-90 transition-transform duration-200" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M224 0c-17.7 0-32 14.3-32 32l0 19.2C119 66 64 130.6 64 208l0 18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416l384 0c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8l0-18.8c0-77.4-55-142-128-156.8L256 32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3l-64 0-64 0c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z"></path></svg>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 p-4">
        <button
          onClick={() => setActiveTab('earn')}
          className={`px-6 py-3 font-medium transition-all duration-300 ease-in-out relative ${
            activeTab === 'earn'
              ? 'tab-active text-[var(--rewards-primary)] border-b-2 border-[var(--rewards-primary)]'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Earn Points
        </button>
        <button
          onClick={() => setActiveTab('redeem')}
          className={`px-6 py-3 font-medium transition-all duration-300 ease-in-out relative ${
            activeTab === 'redeem'
              ? 'tab-active text-[var(--rewards-primary)] border-b-2 border-[var(--rewards-primary)]'
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

