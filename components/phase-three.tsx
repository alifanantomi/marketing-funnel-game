"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { TypeAnimation } from "@/components/type-animation"
import { useSound } from "@/hooks/use-sound"
import { CharacterAnimation } from "@/components/character-animation"
import { EPInput } from "@/components/ep-input"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"

export default function PhaseThree({
  onComplete,
  onPrevious,
  capital,
  onEPChange,
  onCustomStrategyCost,
}: {
  onComplete: () => void
  onPrevious: () => void
  capital: number
  onEPChange: (ep: number) => void
  onCustomStrategyCost: (cost: number) => void
}) {
  const { playButtonSound } = useSound()
  const [strategyCost, setStrategyCost] = useState(0)
  const [costConfirmed, setCostConfirmed] = useState(false)

  const handleNext = () => {
    playButtonSound()
    onComplete()
  }

  const handleCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    if (!isNaN(value) && value >= 0) {
      setStrategyCost(value)
    }
  }

  const handleConfirmCost = () => {
    if (strategyCost <= capital) {
      playButtonSound()
      onCustomStrategyCost(strategyCost)
      setCostConfirmed(true)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6 items-start mb-6">
        <div className="w-full md:w-1/4 flex justify-center">
          <CharacterAnimation mood="neutral" width={150} height={150} />
        </div>
        <div className="w-full md:w-3/4">
          <div className="bg-retro-yellow/30 p-6 rounded-lg mb-6">
            <h2 className="text-2xl font-bold text-retro-dark mb-4">Phase 3: Desire</h2>
            <TypeAnimation
              text="People are loving Millie's vibe, but love doesn't always mean buy. Now it's time to spark real desire."
              className="text-retro-dark mb-4"
            />
            <TypeAnimation
              text="What will make people need those boots in their lives?"
              className="text-retro-dark mb-4"
              delay={2000}
            />
            <TypeAnimation
              text="In this phase, instead of choosing from fixed options, you'll create your own custom strategy plan."
              className="text-retro-dark mb-4"
              delay={4000}
            />
            <TypeAnimation
              text="Think about how you can create a sense of urgency, exclusivity, or emotional connection with the product."
              className="text-retro-dark mb-4"
              delay={6000}
            />
            <TypeAnimation
              text={'Think bold, think smart, and let\'s make them say, "I need these boots NOW."'}
              className="text-retro-dark"
              delay={8000}
            />
          </div>
        </div>
      </div>

      <div className="bg-retro-yellow/30 p-6 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-retro-dark">Choose Your Strategy!</h3>
          <div className="text-lg px-4 py-2 rounded-lg">
            <span className="font-regular">Available Capital:</span><span className="font-bold"> IDR {capital.toLocaleString()}</span>
          </div>
        </div>
        <p className="text-retro-dark mb-4">
          Take 2 minutes to discuss with your team and create a custom desire-building strategy for Millie's boots.
        </p>
        <p className="text-retro-dark mb-4">Consider these elements in your strategy:</p>
        <ul className="list-disc pl-6 space-y-1 text-retro-dark mb-4">
          <li>How will you create emotional connection with the product?</li>
          <li>What unique selling points will you highlight?</li>
          <li>How will you create a sense of urgency or exclusivity?</li>
        </ul>

        <Card className="p-4 bg-[#7C4585] border-retro-dark border-[2px] mb-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="strategy-cost" className="text-lg font-medium text-[#F5F5F5]">
                Estimated Cost for Your Strategy (IDR)
              </Label>
              <p className="text-sm text-[#F5F5F5] mb-2">How much will your custom strategy cost to implement?</p>
              <div className="flex gap-2">
                <Input
                  id="strategy-cost"
                  type="number"
                  min="0"
                  max={capital}
                  value={strategyCost}
                  onChange={handleCostChange}
                  disabled={costConfirmed}
                  className="border-retro-dark focus-visible:ring-0 bg-retro-yellow/10 text-[#F5F5F5]"
                />
                {!costConfirmed ? (
                  <Button
                    onClick={handleConfirmCost}
                    disabled={strategyCost <= 0 || strategyCost > capital}
                    className="bg-[#3D365C] hover:bg-[#3D365C] hover:opacity-90 text-[#F5F5F5]"
                  >
                    Confirm Cost
                  </Button>
                ) : (
                  <Button disabled className="bg-[#3D365C] text-white">
                    Cost Confirmed
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {costConfirmed && <EPInput onEPChange={onEPChange} stageName="Desire Phase" />}

      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        <Button
          onClick={onPrevious}
          className="bg-retro-blue border border-retro-blue text-white hover:bg-retro-blue/80"
        >
          Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={!costConfirmed}
          className="w-full bg-retro-yellow hover:bg-retro-yellow hover:opacity-90 text-retro-dark font-bold py-2 px-6 rounded-lg border-[2px] border-retro-dark shadow-md"
        >
          Continue to Phase 4
        </Button>
      </div>
    </div>
  )
}
