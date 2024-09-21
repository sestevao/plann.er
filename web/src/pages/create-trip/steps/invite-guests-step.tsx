import { ArrowRight, UserRoundPlus } from "lucide-react";
import { Button } from "react-day-picker";

interface InviteGuestsStepProps {
  emailsToInvite: string[];
  openGuestsModal: () => void;
  openConfirmTripModal: () => void;
}

export function InviteGuestsStep({
  emailsToInvite, openGuestsModal, openConfirmTripModal
}: InviteGuestsStepProps) {
  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
      <button type="button" className="flex items-center gap-2 flex-1 text-left" onClick={openGuestsModal}>
        <UserRoundPlus className="size-5 text-zinc-400" />
        {emailsToInvite.length > 0 ? (
          <span className="text-zinc-300">{emailsToInvite.length} guests invited</span>
        ) : (
          <span className="text-zinc-300">Who will be on the trip?</span>
        )}
      </button>

      <div className="w-px h-6 bg-zinc-800" />

      <Button onClick={openConfirmTripModal}>
        Confirm Trip
        <ArrowRight className="size-5" />
      </Button>
    </div>
  )
}