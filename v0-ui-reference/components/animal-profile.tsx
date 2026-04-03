"use client"

import { useState } from "react"
import { ArrowLeft, Heart, MapPin, Star } from "lucide-react"
import type { Pet } from "@/lib/pet-data"

export default function AnimalProfile({
  pet: initialPet,
  onBack,
}: {
  pet: Pet
  onBack: () => void
}) {
  const [pet, setPet] = useState(initialPet)
  const [feedAnim, setFeedAnim] = useState(false)
  const [petAnim, setPetAnim] = useState(false)

  const addExp = (amount: number) => {
    setPet((prev) => {
      let newExp = prev.exp + amount
      let newLevel = prev.level
      if (newExp >= prev.maxExp) {
        newExp = newExp - prev.maxExp
        newLevel = prev.level + 1
      }
      return { ...prev, exp: newExp, level: newLevel }
    })
  }

  const handleFeed = () => {
    setFeedAnim(true)
    addExp(10)
    setTimeout(() => setFeedAnim(false), 600)
  }

  const handlePet = () => {
    setPetAnim(true)
    addExp(5)
    setTimeout(() => setPetAnim(false), 600)
  }

  const expPercent = (pet.exp / pet.maxExp) * 100

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Hero image */}
      <div className="relative h-[45%] flex-shrink-0">
        <img
          src={pet.image}
          alt={pet.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

        {/* Back button */}
        <button
          onClick={onBack}
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center text-foreground shadow-lg hover:bg-card transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Favorite */}
        <button
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-card transition-colors"
          aria-label="Favorite"
        >
          <Heart className="w-5 h-5 text-destructive" />
        </button>

        {/* Level badge */}
        <div className="absolute bottom-4 right-4 bg-primary text-primary-foreground px-3 py-1.5 rounded-full font-bold text-sm shadow-lg flex items-center gap-1.5">
          <Star className="w-4 h-4" />
          LV.{pet.level}
        </div>
      </div>

      {/* Info section */}
      <div className="flex-1 px-5 pt-4 pb-6 flex flex-col">
        <div className="flex items-start justify-between mb-1">
          <div>
            <h1 className="text-2xl font-bold text-foreground text-balance">
              {pet.name}
            </h1>
            <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground font-semibold mt-1">
              {pet.type === "cat" ? "Street Cat" : "Stray Dog"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-2">
          <MapPin className="w-3.5 h-3.5" />
          <span>{pet.location}</span>
        </div>

        <p className="text-xs text-muted-foreground mt-1.5">
          First discovered by{" "}
          <span className="font-semibold text-primary">{pet.discoveredBy}</span>
        </p>

        {/* EXP bar */}
        <div className="mt-5 bg-secondary rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-foreground">
              Experience
            </span>
            <span className="text-xs font-bold text-primary">
              {pet.exp}/{pet.maxExp} EXP
            </span>
          </div>
          <div className="w-full h-3 bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
              style={{ width: `${expPercent}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-[10px] text-muted-foreground">
              Level {pet.level}
            </span>
            <span className="text-[10px] text-muted-foreground">
              Level {pet.level + 1}
            </span>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="bg-secondary rounded-xl p-3 text-center">
            <p className="text-lg font-bold text-foreground">{pet.level}</p>
            <p className="text-[10px] text-muted-foreground font-medium">
              Level
            </p>
          </div>
          <div className="bg-secondary rounded-xl p-3 text-center">
            <p className="text-lg font-bold text-foreground">
              {pet.level * 12 + pet.exp}
            </p>
            <p className="text-[10px] text-muted-foreground font-medium">
              Total EXP
            </p>
          </div>
          <div className="bg-secondary rounded-xl p-3 text-center">
            <p className="text-lg font-bold text-foreground">
              {Math.floor(pet.level * 2.5)}
            </p>
            <p className="text-[10px] text-muted-foreground font-medium">
              Visits
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 mt-auto pt-4">
          <button
            onClick={handleFeed}
            className={`flex-1 py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 bg-primary text-primary-foreground shadow-lg active:scale-[0.97] transition-all ${
              feedAnim ? "scale-95 opacity-80" : ""
            }`}
          >
            <span className="text-lg" role="img" aria-label="Feed">
              {"🍖"}
            </span>
            Feed (+10 EXP)
          </button>
          <button
            onClick={handlePet}
            className={`flex-1 py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 bg-accent text-accent-foreground shadow-lg active:scale-[0.97] transition-all ${
              petAnim ? "scale-95 opacity-80" : ""
            }`}
          >
            <span className="text-lg" role="img" aria-label="Pet">
              {"👋"}
            </span>
            Pet (+5 EXP)
          </button>
        </div>
      </div>
    </div>
  )
}
