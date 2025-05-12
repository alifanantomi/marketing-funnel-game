"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { AnimatePresence, motion } from "framer-motion"
import { useSound } from "@/hooks/use-sound"

export default function PlayerSelect({ 
  playerList,
  player, 
  onComplete, 
  setPlayer 
}: { 
  playerList: Array<string>
  player: string
  onComplete: (player: string) => void
  setPlayer: (player: string) => void 
}) {
  const [step, setStep] = useState(1)
  const { playButtonSound } = useSound()

  const handleNext = () => {
    playButtonSound()
    
    onComplete(player)
  }

  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        <motion.div
          key="step1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          
          <div className="space-y-1 mb-4">
            <h1 className="text-center text-3xl font-bold text-retro-dark">
              Select Role
            </h1>
            <p className="text-center font-medium text-retro-dark">
              Select your role to play the game
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-6 items-center">
            { playerList.map((item: string, index: number) => (
              <div key={index} className="w-full md:w-1/2 flex justify-between bg-retro-coral border-retro-dark border-t-2 border-l-2 border-r-4 border-b-4 p-3 rounded-lg">
                <h2 className="text-3xl font-bold text-retro-dark">{item.toLocaleUpperCase()}</h2>

                <Button
                  disabled={player === item}
                  onClick={() => setPlayer(item)}
                  className="w-fit bg-retro-blue p-2 rounded-md border-retro-dark border-t-2 border-l-2 border-r-4 border-b-4">
                  { player === item ? 'Selected' : 'Select' }
                </Button>
              </div>
            ))}
          </div>
          <Button
            onClick={handleNext}
            disabled={player === '' || player === null}
            className="w-full bg-retro-yellow hover:bg-retro-yellow hover:opacity-90 text-retro-dark font-bold py-2 px-6 rounded-lg border-[2px] border-retro-dark shadow-md"
          >
            Next { player && `as ${player}` }
          </Button>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
