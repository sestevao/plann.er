import { CheckCircle2, CircleDashed, UserCog } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Button } from "../../components/button";
import { api } from "../../lib/axios";

interface Participant {
 id: string;
 name: string | null;
 email: string;
 is_confirmed: boolean;
}

export function Guests() {
  const { tripId } = useParams()
  const [participants, setParticipants] = useState<Participant[]>([])

  useEffect(() => {
    api.get(`/trips/${tripId}/participants`).then(response => setParticipants(response.data.participants))
  }, [tripId])


  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Guests</h2>

      <div className="space-y-5">
        {participants.map((participant, index) => {
          return (
            <div key={participant.id} className="flex items-center justify-between gap-4">
              <div className="space-y-1.5">
                <span className="text-zinc-100 block font-medium">{participant.name ?? `Guest ${index}`}</span>
                <span className="text-zinc-400 text-sm block truncate">{participant.email}</span>
              </div>

              {participant.is_confirmed ? (
                <CheckCircle2 className="text-green-400 size-5 shrink-0" />
              ) : (
                <CircleDashed className="text-zinc-400 size-5 shrink-0" />
              )}
            </div>
          )
        })}
      </div>

      <Button variant="secondary" size="full">
        <UserCog className="size-5" />
        Manage guests
      </Button>
    </div>
  )
}