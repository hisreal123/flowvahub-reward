/**
 * Cloned Reference Implementation
 * Based on: https://app.flowvahub.com/dashboard/earn-rewards
 * 
 * This is a reference component structure for recreating the original page
 */

const EarnRewardsCloned = () => {
  return (
    <main>
      {/* Section Title */}
      <div>
        <h2 className="text-lg md:text-2xl my-3 text-black border border-l-[4px] border-t-0 border-b-0 border-r-0 border-[#9301fe] pl-[0.75rem] font-semibold">
          Your Rewards Journey
        </h2>
      </div>

      {/* Point Balance Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="shadow-[0_5px_15px_rgba(0,_0,_0,_0.05)] transition-all rounded-[16px] hover:translate-y-[-5px] hover:shadow-[0_10px_25px_rgba(0,_0,_0,_0.1)] border border-[#f3f4f6] overflow-hidden duration-200">
          <div className="p-[1rem] relative border border-b-[#f3f4f6] bg-[#eef2ff] border-t-0 border-r-0 border-l-0">
            <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-700">
              Point Balance
            </h3>
          </div>
          <div className="p-[1rem]">
            <div className="flex items-center justify-between">
              <div className="font-extrabold text-[36px] text-[#9013fe] m-[10px_0]">
                0
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Activity Card Template */}
        <div className="shadow-[0_5px_15px_rgba(0,_0,_0,_0.05)] transition-all rounded-[16px] hover:translate-y-[-5px] hover:shadow-[0_10px_25px_rgba(0,_0,_0,_0.1)] border border-[#f3f4f6] overflow-hidden duration-200">
          <div className="p-[1rem]">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Activity Name
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Description of how to earn points
            </p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-[#9013fe]">
                +XX Points
              </span>
              <button className="px-4 py-2 bg-[#9013fe] text-white rounded-lg hover:bg-[#7a0fd4] transition-colors">
                Start
              </button>
            </div>
          </div>
        </div>

        {/* Add more activity cards as needed */}
      </div>
    </main>
  )
}

export default EarnRewardsCloned

