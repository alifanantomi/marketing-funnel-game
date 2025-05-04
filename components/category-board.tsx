"use client"

import { cn } from "@/lib/utils"

interface CategoryBoardProps {
  currentPhase: string
}

export function CategoryBoard({ currentPhase }: CategoryBoardProps) {
  const phases = [
    { id: "phase1", title: "Attention", desc: "Phase 1", color: "bg-retro-blue" },
    { id: "phase2", title: "Interest", desc: "Phase 2", color: "bg-retro-purple" },
    { id: "phase3", title: "Desire", desc: "Phase 3", color: "bg-retro-pink" },
    { id: "phase4", title: "Action", desc: "Phase 4", color: "bg-retro-green" },
    { id: "risk", title: "Risk", desc: "Phase 5", color: "bg-retro-coral" },
  ]

  return (
    <div className="flex gap-2 justify-between mb-6 p-3 bg-retro-green rounded-lg border-[2px] border-retro-dark">
      {phases.map((phase) => (
        <div
          key={phase.id}
          className={cn(
            "w-full text-center px-3 py-2 rounded-md transition-all duration-300",
            currentPhase === phase.id
              ? `${phase.color} text-[white]`
              : "text-[#F8F7F3] hover:bg-retro-yellow/20",
          )}
        >
          <div className="text-lg font-bold">{phase.title}</div>
          <div className="text-xs font-medium">{phase.desc}</div>
        </div>
      ))}
    </div>
  )
}
