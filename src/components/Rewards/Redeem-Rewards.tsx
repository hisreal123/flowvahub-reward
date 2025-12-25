import { Banknote } from 'lucide-react'
import { useState } from 'react'

const RedeemRewards = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'unlocked' | 'locked' | 'coming-soon'>('all')

  const rewards = [
    { id: 1, title: '$5 Bank Transfer', subTitle: 'The $5 equivalent will be transferred to your bank account.', icon: <Banknote className='text-rewards-primary' size={24} />, points: 500, status: 'locked' },
    { id: 2, title: '$5 Paypal International', subTitle: 'Receive a $5 PayPal balance transfer directly to your PayPal account email.', icon: <Banknote className='text-rewards-primary' size={24} />, points: 1000, status: 'locked' },
    { id: 3, title: '$5 Virtual Visa Card', subTitle: 'Use your $5 prepaid card to shop anywhere Visa is accepted online.', icon: <Banknote className='text-rewards-primary' size={24} />, points: 2500, status: 'locked' },
    { id: 4, title: '$5 Apple Gift Card', subTitle: 'Redeem this $5 Apple Gift Card for apps, games, music, movies, and more on the App Store and iTunes.', icon: <Banknote className='text-rewards-primary' size={24} />, points: 5000, status: 'locked' },
    { id: 5, title: '$5 Google Play Card', subTitle: 'Use this $5 Google Play Card to buy apps, games, movies, books, and more on the Google Play Store.', icon: <Banknote className='text-rewards-primary' size={24} />, points: 7500, status: 'coming-soon' },
  ]

  // Calculate counts dynamically from rewards data
  const rewardCounts = {
    all: rewards.length,
    unlocked: rewards.filter(reward => reward.status === 'unlocked').length,
    locked: rewards.filter(reward => reward.status === 'locked').length,
    'coming-soon': rewards.filter(reward => reward.status === 'coming-soon').length,
  }

  const filteredRewards = activeCategory === 'all' 
    ? rewards 
    : rewards.filter(reward => reward.status === activeCategory)

  return (
    <main>
      <div>
        <h2 className="text-lg md:text-2xl my-3 text-black border-l-4 border-l-rewards-primary pl-3 font-semibold">
          Redeem Your Points
        </h2>
      </div>

      {/* Category Tabs - Horizontal Scroll on Mobile/Tablet */}
      <div className="mb-6">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4 lg:mx-0 lg:px-0">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-6 py-3 font-medium transition-all duration-300 ease-in-out relative whitespace-nowrap flex-shrink-0 ${
              activeCategory === 'all'
                ? 'tab-active text-rewards-primary border-b-2 border-rewards-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <p className='flex items-center'>All Rewards <span className=" ml-2 text-sm bg-gray-100 rounded-xl h-7 w-7 flex items-center justify-center">{rewardCounts.all}</span></p>
          </button>
          <button
            onClick={() => setActiveCategory('unlocked')}
            className={`px-6 py-3 font-medium transition-all duration-300 ease-in-out relative whitespace-nowrap flex-shrink-0 ${
              activeCategory === 'unlocked'
                ? 'tab-active text-rewards-primary border-b-2 border-rewards-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <p className='flex items-center'>Unlocked <span className="ml-2 text-sm bg-gray-100 rounded-xl h-7 w-7 flex items-center justify-center">{rewardCounts.unlocked}</span></p> 
          </button>
          <button
            onClick={() => setActiveCategory('locked')}
            className={`px-6 py-3 font-medium transition-all duration-300 ease-in-out relative whitespace-nowrap flex-shrink-0 ${
              activeCategory === 'locked'
                ? 'tab-active text-rewards-primary border-b-2 border-rewards-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <p className='flex items-center'>Locked <span className="ml-2 text-sm bg-gray-100 rounded-xl h-7 w-7 flex items-center justify-center">{rewardCounts.locked}</span></p>
          </button>
          <button
            onClick={() => setActiveCategory('coming-soon')}
            className={`px-6 py-3 font-medium transition-all duration-300 ease-in-out relative whitespace-nowrap flex-shrink-0 ${
              activeCategory === 'coming-soon'
                ? 'tab-active text-rewards-primary border-b-2 border-rewards-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <p className='flex items-center'>Coming Soon <span className="ml-2 text-sm bg-gray-100 rounded-xl h-7 w-7 flex items-center justify-center">{rewardCounts['coming-soon']}</span></p>
          </button>
        </div>
      </div>

      {/* Rewards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {filteredRewards.map((reward) => (
          <div 
            key={reward.id} 
            className='border opacity-[0.7] cursor-not-allowed border-[#E9D4FF] bg-white rounded-[12px] p-[1.5rem] shadow-[0_2px_8px_rgba(0,0,0,0.05)] relative overflow-hidden transition-all duration-200 ease-linear hover:translate-y-[-5px] hover:shadow-[0_6px_16px_rgba(0,0,0,0.1)] flex flex-col h-full min-h-[320px]'
          >
            <div className="flex flex-col items-center justify-between h-full gap-4">
              {/* Top Section - Icon and Title */}
              <div className="flex flex-col items-center gap-3 flex-shrink-0">
                <div className='w-12 h-12 rounded-[12px] flex items-center justify-center text-[1.5rem] text-[#9013fe] bg-[#E9D4FF]'>
                  💸
                </div>
                <h3 className="text-center text-[1.1rem] font-semibold">{reward.title}</h3>
              </div>

              {/* Middle Section - Subtitle with fixed height */}
              <div className="flex-1 flex items-start justify-center min-h-[60px] max-h-[80px] overflow-hidden w-full">
                <p className="text-center text-[0.9rem] text-[#2D3748] line-clamp-3 px-2">
                  {reward.subTitle}
                </p>
              </div>

              {/* Bottom Section - Points and Button */}
              <div className="flex flex-col items-center gap-3 w-full flex-shrink-0 mt-auto">
                <p className="text-sm text-gray-600 font-medium">
                  ⭐ {reward.points.toLocaleString()} pts
                </p>
                {reward.status === 'unlocked' && (
                  <button className="w-full bg-rewards-primary hover:bg-[#7a0fe0] text-white font-semibold py-2 px-4 rounded-xl transition-all duration-200">
                    Redeem
                  </button>
                )}
                {reward.status === 'locked' && (
                  <button 
                    disabled
                    className="w-full bg-gray-300 text-gray-500 font-semibold py-2 px-4 rounded-xl cursor-not-allowed"
                  >
                    Locked
                  </button>
                )}
                {reward.status === 'coming-soon' && (
                  <button 
                    disabled
                    className="w-full bg-gray-200 text-gray-400 font-semibold py-2 px-4 rounded-xl cursor-not-allowed"
                  >
                    Coming Soon
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}

export default RedeemRewards