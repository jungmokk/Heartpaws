"use client"

import { useState, useEffect } from "react"
import { X, Camera, Sparkles, AlertTriangle, Bell } from "lucide-react"
import type { MissingPetAlert } from "@/lib/pet-data"

export default function CaptureModal({
  onClose,
  missingAlert,
}: {
  onClose: () => void
  missingAlert: MissingPetAlert
}) {
  const [petName, setPetName] = useState("")
  const [petType, setPetType] = useState<"cat" | "dog">("cat")
  const [captured, setCaptured] = useState(false)
  const [showAiMatch, setShowAiMatch] = useState(false)
  const [notified, setNotified] = useState(false)

  // Simulate AI match detection when switching to "dog"
  useEffect(() => {
    if (petType === "dog") {
      const timer = setTimeout(() => setShowAiMatch(true), 800)
      return () => clearTimeout(timer)
    } else {
      setShowAiMatch(false)
      setNotified(false)
    }
  }, [petType])

  const handleRegister = () => {
    if (!petName.trim()) return
    setCaptured(true)
    setTimeout(() => {
      setCaptured(false)
      setPetName("")
      onClose()
    }, 2000)
  }

  const handleNotifyOwner = () => {
    setNotified(true)
    setTimeout(() => {
      onClose()
    }, 2500)
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
      <div className="relative w-full bg-card rounded-t-3xl p-6 animate-in slide-in-from-bottom duration-300 max-h-[85%] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <h2 className="font-bold text-lg text-foreground mb-5">
          New Discovery!
        </h2>

        {/* Photo placeholder */}
        <div className="relative w-full aspect-[4/3] rounded-2xl bg-secondary border-2 border-dashed border-border flex flex-col items-center justify-center gap-3 mb-5 overflow-hidden">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Camera className="w-8 h-8 text-primary" />
          </div>
          <p className="text-sm text-muted-foreground font-medium">
            Tap to take a photo
          </p>
        </div>

        {/* Name input */}
        <div className="mb-4">
          <label
            htmlFor="pet-name"
            className="block text-xs font-semibold text-muted-foreground mb-1.5"
          >
            Give it a cute name!
          </label>
          <input
            id="pet-name"
            type="text"
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
            placeholder="e.g. Whiskers, Biscuit, Shadow..."
            className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground/60 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
          />
        </div>

        {/* Type selector */}
        <div className="mb-5">
          <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
            What kind of friend?
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => setPetType("cat")}
              className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${
                petType === "cat"
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              Cat
            </button>
            <button
              onClick={() => setPetType("dog")}
              className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${
                petType === "dog"
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              Dog
            </button>
          </div>
        </div>

        {/* AI Match Alert */}
        {showAiMatch && !notified && (
          <div className="mb-5 bg-red-50 border-2 border-red-300 rounded-2xl p-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-red-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-red-700 text-sm">
                  AI Match Detected!
                </p>
                <p className="text-xs text-red-600 mt-1 leading-relaxed">
                  {"Wait! This looks like the missing dog "}
                  <span className="font-bold">
                    {`'${missingAlert.name}'`}
                  </span>
                  {" ("}
                  {missingAlert.breed}
                  {"). Notify owner?"}
                </p>
              </div>
            </div>

            {/* Missing pet preview */}
            <div className="flex items-center gap-3 mt-3 p-2.5 bg-red-100/60 rounded-xl">
              <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border-2 border-red-300">
                <img
                  src={missingAlert.image}
                  alt={`Missing: ${missingAlert.name}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="font-bold text-red-700 text-xs">
                  {missingAlert.name} - {missingAlert.breed}
                </p>
                <p className="text-[10px] text-red-600">
                  Missing since {missingAlert.timeAgo} - Owner:{" "}
                  {missingAlert.ownerName}
                </p>
              </div>
            </div>

            <button
              onClick={handleNotifyOwner}
              className="w-full mt-3 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 bg-red-500 text-red-50 shadow-md hover:bg-red-600 active:scale-[0.97] transition-all"
            >
              <Bell className="w-4 h-4" />
              Yes, Notify Owner!
            </button>
          </div>
        )}

        {/* Notified confirmation */}
        {notified && (
          <div className="mb-5 bg-green-50 border border-green-200 rounded-2xl p-4 text-center animate-in zoom-in-95 duration-300">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-2">
              <Bell className="w-6 h-6 text-green-600" />
            </div>
            <p className="font-bold text-green-700 text-sm">
              Owner Notified!
            </p>
            <p className="text-xs text-green-600 mt-1">
              {missingAlert.ownerName} has been alerted about a potential
              sighting of {missingAlert.name}.
            </p>
          </div>
        )}

        {/* Register button */}
        {!notified && (
          <button
            onClick={handleRegister}
            disabled={!petName.trim() || captured}
            className={`w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
              captured
                ? "bg-accent text-accent-foreground"
                : petName.trim()
                  ? "bg-primary text-primary-foreground shadow-lg hover:opacity-90 active:scale-[0.98]"
                  : "bg-secondary text-muted-foreground cursor-not-allowed"
            }`}
          >
            {captured ? (
              <>
                <Sparkles className="w-5 h-5" />
                Card Generated!
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Register & Generate Card
              </>
            )}
          </button>
        )}
      </div>
    </div>
  )
}
