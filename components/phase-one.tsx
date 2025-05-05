"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { TypeAnimation } from "@/components/type-animation"
import { motion } from "framer-motion"
import { useSound } from "@/hooks/use-sound"
import { StrategyCard } from "@/components/strategy-card"
import { CharacterAnimation } from "@/components/character-animation"
import { EPInput } from "@/components/ep-input"

import StrategyEvaluationTable from "./strategy-evaluation-table"
import { phaseOne } from "@/commons/strategy-data"

const strategies = [
  {
    id: "instagram-tiktok",
    title: "Instagram & TikTok Ads",
    cost: 200000,
    description: "Run eye-catching ads on Instagram and TikTok to reach a wide audience.",
  },
  {
    id: "influencer",
    title: "Influencer Collaboration",
    cost: 250000,
    description: "Team up with a cool influencer who really gets your vibe.",
  },
  {
    id: "offline-events",
    title: "Offline Events",
    cost: 300000,
    description: "Host a fun little offline pop-up event to meet your future fans in person.",
  },
]

export default function PhaseOne({
  onComplete,
  onPrevious,
  capital,
  setCapital,
  onEPChange,
}: {
  onComplete: (choice: string) => void
  onPrevious: () => void
  capital: number
  setCapital: (capital: number) => void
  onEPChange: (ep: number) => void
}) {
  const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null)
  const [confirmedStrategy, setConfirmedStrategy] = useState<string | null>(null)
  const [showEPInput, setShowEPInput] = useState(false)
  const { playButtonSound } = useSound()

  const handleStrategySelect = (id: string) => {
    playButtonSound()
    setSelectedStrategy(id)
  }

  const handleStrategyConfirm = (id: string) => {
    playButtonSound()
    // Find the selected strategy
    const selected = strategies.find((s) => s.id === id)
    if (selected && selected.cost <= capital) {
      setConfirmedStrategy(id)
      // Reduce capital by the cost of the strategy
      setCapital(capital - selected.cost)
      // Show EP input after confirming strategy
      setShowEPInput(true)
    }
  }

  const handleNext = () => {
    playButtonSound()
    onComplete(confirmedStrategy || "")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6 items-start mb-6">
        <div className="w-full md:w-1/4 flex justify-center">
          <CharacterAnimation mood="neutral" width={150} height={150} />
        </div>
        <div className="w-full md:w-3/4">
          <div className="bg-retro-yellow/30 p-6 rounded-lg mb-6 text-retro-dark font-medium">
            <h2 className="text-2xl font-bold text-retro-dark mb-4">Phase 1: Attention</h2>
            <TypeAnimation
              text="Millie's got the boots—stylish, comfy, and totally wearable anywhere. The only problem? No one really knows her brand yet. Womp womp."
              className="mb-4"
            />
            <TypeAnimation
              text="She's just launched Boots by Millie, and her goal is simple: to sell boots as many as possible. Time to get people to notice her brand."
              className="mb-4"
              delay={2000}
            />
            <TypeAnimation text="So now, she's thinking..." className="mb-4" delay={4000} />
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>
                <TypeAnimation text={'"Should I run some eye-catching ads on Instagram or TikTok?"'} delay={5000} />
              </li>
              <li>
                <TypeAnimation text={'"Team up with a cool influencer who really gets your vibe?"'} delay={6000} />
              </li>
              <li>
                <TypeAnimation
                  text={'"Or maybe host a fun little offline pop-up event to meet your future fans in person?"'}
                  delay={7000}
                />
              </li>
            </ul>
            <TypeAnimation
              text="This is where you come in! It's your job to help Millie decide which way to go."
              className="text-gray-700"
              delay={8000}
            />

            <StrategyEvaluationTable data={phaseOne} />
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-retro-dark">Choose Your Strategy!</h3>
        <div className="text-lg px-4 py-2 rounded-lg">
          <span className="font-regular">Available Capital:</span><span className="font-bold"> IDR {capital.toLocaleString()}</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {strategies.map((strategy, index) => (
          <motion.div
            key={strategy.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <StrategyCard
              strategy={strategy}
              isSelected={selectedStrategy === strategy.id}
              onSelect={() => handleStrategySelect(strategy.id)}
              onConfirm={() => handleStrategyConfirm(strategy.id)}
            />
          </motion.div>
        ))}
      </div>

      {showEPInput && <EPInput onEPChange={onEPChange} stageName="Attention Phase" />}

      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        <Button
          onClick={onPrevious}
          className="bg-retro-blue border border-retro-blue text-white hover:bg-retro-blue/80"
        >
          Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={!confirmedStrategy}
          className="w-full bg-retro-yellow hover:bg-retro-yellow hover:opacity-90 text-retro-dark font-bold py-2 px-6 rounded-lg border-[2px] border-retro-dark shadow-md"
        >
          Continue to Phase 2
        </Button>
      </div>
    </div>
  )
}
