"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { TypeAnimation } from "@/components/type-animation"
import { AnimatePresence, motion } from "framer-motion"
import { useSound } from "@/hooks/use-sound"
import { CharacterAnimation } from "@/components/character-animation"
import { DigitalMarketingAnimation } from "@/components/digital-marketing-animation"
import GameGuidelinesCarousel from "./game-guidelines-carousel"

export default function GameStart({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(1)
  const { playButtonSound } = useSound()

  const handleNext = () => {
    playButtonSound()
    if (step < 3) {
      setStep(step + 1)
    } else {
      onComplete()
    }
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
            className="space-y-6"
          >
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="w-full md:w-1/3 relative h-64 flex items-center justify-center">
                <CharacterAnimation mood="happy" width={180} height={180} />
              </div>
              <div className="w-full md:w-2/3">
                <h2 className="text-3xl font-bold text-retro-dark mb-4">Storyline</h2>
                <div className="rounded-lg">
                  <TypeAnimation
                    text="Millie, a young entrepreneur passionate about stylish, high-quality boots. She just started her own business, Boots by Millie, but she faces a major challenge: How can she sell her boots successfully and stand out in the market?"
                    className="font-medium text-retro-dark mb-4"
                  />
                  <TypeAnimation
                    text="The players will step into Millie's shoes and make real business decisions to sell her boots. Every choice from social media ads to pricing strategies affects Millie's sales and engagement. The player with the highest revenue wins!"
                    className="font-medium text-retro-dark"
                    delay={3000}
                  />
                </div>
              </div>
            </div>
            <Button
              onClick={handleNext}
              className="w-full bg-retro-yellow hover:bg-retro-yellow hover:opacity-90 text-retro-dark font-bold py-2 px-6 rounded-lg border-[2px] border-retro-dark shadow-md"
            >
              Next
            </Button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="w-full md:w-1/3 relative h-64 flex items-center justify-center">
                <CharacterAnimation mood="neutral" width={180} height={180} />
              </div>
              <div className="w-full md:w-2/3">
                <h2 className="text-2xl font-bold text-retro-dark mb-4">Game Setup</h2>
                <div className="">
                  <TypeAnimation text="Players register as Millie." className="mb-2 text-retro-dark font-medium" />
                  <TypeAnimation
                    text="The system introduces Millie's background and her new boot collection."
                    className="mb-2 font-medium text-retro-dark"
                    delay={1000}
                  />
                  <TypeAnimation
                    text="Each team will make marketing decisions to help Millie's business succeed."
                    className="mb-2 font-medium text-retro-dark"
                    delay={2000}
                  />
                  <TypeAnimation text="Price: IDR 350.000/boots" className="text-retro-green font-bold text-xl" delay={3000} />
                </div>
              </div>
            </div>
            <Button
              onClick={handleNext}
              className="w-full bg-retro-yellow hover:bg-retro-yellow hover:opacity-90 text-retro-dark font-bold py-2 px-6 rounded-lg border-[2px] border-retro-dark shadow-md"
            >
              Next
            </Button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="w-full md:w-1/3 relative h-64 flex items-center justify-center">
                <CharacterAnimation mood="happy" width={180} height={180} />
                <div className="absolute bottom-0 right-0">
                  <DigitalMarketingAnimation type="analytics" className="w-16 h-16" />
                </div>
              </div>
              <div className="w-full md:w-2/3">
                <h2 className="text-3xl text-center font-bold text-retro-dark mb-4">Game Guidelines</h2>
                <div className="w-full flex justify-center">
                  <GameGuidelinesCarousel />
                </div>
              </div>
            </div>
            <Button
              onClick={handleNext}
              className="w-full bg-retro-yellow hover:bg-retro-yellow hover:opacity-90 text-retro-dark font-bold py-2 px-6 rounded-lg border-[2px] border-retro-dark shadow-md"
            >
              Start Game
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
