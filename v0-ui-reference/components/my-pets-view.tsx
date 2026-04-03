"use client"

import { useState } from "react"
import { ShieldCheck, Plus, AlertTriangle } from "lucide-react"
import type { OwnPet } from "@/lib/pet-data"
import SosModal from "@/components/sos-modal"

function OwnPetCard({
  pet,
  onSos,
}: {
  pet: OwnPet
  onSos: (pet: OwnPet) => void
}) {
  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
      {/* Pet image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={pet.image}
          alt={pet.name}
          className="w-full h-full object-cover"
        />
        {/* Verified badge */}
        {pet.verified && (
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1 bg-blue-500 text-blue-50 px-2 py-1 rounded-full shadow-md">
            <ShieldCheck className="w-3 h-3" />
            <span className="text-[10px] font-bold">Verified</span>
          </div>
        )}
        {pet.missing && (
          <div className="absolute top-2.5 right-2.5 flex items-center gap-1 bg-red-500 text-red-50 px-2 py-1 rounded-full shadow-md animate-pulse">
            <AlertTriangle className="w-3 h-3" />
            <span className="text-[10px] font-bold">SOS Active</span>
          </div>
        )}
      </div>

      {/* Pet info */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-bold text-foreground text-base">{pet.name}</h3>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground font-semibold capitalize">
            {pet.type}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">{pet.breed}</p>
        <p className="text-[10px] text-muted-foreground mt-0.5">
          {pet.age} old
        </p>

        {/* SOS Button */}
        <button
          onClick={() => onSos(pet)}
          className={`w-full mt-3 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-[0.97] ${
            pet.missing
              ? "bg-red-100 text-red-600 border border-red-200"
              : "bg-red-500 text-red-50 shadow-md hover:bg-red-600"
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          {pet.missing ? "SOS Alert Active" : "Report Missing (SOS)"}
        </button>
      </div>
    </div>
  )
}

export default function MyPetsView({ ownPets }: { ownPets: OwnPet[] }) {
  const [sosTarget, setSosTarget] = useState<OwnPet | null>(null)

  return (
    <div className="flex flex-col h-full bg-background overflow-y-auto">
      {/* Header */}
      <div className="bg-primary p-5 pb-8 rounded-b-3xl">
        <h1 className="font-bold text-primary-foreground text-lg mb-1">
          My Pets
        </h1>
        <p className="text-xs text-primary-foreground/70">
          Your registered companions
        </p>

        {/* Quick stats */}
        <div className="flex gap-3 mt-4">
          <div className="flex-1 bg-card/15 backdrop-blur-sm rounded-xl p-3 text-center">
            <p className="text-xl font-bold text-primary-foreground">
              {ownPets.length}
            </p>
            <p className="text-[10px] text-primary-foreground/70">
              Registered
            </p>
          </div>
          <div className="flex-1 bg-card/15 backdrop-blur-sm rounded-xl p-3 text-center">
            <p className="text-xl font-bold text-primary-foreground">
              {ownPets.filter((p) => p.verified).length}
            </p>
            <p className="text-[10px] text-primary-foreground/70">Verified</p>
          </div>
          <div className="flex-1 bg-card/15 backdrop-blur-sm rounded-xl p-3 text-center">
            <p className="text-xl font-bold text-red-200">
              {ownPets.filter((p) => p.missing).length}
            </p>
            <p className="text-[10px] text-primary-foreground/70">Missing</p>
          </div>
        </div>
      </div>

      {/* Pet list */}
      <div className="px-4 pt-5 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-foreground text-sm">
            Your Companions
          </h3>
          <button className="flex items-center gap-1 text-xs font-bold text-primary hover:text-primary/80 transition-colors">
            <Plus className="w-3.5 h-3.5" />
            Add Pet
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {ownPets.map((pet) => (
            <OwnPetCard
              key={pet.id}
              pet={pet}
              onSos={setSosTarget}
            />
          ))}
        </div>

        {/* Add pet CTA card */}
        <button className="w-full mt-4 py-6 rounded-2xl border-2 border-dashed border-border flex flex-col items-center gap-2 hover:border-primary/40 hover:bg-secondary/50 transition-all">
          <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
            <Plus className="w-6 h-6 text-muted-foreground" />
          </div>
          <span className="text-sm font-medium text-muted-foreground">
            Register a new pet
          </span>
        </button>
      </div>

      {/* SOS Modal */}
      {sosTarget && (
        <SosModal
          pet={sosTarget}
          onClose={() => setSosTarget(null)}
        />
      )}
    </div>
  )
}
