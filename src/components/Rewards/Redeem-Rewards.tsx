const RedeemRewards = () => {
  return (
    <main>
      <div>
        <h2 className=" text-lg md:text-2xl my-3 text-black border border-l-[4px] border-t-0 border-b-0 border-r-0 border-[#9301fe] pl-[0.75rem] font-semibold">Redeem Your Points</h2>
      </div>

      {/* card grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="shadow-[0_5px_15px_rgba(0,_0,_0,_0.05)] transition-all rounded-[16px] hover:translate-y-[-5px] hover:shadow-[0_10px_25px_rgba(0,_0,_0,_0.1)] border border-[#f3f4f6] overflow-hidden duration-200">
          <div className="card-body">
            <h3 className="card-title">Reward 1</h3>
            <p className="card-text">This is a reward</p>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <h3 className="card-title">Reward 2</h3>
            <p className="card-text">This is a reward</p>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <h3 className="card-title">Reward 3</h3>
            <p className="card-text">This is a reward</p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default RedeemRewards