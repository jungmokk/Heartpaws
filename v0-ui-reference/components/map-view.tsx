"use client"

import { MapPin, Navigation, AlertTriangle } from "lucide-react"
import type { Pet, MissingPetAlert } from "@/lib/pet-data"

function PawMarker({
  pet,
  onClick,
}: {
  pet: Pet
  onClick: (pet: Pet) => void
}) {
  return (
    <button
      onClick={() => onClick(pet)}
      className="absolute flex flex-col items-center gap-0.5 -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
      style={{ left: `${pet.x}%`, top: `${pet.y}%` }}
      aria-label={`View ${pet.name}`}
    >
      <div className="relative">
        <div className="w-10 h-10 rounded-full border-2 border-primary bg-card overflow-hidden shadow-lg group-hover:scale-110 transition-transform">
          <img
            src={pet.image}
            alt={pet.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2">
          <svg width="12" height="12" viewBox="0 0 24 24" className="fill-primary">
            <path d="M12 2C7.5 2 4 5.1 4 9c0 3.2 3.4 7.3 7.1 12.1.4.5 1.3.5 1.7 0C16.6 16.3 20 12.2 20 9c0-3.9-3.5-7-8-7z" />
          </svg>
        </div>
      </div>
      <span className="text-[10px] font-bold text-foreground bg-card/90 px-1.5 py-0.5 rounded-full shadow-sm">
        {pet.name}
      </span>
    </button>
  )
}

function SirenMarker({ alert }: { alert: MissingPetAlert }) {
  return (
    <div
      className="absolute flex flex-col items-center gap-0.5 -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${alert.x}%`, top: `${alert.y}%` }}
    >
      {/* Pulsing rings */}
      <div className="absolute w-16 h-16 rounded-full bg-red-500/15 animate-ping" />
      <div className="absolute w-12 h-12 rounded-full bg-red-500/20 animate-pulse" />

      {/* Main marker */}
      <div className="relative z-10">
        <div className="w-11 h-11 rounded-full border-[3px] border-red-500 bg-red-50 overflow-hidden shadow-lg shadow-red-500/30">
          <img
            src={alert.image}
            alt={`Missing: ${alert.name}`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-bounce">
          <AlertTriangle className="w-3 h-3 text-red-50" />
        </div>
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2">
          <svg width="12" height="12" viewBox="0 0 24 24" className="fill-red-500">
            <path d="M12 2C7.5 2 4 5.1 4 9c0 3.2 3.4 7.3 7.1 12.1.4.5 1.3.5 1.7 0C16.6 16.3 20 12.2 20 9c0-3.9-3.5-7-8-7z" />
          </svg>
        </div>
      </div>
      <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full shadow-sm border border-red-200 relative z-10">
        SOS: {alert.name}
      </span>
    </div>
  )
}

function NearbyPetCard({
  pet,
  onClick,
}: {
  pet: Pet
  onClick: (pet: Pet) => void
}) {
  return (
    <button
      onClick={() => onClick(pet)}
      className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border hover:border-primary/40 transition-all cursor-pointer active:scale-[0.98]"
      aria-label={`View ${pet.name}'s profile`}
    >
      <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 shadow-sm">
        <img
          src={pet.image}
          alt={pet.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 text-left">
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-foreground text-sm">{pet.name}</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-secondary text-secondary-foreground font-semibold">
            {pet.type === "cat" ? "Cat" : "Dog"}
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-0.5">{pet.location}</p>
        <div className="flex items-center gap-1.5 mt-1.5">
          <span className="text-[10px] font-bold text-primary">
            LV.{pet.level}
          </span>
          <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all"
              style={{ width: `${(pet.exp / pet.maxExp) * 100}%` }}
            />
          </div>
          <span className="text-[10px] text-muted-foreground">
            {pet.exp}/{pet.maxExp}
          </span>
        </div>
      </div>
    </button>
  )
}

export default function MapView({
  pets,
  missingAlert,
  onSelectPet,
}: {
  pets: Pet[]
  missingAlert: MissingPetAlert
  onSelectPet: (pet: Pet) => void
}) {
  return (
    <div className="flex flex-col h-full">
      {/* SOS Alert Banner */}
      <div className="relative z-20 bg-red-600 px-4 py-2.5 flex items-center gap-2.5">
        <div className="flex-shrink-0 w-7 h-7 rounded-full bg-red-50/20 flex items-center justify-center animate-pulse">
          <AlertTriangle className="w-4 h-4 text-red-50" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-red-50 text-xs font-bold leading-tight truncate">
            {"Urgent: Missing Golden Retriever 'Mango' nearby!"}
          </p>
          <p className="text-red-200 text-[10px] mt-0.5">
            Last seen {missingAlert.timeAgo} at {missingAlert.lastSeen}
          </p>
        </div>
        <div className="flex-shrink-0 w-9 h-9 rounded-full border-2 border-red-50/40 overflow-hidden">
          <img
            src={missingAlert.image}
            alt={`Missing: ${missingAlert.name}`}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Map area */}
      <div className="relative flex-1 bg-secondary overflow-hidden">
        {/* Map grid background */}
        <div className="absolute inset-0 opacity-30">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  className="text-muted-foreground/40"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Decorative map elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-[15%] left-[10%] w-24 h-16 rounded-lg bg-accent/60" />
          <div className="absolute top-[40%] right-[15%] w-20 h-28 rounded-lg bg-accent/60" />
          <div className="absolute bottom-[25%] left-[30%] w-32 h-12 rounded-lg bg-accent/40" />
          <div className="absolute top-[60%] left-[60%] w-16 h-16 rounded-full bg-primary/20" />
          <div className="absolute top-[20%] right-[35%] w-14 h-14 rounded-full bg-primary/15" />
        </div>

        {/* Street lines */}
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-0 bottom-0 left-[20%] w-[3px] bg-muted-foreground" />
          <div className="absolute top-0 bottom-0 left-[50%] w-[3px] bg-muted-foreground" />
          <div className="absolute top-0 bottom-0 left-[80%] w-[3px] bg-muted-foreground" />
          <div className="absolute left-0 right-0 top-[30%] h-[3px] bg-muted-foreground" />
          <div className="absolute left-0 right-0 top-[60%] h-[3px] bg-muted-foreground" />
        </div>

        {/* Paw markers */}
        {pets.map((pet) => (
          <PawMarker key={pet.id} pet={pet} onClick={onSelectPet} />
        ))}

        {/* Missing pet siren marker */}
        <SirenMarker alert={missingAlert} />

        {/* Current location indicator */}
        <div className="absolute left-[48%] top-[48%] -translate-x-1/2 -translate-y-1/2">
          <div className="w-5 h-5 bg-primary rounded-full border-2 border-card shadow-lg animate-pulse" />
          <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />
        </div>

        {/* Map controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button
            className="w-9 h-9 rounded-full bg-card shadow-lg flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
            aria-label="My location"
          >
            <Navigation className="w-4 h-4" />
          </button>
          <button
            className="w-9 h-9 rounded-full bg-card shadow-lg flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
            aria-label="Map pin"
          >
            <MapPin className="w-4 h-4" />
          </button>
        </div>

        {/* Top header overlay */}
        <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-background/80 to-transparent">
          <div className="flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" className="fill-primary">
              <circle cx="7" cy="5" r="2.5" />
              <circle cx="17" cy="5" r="2.5" />
              <circle cx="4" cy="12" r="2.5" />
              <circle cx="20" cy="12" r="2.5" />
              <ellipse cx="12" cy="17" rx="5" ry="5" />
            </svg>
            <h1 className="font-bold text-foreground text-sm">Nearby Pets</h1>
            <span className="text-xs bg-primary/15 text-primary px-2 py-0.5 rounded-full font-semibold">
              {pets.length} found
            </span>
          </div>
        </div>
      </div>

      {/* Bottom sheet */}
      <div className="bg-card rounded-t-3xl -mt-6 relative z-10 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 rounded-full bg-border" />
        </div>
        <div className="px-4 pb-4">
          <h2 className="font-bold text-foreground text-sm mb-3">
            Recently Discovered
          </h2>
          <div className="flex flex-col gap-2 max-h-[180px] overflow-y-auto">
            {pets.map((pet) => (
              <NearbyPetCard
                key={pet.id}
                pet={pet}
                onClick={onSelectPet}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
