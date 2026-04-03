"use client"

import { Settings, ChevronRight, Award, Heart, MapPin, Bell } from "lucide-react"
import type { Pet } from "@/lib/pet-data"

export default function ProfileView({ pets }: { pets: Pet[] }) {
  const totalPoints = pets.reduce(
    (sum, p) => sum + p.level * 100 + p.exp,
    0
  )

  const menuItems = [
    {
      icon: Heart,
      label: "Favorite Pets",
      value: `${Math.min(pets.length, 3)} pets`,
    },
    {
      icon: MapPin,
      label: "My Locations",
      value: "5 spots",
    },
    {
      icon: Award,
      label: "Achievements",
      value: "3/12",
    },
    {
      icon: Bell,
      label: "Notifications",
      value: "On",
    },
    {
      icon: Settings,
      label: "Settings",
      value: "",
    },
  ]

  return (
    <div className="flex flex-col h-full bg-background overflow-y-auto">
      {/* Header */}
      <div className="bg-primary p-5 pb-10 rounded-b-3xl text-center">
        <h1 className="font-bold text-primary-foreground text-lg mb-4">
          Profile
        </h1>
        <div className="w-20 h-20 rounded-full overflow-hidden border-3 border-primary-foreground/30 shadow-xl mx-auto">
          <img
            src="/images/avatar.jpg"
            alt="Your avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="font-bold text-primary-foreground text-lg mt-3">
          PawLover92
        </h2>
        <p className="text-xs text-primary-foreground/70 mt-0.5">
          Local Guardian since Jan 2026
        </p>
      </div>

      {/* Stats cards */}
      <div className="px-4 -mt-6 relative z-10">
        <div className="bg-card rounded-2xl shadow-lg p-4 grid grid-cols-3 gap-3">
          <div className="text-center">
            <p className="text-xl font-bold text-foreground">{pets.length}</p>
            <p className="text-[10px] text-muted-foreground font-medium">
              Discovered
            </p>
          </div>
          <div className="text-center border-x border-border">
            <p className="text-xl font-bold text-primary">
              {totalPoints.toLocaleString()}
            </p>
            <p className="text-[10px] text-muted-foreground font-medium">
              Points
            </p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-foreground">
              {Math.max(...pets.map((p) => p.level))}
            </p>
            <p className="text-[10px] text-muted-foreground font-medium">
              Max Level
            </p>
          </div>
        </div>
      </div>

      {/* Recent achievements */}
      <div className="px-4 mt-5">
        <h3 className="font-bold text-foreground text-sm mb-3">
          Recent Badges
        </h3>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {[
            { name: "First Find", color: "bg-primary" },
            { name: "Cat Lover", color: "bg-accent" },
            { name: "Explorer", color: "bg-chart-3" },
          ].map((badge) => (
            <div
              key={badge.name}
              className="flex flex-col items-center gap-1.5 flex-shrink-0"
            >
              <div
                className={`w-14 h-14 rounded-2xl ${badge.color} flex items-center justify-center shadow-md`}
              >
                <Award className="w-7 h-7 text-primary-foreground" />
              </div>
              <span className="text-[10px] font-semibold text-foreground text-center">
                {badge.name}
              </span>
            </div>
          ))}
          {/* Locked badge */}
          <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
            <div className="w-14 h-14 rounded-2xl bg-secondary border border-dashed border-border flex items-center justify-center">
              <Award className="w-7 h-7 text-muted-foreground/30" />
            </div>
            <span className="text-[10px] font-semibold text-muted-foreground/50 text-center">
              ???
            </span>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="px-4 mt-5 pb-6">
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          {menuItems.map((item, index) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-4 py-3.5 hover:bg-secondary/50 transition-colors ${
                index < menuItems.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                <item.icon className="w-4.5 h-4.5 text-muted-foreground" />
              </div>
              <span className="flex-1 text-sm font-medium text-foreground text-left">
                {item.label}
              </span>
              {item.value && (
                <span className="text-xs text-muted-foreground mr-1">
                  {item.value}
                </span>
              )}
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
