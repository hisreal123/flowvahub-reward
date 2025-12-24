import { Button } from '../ui/button'
import { Calendar, UserPlus, Gift } from 'lucide-react'

export function SpotlightCard() {
  return (
    <div className="h-[350px] shadow-[0_5px_15px_rgba(0,_0,_0,_0.05)] rounded-[16px] hover:translate-y-[-5px] hover:shadow-[0_10px_25px_rgba(0,_0,_0,_0.1)] border border-gray-200 overflow-hidden transition-shadow duration-200">
      <div className="p-4 h-[45%] relative bg-gradient-to-br from-rewards-primary to-[#70D6FF] text-white overflow-hidden">
        <span className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold">
          Featured
        </span>

        <div className="flex items-center justify-between gap-4 mt-5">
          <h3 className="text-[1.25rem] font-bold relative z-[2]">
            Top Tool Spotlight
          </h3>

          <div className='overflow-hidden relative rounded-full size-10 md:size-16'>
            <img 
              src="https://api.flowvahub.com/storage/v1/object/public/icons//reclaim%20(1).png"
              alt="Spotlight" 
              className="w-20 h-20 object-cover rounded-lg" 
            />
          </div>
        </div>

        <h3 className="md:text-lg text-md">
          Reclaim
        </h3>
      </div>
      <div className="p-3 flex items-start gap-5" >
        <Calendar className='w-5 h-5 text-rewards-primary mt-1' />
        <div className='flex-1'>
          <p className="mb-[0.25rem] font-semibold">
            Automate and Optimize Your Schedule
          </p>

          <p className='text-[0.800rem] text-gray-600'>Reclaim.ai is an AI-powered calendar assistant that automatically schedules your tasks, meetings, and breaks to boost productivity. Free to try — earn Flowva Points when you sign up!</p>
        </div>
      </div>

      <div className='border-b  mt-7 border-gray-100' />
      
      {/* buttons sections */}
      <div className='flex items-center justify-between gap-2 px-2 mt-2'>
        <Button 
          variant="outline" 
          onClick={() => window.open('https://go.reclaim.ai/ur9i6g5eznps', '_blank')}
          className="group bg-rewards-primary hover:text-white hover:bg-rewards-primary text-white rounded-full font-semibold text-sm transition-all duration-200 inline-flex items-center border-0 cursor-pointer"
        >
          <UserPlus className='stroke-white transition-colors duration-200 w-4 h-4' />
          <span className='text-sm'>Sign up</span>
        </Button>
        <Button 
          variant="outline" 
          className="bg-[linear-gradient(45deg,#9013FE,#FF8687)] text-white  py-2 px-4 rounded-full font-semibold text-sm"
        >
          <Gift className='stroke-white transition-colors duration-200 w-4 h-4' />
          <span className='text-sm'>Claim 50 pts</span>
        </Button>
      </div>
    </div>
  )
}

