"use client"

import { Map, BookOpen, User, Camera, PawPrint } from "lucide-react"

export type TabType = "map" | "pokedex" | "mypets" | "profile"

export default function BottomNav({
  activeTab,
  onTabChange,
  onCapture,
}: {
  activeTab: TabType
  onTabChange: (tab: TabType) => void
  onCapture: () => void
}) {
  return (
    <nav
      className="relative flex items-end justify-around px-2 pt-2 pb-4 bg-card border-t border-border"
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Map tab */}
      <button
        onClick={() => onTabChange("map")}
        className={`flex flex-col items-center gap-0.5 px-3 py-1 transition-colors ${
          activeTab === "map"
            ? "text-primary"
            : "text-muted-foreground"
        }`}
        aria-label="Map"
        aria-current={activeTab === "map" ? "page" : undefined}
      >
        <Map className="w-5 h-5" />
        <span className="text-[10px] font-semibold">Map</span>
      </button>

      {/* Pokedex tab */}
      <button
        onClick={() => onTabChange("pokedex")}
        className={`flex flex-col items-center gap-0.5 px-3 py-1 transition-colors ${
          activeTab === "pokedex"
            ? "text-primary"
            : "text-muted-foreground"
        }`}
        aria-label="Pokedex"
        aria-current={activeTab === "pokedex" ? "page" : undefined}
      >
        <BookOpen className="w-5 h-5" />
        <span className="text-[10px] font-semibold">PetDex</span>
      </button>

      {/* FAB - Camera/Discover */}
      <div className="relative -mt-8">
        <button
          onClick={onCapture}
          className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-xl hover:opacity-90 active:scale-95 transition-all"
          aria-label="Discover new pet"
        >
          <Camera className="w-7 h-7" />
        </button>
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-destructive rounded-full flex items-center justify-center">
          <span className="text-[9px] font-bold text-card">+</span>
        </div>
      </div>

      {/* My Pets tab */}
      <button
        onClick={() => onTabChange("mypets")}
        className={`flex flex-col items-center gap-0.5 px-3 py-1 transition-colors ${
          activeTab === "mypets"
            ? "text-primary"
            : "text-muted-foreground"
        }`}
        aria-label="My Pets"
        aria-current={activeTab === "mypets" ? "page" : undefined}
      >
        <PawPrint className="w-5 h-5" />
        <span className="text-[10px] font-semibold">My Pets</span>
      </button>

      {/* Profile tab */}
      <button
        onClick={() => onTabChange("profile")}
        className={`flex flex-col items-center gap-0.5 px-3 py-1 transition-colors ${
          activeTab === "profile"
            ? "text-primary"
            : "text-muted-foreground"
        }`}
        aria-label="Profile"
        aria-current={activeTab === "profile" ? "page" : undefined}
      >
        <User className="w-5 h-5" />
        <span className="text-[10px] font-semibold">Profile</span>
      </button>
    </nav>
  )
}
