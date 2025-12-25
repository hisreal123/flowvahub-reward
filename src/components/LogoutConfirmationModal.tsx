import { Loader2Icon } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { Button } from './ui/button'

interface LogoutConfirmationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  isLoading?: boolean
}

export function LogoutConfirmationModal({
  open,
  onOpenChange,
  onConfirm,
  isLoading = false,
}: LogoutConfirmationModalProps) {
  const handleContinue = () => {
    onConfirm()
  }

  const handleCancel = () => {
    if (!isLoading) {
      onOpenChange(false)
    }
  }

  const handleOpenChange = (newOpen: boolean) => {
    // Prevent closing the modal while logging out
    if (!isLoading) {
      onOpenChange(newOpen)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md border-rewards-primary">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-black">
            Log Out
          </DialogTitle>
          <DialogDescription className="text-gray-600 pt-2">
            You will be logged out.
          </DialogDescription>
        </DialogHeader>

        {isLoading && (
          <div className="flex items-center justify-center py-4">
            <Loader2Icon className="w-6 h-6 animate-spin text-rewards-primary" />
          </div>
        )}

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleContinue}
            disabled={isLoading}
            className="bg-rewards-primary hover:bg-rewards-primary/90 text-white disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2Icon className="w-4 h-4 animate-spin mr-2" />
                Logging out...
              </>
            ) : (
              'Continue'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

