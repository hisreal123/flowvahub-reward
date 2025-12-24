import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { Button } from '../ui/button'
import { Share2 } from 'lucide-react'
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard'

interface ShareStackDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ShareStackDialog({ open, onOpenChange }: ShareStackDialogProps) {
  const { copyToClipboard } = useCopyToClipboard()

  const handleCopyLink = () => {
    copyToClipboard(window.location.href)
  }

  const handleShareTwitter = () => {
    // TODO: Implement Twitter share functionality
    const text = encodeURIComponent('Check out my tool stack!')
    const url = encodeURIComponent(window.location.href)
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Your Stack</DialogTitle>
          <DialogDescription>
            Share your tool stack and earn +25 points! Choose how you'd like to share:
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-3 mt-4">
          <Button
            variant="outline"
            onClick={handleCopyLink}
            className="flex-1 bg-[#eef2ff] hover:bg-[#9013fe] hover:text-white text-[#9013fe] transition-all duration-200"
          >
            Copy Link
          </Button>
          <Button
            variant="outline"
            onClick={handleShareTwitter}
            className="flex-1 bg-[#eef2ff] hover:bg-[#9013fe] hover:text-white text-[#9013fe] transition-all duration-200 inline-flex items-center gap-2"
          >
            <Share2 size={16} />
            Share on Twitter
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

