"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TypeAnimation } from "@/components/type-animation"
import { motion, AnimatePresence } from "framer-motion"
import { useSound } from "@/hooks/use-sound"
import { CharacterAnimation } from "@/components/character-animation"
import { SpinningWheel } from "@/components/spinning-wheel"
import { EPInput } from "@/components/ep-input"
import StrategyEvaluationTableNoNotes from "./strategy-evaluation-table-no-notes"
import { phaseFive } from "@/commons/strategy-data"

const riskCases = [
  {
    id: "delayed-materials",
    title: "Delayed materials",
    description:
      "Oops! Millie has just been notified by her supplier that there will be a five-day delay in the boot materials.",
  },
  {
    id: "payment-glitch",
    title: "Unexpected payment glitch",
    description:
      "The payment system is suddenly down on launch day! Customers are visiting, but can't check out their boots!",
  },
  {
    id: "product-defect",
    title: "Product defect",
    description:
      "A small batch of boots came out with a minor flaw that might affect comfort but they've already been shipped out and the customer complaint about it.",
  },
  {
    id: "packaging-problem",
    title: "Packaging problem",
    description:
      "Uh-oh! The custom packaging Millie ordered turns out to be misprinted. The brand logo is missing! The vendor offers a reprint, but it will take 4 days.",
  },
  {
    id: "unexpected-cost-spike",
    title: "Unexpected cost spike",
    description:
      "Yikes! Millie's courier service suddenly increased the delivery fee due to a national fuel price hike. Her current budget doesn't cover the new shipping cost.",
  },
]

export default function RiskManagement({
  onComplete,
  onPrevious,
  capital,
  onEPChange,
}: {
  onComplete: (choice: string) => void
  onPrevious: () => void
  capital: number
  onEPChange: (ep: number) => void
}) {
  const [step, setStep] = useState(1)
  const [selectedRisk, setSelectedRisk] = useState<{ id: string; title: string; description: string } | null>(null)
  const { playButtonSound } = useSound()

  const handleRiskSelected = (risk: { id: string; title: string; description: string }) => {
    setSelectedRisk(risk)
    setStep(2)
  }

  const handleNext = () => {
    playButtonSound()
    onComplete(selectedRisk?.id || "")
  }

  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col md:flex-row gap-6 items-start mb-6">
              <div className="w-full md:w-1/4 flex justify-center">
                <CharacterAnimation mood="sad" width={150} height={150} />
              </div>
              <div className="w-full md:w-3/4">
                <div className="bg-brown-50 p-6 rounded-lg mb-6">
                  <h2 className="text-2xl font-bold text-retro-dark mb-4">Risk Management</h2>
                  <TypeAnimation
                    text="Just when Millie thought everything was going smoothly..."
                    className="text-retro-dark mb-4"
                  />
                  <TypeAnimation text="Something unexpected happened." className="text-retro-dark mb-4" delay={1000} />
                  <TypeAnimation
                    text="Welcome to the final phase: Risk Management."
                    className="text-retro-dark mb-4"
                    delay={2000}
                  />
                  <TypeAnimation
                    text="In this phase, your team will face a real-life business scenario, a sudden problem that could affect Millie's sales, brand, or customer experience."
                    className="text-retro-dark mb-4"
                    delay={3000}
                  />
                  <TypeAnimation
                    text="Spin the wheel to see what challenge you'll face!"
                    className="text-retro-dark mb-4"
                    delay={5000}
                  />
                  <TypeAnimation text="Your mission?" className="text-retro-dark mb-4" delay={6000} />
                  <TypeAnimation
                    text="Come up with the best possible solution that's creative, realistic, and truly protects Millie's brand and business."
                    className="text-retro-dark mb-4"
                    delay={7000}
                  />
                  <TypeAnimation
                    text="Explain in front of the class (you can use conditional sentence as the language structure)"
                    className="text-retro-dark mb-4"
                    delay={7000}
                  />
                  <TypeAnimation
                    text="You'll need to rely on smart thinking, communication, and teamwork."
                    className="text-retro-dark"
                    delay={9000}
                  />

                  <StrategyEvaluationTableNoNotes data={phaseFive} />

                </div>
              </div>
            </div>

            <SpinningWheel onRiskSelected={handleRiskSelected} />

            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button
                onClick={onPrevious}
                className="bg-white border border-brown-300 text-brown-800 hover:bg-brown-50"
              >
                Previous
              </Button>
            </div>
          </motion.div>
        )}

        {step === 2 && selectedRisk && (
          <motion.div
            key="step2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col md:flex-row gap-6 items-start mb-6">
              <div className="w-full md:w-1/4 flex justify-center">
                <CharacterAnimation mood="sad" width={150} height={150} />
              </div>
              <div className="w-full md:w-3/4">
                <div className="bg-orange-50 p-6 rounded-lg mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-orange-800">Something Happened!</h2>
                    <div className="bg-brown-100 px-4 py-2 rounded-lg">
                      <span className="font-semibold">Available Capital:</span> IDR {capital.toLocaleString()}
                    </div>
                  </div>
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 100 }}
                  >
                    <Card className="border-orange-300 bg-white">
                      <CardHeader className="bg-orange-100">
                        <CardTitle className="text-orange-800">{selectedRisk.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <TypeAnimation text={selectedRisk.description} className="text-retro-dark" />
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
                <div className="bg-orange-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-orange-800 mb-2">Your Task</h3>
                  <TypeAnimation
                    text="Tell me your solution to this problem! How would you handle this situation?"
                    className="text-retro-dark"
                  />
                </div>
              </div>
            </div>

            <EPInput onEPChange={onEPChange} stageName="Risk Management Phase" />

            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button
                onClick={() => setStep(1)}
                className="bg-white border border-brown-300 text-brown-800 hover:bg-brown-50"
              >
                Spin Again
              </Button>
              <Button 
                onClick={handleNext} 
                className="w-full bg-retro-yellow hover:bg-retro-yellow hover:opacity-90 text-retro-dark font-bold py-2 px-6 rounded-lg border-[2px] border-retro-dark shadow-md"
              >
                Continue to Results
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
