import { format } from "date-fns";
import { ArrowRight, Calendar, MapPin, Settings2, X } from "lucide-react";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import 'react-day-picker/dist/style.css';

import { Button } from "../../../components/button";

interface DestinationAndDateStepProps {
  isGuestsInputOpen: boolean;
  eventStartAndEndDates: DateRange | undefined;
  closeGuestsInput: () => void;
  openGuestsInput: () => void;
  setDestination: (destination: string) => void;
  setEventStartAndEndDates: (eventStartAndEndDates: DateRange | undefined) => void;
}

export function DestinationAndDateStep({
  closeGuestsInput, 
  isGuestsInputOpen, 
  openGuestsInput, 
  setDestination, 
  setEventStartAndEndDates,
  eventStartAndEndDates, 
}: DestinationAndDateStepProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  
  function toggleDatePicker() {
    setIsDatePickerOpen(!isDatePickerOpen);
  }

  const displayedDate = eventStartAndEndDates?.from && eventStartAndEndDates.to
    ? `${format(eventStartAndEndDates.from, "d' of 'LLL")} to ${format(eventStartAndEndDates.to, "d' of 'LLL")}`
    : 'When';  

  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
      <div className="flex items-center gap-2 flex-1">
        <MapPin className="size-5 text-zinc-400" />
        
        <input 
          type="text"
          disabled={isGuestsInputOpen}
          placeholder="Where are you going?"
          className="bg-transparent outline-none placeholder-zinc-400 text-lg flex-1"
          onChange={event => setDestination(event.target.value)}
        />
      </div>

      <button 
        className="flex items-center gap-2 w-[240px] text-left" 
        disabled={isGuestsInputOpen} 
        onClick={toggleDatePicker}
        aria-label="Select date range"
      >
        <Calendar className="size-5 text-zinc-400" />

        <span className="text-lg text-zinc-400 flex-1 w-40">
          {displayedDate}
        </span>
      </button>

      {isDatePickerOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="font-lg font-semibold">Select dates</h2>

                <button onClick={toggleDatePicker} aria-label="Close date picker">
                  <X className="size-5 text-zinc-400" />
                </button>
              </div>
            </div>

            <DayPicker mode="range" selected={eventStartAndEndDates} onSelect={setEventStartAndEndDates} />
          </div>
        </div>
      )}

      <div className="w-px h-6 bg-zinc-800" />

      {isGuestsInputOpen ? (
        <Button onClick={closeGuestsInput} variant="secondary">
          Change location/date
          <Settings2 className="size-5" />
        </Button>
      ) : (
        <Button onClick={openGuestsInput}>
          Continue
          <ArrowRight className="size-5" />
        </Button>
      )}

    </div>
  )
}