import { Plus, User, X } from "lucide-react";
import { FormEvent } from "react";

import { Button } from "../../components/button";

interface ConfirmTripModalProps {
  closeGuestsModal: () => void;
  setOwnerName: (name: string) => void;
  setOwnerEmail: (email: string) => void;
  createTrip: (event: FormEvent<HTMLFormElement>) => void;
}

export function ConfirmTripModal({
  closeGuestsModal, setOwnerName, setOwnerEmail, createTrip
}: ConfirmTripModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center"> 
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-lg font-semibold">Confirm trip creation</h2>

            <button>
              <X className="size-5 text-zinc-400" onClick={closeGuestsModal} />
            </button>
          </div>

          <p className="">
            To complete the creation of the trip to <span className="font-semibold text-zinc-100">Florianópolis, Brazil</span> on the dates of <span className="font-semibold text-zinc-100">16 to 27 August 2024</span> fill in your details below:
          </p>
        </div>

        <form onSubmit={createTrip} className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <User className="text-zinc-400 size-5" />
            <input 
              type="text" 
              name="name" 
              placeholder="Add guest full name" 
              className="flex-1 text-lg outline-none placeholder-zinc-300 bg-transparent" 
              onChange={event => setOwnerName(event.target.value)}
            />
          </div>

          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <User className="text-zinc-400 size-5" />
            <input 
              type="text" 
              name="email" 
              placeholder="Add guest email" 
              className="flex-1 text-lg outline-none placeholder-zinc-300 bg-transparent rounded-lg" 
              onChange={event => setOwnerEmail(event.target.value)}
            />
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