import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'

interface FeedbackModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  userName: string
}

export function FeedbackModal({ open, onOpenChange, userName }: FeedbackModalProps) {
  const [feedback, setFeedback] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!feedback.trim()) {
      return
    }

    setIsSubmitting(true)
    try {
      // TODO: Implement feedback submission logic
      console.log('Feedback submitted:', feedback)
      
      // Reset form and close modal
      setFeedback('')
      onOpenChange(false)
    } catch (error) {
      console.error('Error submitting feedback:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    setFeedback('')
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-black">
            Hi {userName}!
          </DialogTitle>
          <DialogDescription className="text-gray-600 pt-2">
            We'd love to hear from you.
          </DialogDescription>
          <DialogDescription className="text-gray-600">
            Got suggestions on how we can improve? Share your feedback with us. We'll get back to you.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <Textarea
            placeholder="Type your feedback here"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="min-h-[120px]"
          />
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || !feedback.trim()}
            className="bg-rewards-primary hover:bg-rewards-primary/90 text-white"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

