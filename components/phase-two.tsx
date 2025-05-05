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
import { phaseOne, phaseTwo } from "@/commons/strategy-data"

const strategies = [
  {
    id: "engaging-posts",
    title: "Create engaging posts",
    cost: 100000,
    description: "Create high-quality content that showcases the boots and engages your audience.",
  },
  {
    id: "giveaways",
    title: "Run giveaways",
    cost: 350000,
    description: "Organize a giveaway contest to boost engagement and reach.",
  },
  {
    id: "campaign",
    title: "Create campaign",
    cost: 150000,
    description: "Launch a themed campaign that tells a story about the boots.",
  },
]

export default function PhaseTwo({
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
          <div className="bg-retro-yellow/30 p-6 rounded-lg mb-6">
            <h2 className="text-2xl font-bold text-retro-dark mb-4">Phase 2: Interest</h2>
            <div className="font-medium">
              <TypeAnimation
                text={
                  "Millie's boots are catching eyes, but now it's time to turn scrolls into interest! She wants people to stay, engage, and think, \"Okay, I want these boots...\""
                }
                className="mb-4"
              />
              <TypeAnimation
                text="To do that, she's planning her next move:"
                className="mb-4"
                delay={2000}
              />
              <ul className="list-disc pl-6 space-y-1 text-retro-dark mb-4">
                <li>
                  <TypeAnimation text="Behind-the-scenes content?" delay={3000} />
                </li>
                <li>
                  <TypeAnimation text="A giveaway to boost engagement?" delay={4000} />
                </li>
                <li>
                  <TypeAnimation text="A fun mini campaign?" delay={5000} />
                </li>
              </ul>
              <TypeAnimation
                text="Help Millie keep the buzz going and make her audience fall in love with her brand!"
                className="text-retro-dark"
                delay={6000}
              />

              <StrategyEvaluationTable data={phaseOne} />

            </div>
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

      {showEPInput && <EPInput onEPChange={onEPChange} stageName="Interest Phase" />}

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
          Continue to Phase 3
        </Button>
      </div>
    </div>
  )
}
