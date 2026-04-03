"use client"

import { useState } from "react"
import BottomNav, { type TabType } from "@/components/bottom-nav"
import MapView from "@/components/map-view"
import PokedexView from "@/components/pokedex-view"
import ProfileView from "@/components/profile-view"
import MyPetsView from "@/components/my-pets-view"
import AnimalProfile from "@/components/animal-profile"
import CaptureModal from "@/components/capture-modal"
import { PETS, MY_PETS, MISSING_PET_ALERT, type Pet } from "@/lib/pet-data"

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>("map")
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null)
  const [showCapture, setShowCapture] = useState(false)

  const handleSelectPet = (pet: Pet) => {
    setSelectedPet(pet)
  }

  const handleBack = () => {
    setSelectedPet(null)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted p-4">
      {/* Mobile container */}
      <div className="relative w-full max-w-md h-[850px] bg-background rounded-3xl overflow-hidden border border-border shadow-2xl flex flex-col">
        {/* Status bar simulation */}
        <div className="flex items-center justify-between px-5 py-2 bg-card">
          <span className="text-[11px] font-semibold text-foreground">
            9:41
          </span>
          <div className="flex items-center gap-1">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className="w-[3px] rounded-sm bg-foreground"
                  style={{ height: `${bar * 3 + 2}px` }}
                />
              ))}
            </div>
            <span className="text-[11px] font-semibold text-foreground ml-1">
              5G
            </span>
            <div className="w-6 h-3 rounded-sm border border-foreground/60 ml-1 relative">
              <div className="absolute inset-0.5 bg-foreground/80 rounded-[1px]" style={{ width: '75%' }} />
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1 overflow-hidden relative">
          {selectedPet ? (
            <AnimalProfile pet={selectedPet} onBack={handleBack} />
          ) : (
            <>
              <div
                className={`absolute inset-0 transition-opacity duration-200 ${
                  activeTab === "map"
                    ? "opacity-100 z-10"
                    : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                <MapView
                  pets={PETS}
                  missingAlert={MISSING_PET_ALERT}
                  onSelectPet={handleSelectPet}
                />
              </div>
              <div
                className={`absolute inset-0 transition-opacity duration-200 ${
                  activeTab === "pokedex"
                    ? "opacity-100 z-10"
                    : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                <PokedexView pets={PETS} onSelectPet={handleSelectPet} />
              </div>
              <div
                className={`absolute inset-0 transition-opacity duration-200 ${
                  activeTab === "mypets"
                    ? "opacity-100 z-10"
                    : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                <MyPetsView ownPets={MY_PETS} />
              </div>
              <div
                className={`absolute inset-0 transition-opacity duration-200 ${
                  activeTab === "profile"
                    ? "opacity-100 z-10"
                    : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                <ProfileView pets={PETS} />
              </div>
            </>
          )}
        </div>

        {/* Bottom nav - hide when showing animal profile */}
        {!selectedPet && (
          <BottomNav
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onCapture={() => setShowCapture(true)}
          />
        )}

        {/* Capture modal overlay */}
        {showCapture && (
          <CaptureModal
            onClose={() => setShowCapture(false)}
            missingAlert={MISSING_PET_ALERT}
          />
        )}
      </div>
    </div>
  )
}
