import { AtSign, Plus, X } from "lucide-react";
import { FormEvent } from "react";
import { Button } from "react-day-picker";

interface InviteGuestsModalProps {
  closeGuestsModal: () => void;
  emailsToInvite: string[];
  addNewEmailToInvite: (event: FormEvent<HTMLFormElement>) => void;
  removeEmailFromInvite: (emailToRemove: string) => void;
}

export function InviteGuestsModal({
  closeGuestsModal, emailsToInvite, addNewEmailToInvite, removeEmailFromInvite
}: InviteGuestsModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center"> 
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-lg font-semibold">Select guest</h2>

            <button>
              <X className="size-5 text-zinc-400" onClick={closeGuestsModal} />
            </button>
          </div>

          <p className="">
            Guests will receive emails to confirm their participation in the trip.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {emailsToInvite.map(email => {
            return (
              <div key={email} className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2">
                <span className="text-zinc-300">{email}</span>

                <button type="button">
                  <X className="size-4 text-zinc-400" onClick={() => removeEmailFromInvite(email)} />
                </button>
              </div>
            )
          })}
        </div>

        <div className="w-full h-px bg-zinc-800" />

        <form onSubmit={addNewEmailToInvite} className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
          <div className="flex items-center gap-2 px-2 flex-1">
            <AtSign className="text-zinc-400 size-5" />

            <input type="text" name="email" placeholder="Add guest email" className="flex-1 text-lg outline-none placeholder-zinc-300 bg-transparent rounded-lg" />
          </div>

          <Button type="button">
            To invite
            <Plus className="size-5" />
          </Button>
        </form>
      </div>
    </div>
  )
}