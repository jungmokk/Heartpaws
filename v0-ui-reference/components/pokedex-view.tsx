"use client"

import { HelpCircle, Shield, Trophy } from "lucide-react"
import type { Pet } from "@/lib/pet-data"

function PetCard({
  pet,
  onClick,
}: {
  pet: Pet
  onClick: (pet: Pet) => void
}) {
  return (
    <button
      onClick={() => onClick(pet)}
      className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-md hover:border-primary/30 transition-all active:scale-[0.97] cursor-pointer"
      aria-label={`View ${pet.name}`}
    >
      <div className="aspect-square overflow-hidden">
        <img
          src={pet.image}
          alt={pet.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-2.5">
        <p className="font-bold text-foreground text-xs truncate">
          {pet.name}
        </p>
        <div className="flex items-center gap-1 mt-1">
          <span className="text-[10px] font-bold text-primary">
            LV.{pet.level}
          </span>
          <div className="flex-1 h-1 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full"
              style={{ width: `${(pet.exp / pet.maxExp) * 100}%` }}
            />
          </div>
        </div>
        <p className="text-[10px] text-muted-foreground mt-0.5 capitalize">
          {pet.type}
        </p>
      </div>
    </button>
  )
}

function MysteryCard() {
  return (
    <div className="bg-secondary/80 rounded-2xl border border-dashed border-border overflow-hidden">
      <div className="aspect-square flex items-center justify-center bg-muted/50">
        <HelpCircle className="w-10 h-10 text-muted-foreground/40" />
      </div>
      <div className="p-2.5">
        <p className="font-bold text-muted-foreground/40 text-xs">???</p>
        <div className="flex items-center gap-1 mt-1">
          <span className="text-[10px] font-bold text-muted-foreground/40">
            LV.?
          </span>
          <div className="flex-1 h-1 bg-border rounded-full" />
        </div>
        <p className="text-[10px] text-muted-foreground/40 mt-0.5">Unknown</p>
      </div>
    </div>
  )
}

export default function PokedexView({
  pets,
  onSelectPet,
}: {
  pets: Pet[]
  onSelectPet: (pet: Pet) => void
}) {
  const totalPoints = pets.reduce(
    (sum, p) => sum + p.level * 100 + p.exp,
    0
  )

  return (
    <div className="flex flex-col h-full bg-background overflow-y-auto">
      {/* Header */}
      <div className="bg-primary p-5 pb-8 rounded-b-3xl">
        <h1 className="font-bold text-primary-foreground text-lg mb-4">
          My PetDex
        </h1>

        {/* Profile summary */}
        <div className="bg-card/15 backdrop-blur-sm rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary-foreground/30 shadow-lg">
              <img
                src="/images/avatar.jpg"
                alt="Your avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary-foreground/80" />
                <span className="text-xs font-semibold text-primary-foreground/80">
                  Title
                </span>
              </div>
              <h2 className="font-bold text-primary-foreground text-base">
                Local Guardian
              </h2>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 justify-end">
                <Trophy className="w-4 h-4 text-primary-foreground/80" />
                <span className="text-xs text-primary-foreground/80">
                  Points
                </span>
              </div>
              <p className="font-bold text-primary-foreground text-lg">
                {totalPoints.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex gap-4 mt-3 pt-3 border-t border-primary-foreground/15">
            <div className="flex-1 text-center">
              <p className="text-lg font-bold text-primary-foreground">
                {pets.length}
              </p>
              <p className="text-[10px] text-primary-foreground/70">
                Discovered
              </p>
            </div>
            <div className="flex-1 text-center">
              <p className="text-lg font-bold text-primary-foreground">
                {pets.filter((p) => p.type === "cat").length}
              </p>
              <p className="text-[10px] text-primary-foreground/70">Cats</p>
            </div>
            <div className="flex-1 text-center">
              <p className="text-lg font-bold text-primary-foreground">
                {pets.filter((p) => p.type === "dog").length}
              </p>
              <p className="text-[10px] text-primary-foreground/70">Dogs</p>
            </div>
            <div className="flex-1 text-center">
              <p className="text-lg font-bold text-primary-foreground">2</p>
              <p className="text-[10px] text-primary-foreground/70">
                Undiscovered
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Cards grid */}
      <div className="px-4 pt-5 pb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-foreground text-sm">
            Collection
          </h3>
          <span className="text-xs text-muted-foreground">
            {pets.length}/{pets.length + 2} Cards
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {pets.map((pet) => (
            <PetCard key={pet.id} pet={pet} onClick={onSelectPet} />
          ))}
          <MysteryCard />
          <MysteryCard />
        </div>
      </div>
    </div>
  )
}
