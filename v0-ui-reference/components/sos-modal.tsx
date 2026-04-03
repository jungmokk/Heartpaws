"use client"

import { useState } from "react"
import { X, AlertTriangle, MapPin, CheckCircle2 } from "lucide-react"
import type { OwnPet } from "@/lib/pet-data"

export default function SosModal({
  pet,
  onClose,
}: {
  pet: OwnPet
  onClose: () => void
}) {
  const [details, setDetails] = useState("")
  const [confirmed, setConfirmed] = useState(false)

  const handleConfirm = () => {
    setConfirmed(true)
    setTimeout(() => {
      onClose()
    }, 2500)
  }

  if (confirmed) {
    return (
      <div className="absolute inset-0 z-50 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
          role="presentation"
        />
        <div className="relative bg-card rounded-3xl p-8 mx-6 text-center animate-in zoom-in-95 duration-300">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="font-bold text-foreground text-lg mb-2">
            SOS Alert Sent!
          </h2>
          <p className="text-sm text-muted-foreground">
            All users within 5km have been notified about{" "}
            <span className="font-bold text-foreground">{pet.name}</span>.
            Stay strong!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
        onClick={onClose}
        role="presentation"
      />

      {/* Modal */}
      <div className="relative w-full bg-card rounded-t-3xl p-6 animate-in slide-in-from-bottom duration-300">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Warning header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <h2 className="font-bold text-foreground text-lg">
              SOS Missing Pet Alert
            </h2>
            <p className="text-xs text-muted-foreground">
              For <span className="font-bold text-foreground">{pet.name}</span>{" "}
              ({pet.breed})
            </p>
          </div>
        </div>

        {/* Pet preview */}
        <div className="flex items-center gap-3 p-3 rounded-xl bg-red-50 border border-red-200 mb-4">
          <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border-2 border-red-300">
            <img
              src={pet.image}
              alt={pet.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="font-bold text-red-700 text-sm">{pet.name}</p>
            <p className="text-[10px] text-red-600">
              {pet.breed} - {pet.age}
            </p>
          </div>
        </div>

        {/* Warning text */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4">
          <p className="text-xs text-red-700 font-medium leading-relaxed">
            Are you sure? This will send an urgent SOS alert to all Street Pet
            Dex users within 5km of your location. Please only use this for
            genuine emergencies.
          </p>
        </div>

        {/* Last seen location */}
        <div className="mb-5">
          <label
            htmlFor="sos-details"
            className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground mb-1.5"
          >
            <MapPin className="w-3.5 h-3.5" />
            Last seen location & details
          </label>
          <textarea
            id="sos-details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="e.g. Last seen near Oak Avenue park entrance, wearing a red bandana..."
            rows={3}
            className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground/60 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-400/40 focus:border-red-400 transition-all resize-none"
          />
        </div>

        {/* Confirm SOS button */}
        <button
          onClick={handleConfirm}
          className="w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 bg-red-500 text-red-50 shadow-lg hover:bg-red-600 active:scale-[0.98] transition-all"
        >
          <AlertTriangle className="w-5 h-5" />
          Confirm SOS Alert
        </button>

        <p className="text-center text-[10px] text-muted-foreground mt-3">
          Misuse of SOS alerts may result in account restrictions.
        </p>
      </div>
    </div>
  )
}
