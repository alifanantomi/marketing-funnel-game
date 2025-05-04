"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useSound } from "@/hooks/use-sound"

interface SpinningWheelProps {
  onRiskSelected: (risk: { id: string; title: string; description: string }) => void
}

export function SpinningWheel({ onRiskSelected }: SpinningWheelProps) {
  const [isSpinning, setIsSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const { playButtonSound, playSpinSound } = useSound()

  const risks = [
    {
      id: "delayed-materials",
      title: "Delayed Materials",
      description:
        "Oops! The supplier Millie uses just informed her that the boot materials will be delayed for 5 days. This will push back the production timeline and possibly affect her launch plan.",
      color: "#fd5a46", // retro-coral
    },
    {
      id: "payment-glitch",
      title: "Unexpected payment glitch",
      description:
        "The payment system is suddenly down on launch day! Customers are visiting, but can't check out their boots!",
      color: "#ffc567", // retro-yellow
    },
    {
      id: "product-defect",
      title: "Product defect",
      description:
        "A small batch of boots came out with a minor flaw that might affect comfort but they've already been shipped out and the customer complaint about it.",
      color: "#00995e", // retro-green
    },
    {
      id: "packaging-problem",
      title: "Packaging problem",
      description:
        "Uh-oh! The custom packaging Millie ordered turns out to be misprinted. The brand logo is missing! The vendor offers a reprint, but it will take 4 days.",
      color: "#fb7dab", // retro-pink
    },
    {
      id: "unexpected-cost-spike",
      title: "Unexpected cost spike",
      description:
        "Yikes! Millie's courier service suddenly increased the delivery fee due to a national fuel price hike. Her current budget doesn't cover the new shipping cost.",
      color: "#058cd7", // retro-blue
    },
  ]

  const handleSpin = () => {
    if (isSpinning) return

    playButtonSound()
    playSpinSound()
    setIsSpinning(true)

    // Spin between 2 and 5 full rotations plus a random angle
    const spinRotations = 2 + Math.random() * 3
    const randomAngle = Math.random() * 360
    const totalRotation = 360 * spinRotations + randomAngle

    setRotation(totalRotation)

    // Determine which risk was selected based on final position
    setTimeout(() => {
      const normalizedRotation = totalRotation % 360
      // For 5 sections, each section is 72 degrees (360/5)
      const sectionAngle = 360 / risks.length
      let selectedIndex = Math.floor(normalizedRotation / sectionAngle)

      // Ensure the index is within bounds
      selectedIndex = Math.min(selectedIndex, risks.length - 1)

      onRiskSelected(risks[selectedIndex])
      setIsSpinning(false)
    }, 4000) // Wait for animation to complete
  }

  return (
    <div className="flex flex-col items-center my-8">
      <div className="relative w-64 h-64 mb-8">
        {/* Wheel arrow/pointer */}
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
          <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[25px] border-t-retro-purple"></div>
        </div>

        {/* Wheel */}
        <motion.div
          className="w-full h-full rounded-full border-8 border-retro-purple overflow-hidden relative shadow-xl"
          animate={{ rotate: rotation }}
          transition={{ duration: 4, ease: "easeOut" }}
        >
          {/* Wheel sections - now with 5 sections */}
          {risks.map((risk, index) => (
            <div
              key={risk.id}
              className="absolute w-full h-full"
              style={{
                clipPath: `polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 50% 100%)`,
                transform: `rotate(${index * (360 / risks.length)}deg)`,
                transformOrigin: "center",
                backgroundColor: risk.color,
              }}
            >
              <div
                className="absolute text-white font-bold text-xs"
                style={{
                  left: "60%",
                  top: "30%",
                  transform: `rotate(${360 / risks.length / 2}deg)`,
                  width: "70px",
                  textAlign: "center",
                }}
              >
                {risk.title}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <Button
        onClick={handleSpin}
        disabled={isSpinning}
        className="bg-retro-yellow border-[2px] hover:bg-retro-yellow border-retro-dark hover:opacity-90 disabled:opacity-50 text-retro-dark font-bold py-2 px-6 rounded-full shadow-lg transform transition-transform hover:scale-105 active:scale-95"
      >
        {isSpinning ? "Spinning..." : "Spin the Wheel"}
      </Button>
    </div>
  )
}
