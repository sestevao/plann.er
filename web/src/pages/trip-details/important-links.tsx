import { Link2, Plus } from "lucide-react";
import { Button } from "../../components/button";

export function ImportantLinks() {
  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Important links</h2>

      <div className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="text-zinc-100 block font-medium">AirBnB reservation</span>
            <a href="#" className="text-zinc-400 text-xs block truncate hover:text-zinc-200">
              https://www.airbnb.com.br/rooms/10470001139028321098312093821903812038910
            </a>
          </div>

          <Link2 className="text-green-400 size-5 shrink-0" />
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="text-zinc-100 block font-medium">Hotel reservation</span>
            <a href="#" className="text-zinc-400 text-xs block truncate hover:text-zinc-200">
              https://www.airbnb.com.br/rooms/10470001139028321098312093821903812038910
            </a>
          </div>

          <Link2 className="text-green-400 size-5 shrink-0" />
        </div>
      </div>

      <Button variant="secondary" size="full">
        <Plus className="size-5" />
        Register new link
      </Button>
      
    </div> 
  )
}