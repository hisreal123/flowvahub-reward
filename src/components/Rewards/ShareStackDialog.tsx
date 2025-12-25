import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { Layers } from 'lucide-react'

interface ShareStackDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ShareStackDialog({ open, onOpenChange }: ShareStackDialogProps) {

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className='flex items-center flex-col text-center space-y-3'>
          <DialogTitle className='text-2xl font-bold mb-4 text-black'>Share Your Stack</DialogTitle>

          <div className='w-[40px] h-[40px]  rounded-full flex justify-center items-center mb-[1rem] text-[1rem] bg-[#E9D4FF] text-[#9013FE]'>
            <Layers size={24} />
          </div>

          <DialogDescription className='text-center text-gray-600 mb-4'>
            Share your tool stack and earn +25 points! Choose how you'd like to share:
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

