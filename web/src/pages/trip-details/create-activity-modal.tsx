import { Calendar, Tag, X } from "lucide-react";
import { FormEvent } from "react";
import { useParams } from "react-router-dom";

import { Button } from "../../components/button";
import { api } from "../../lib/axios";

interface CreateActivityModalProps {
  closeCreateActivityModal: () => void;
}

export function CreateActivityModal({ closeCreateActivityModal }: CreateActivityModalProps) {
  const { tripId } = useParams()

  async function createActivity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const title = data.get('title')?.toString()
    const occurs_at = data.get('occurs_at')?.toString()

    if (!title || !occurs_at) {
      return
    }

    await api.post(`/trips/${tripId}/activities`, {
      title,
      occurs_at,
    })

    window.document.location.reload()
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-lg font-semibold">Create activity</h2>

            <button>
              <X className="text-sm text-zinc-400" onClick={closeCreateActivityModal} />
            </button>
          </div>

          <p className="text-sm text-zinc-400">
            All guests can view the activities.
          </p>
        </div>

        <form onSubmit={createActivity} className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Tag className="text-zinc-400 size-5" />
            
            <input type="text" name="title" placeholder="Add activity title" className="flex-1 text-lg outline-none placeholder-zinc-400 bg-transparent" />
          </div>

          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex-1 flex items-center gap-2">
            <Calendar className="text-zinc-400 size-5" />

            <input type="datetime-local" name="occurs_at" placeholder="Add activity date and time" className="flex-1 text-lg outline-none placeholder-zinc-400 bg-transparent" />
          </div>

          <Button size="full">Save activity</Button>  
        </form>
      </div>
    </div>
  )
}