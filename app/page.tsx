"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import GameStart from "@/components/game-start"
import PhaseOne from "@/components/phase-one"
import PhaseTwo from "@/components/phase-two"
import PhaseThree from "@/components/phase-three"
import PhaseFour from "@/components/phase-four"
import RiskManagement from "@/components/risk-management"
import Results from "@/components/results"
import { useSound } from "@/hooks/use-sound"
import { StrategySlide } from "@/components/strategy-slide"
import { CategoryBoard } from "@/components/category-board"
import { DigitalMarketingAnimation } from "@/components/digital-marketing-animation"
import PlayerSelect from "@/components/player-select"

export default function Home() {
  const [player, setPlayer] = useState('')
  const playerList = ['player', 'facilitator']

  const [gameState, setGameState] = useState({
    player: '',
    phase: "player-select", // player-select, start, phase1, phase2, phase3, phase4, risk, results
    choices: {
      phase1: null,
      phase2: null,
      phase3: null,
      phase4: null,
      risk: null,
    },
    ep: {
      phase1: 0,
      phase2: 0,
      phase3: 0,
      phase4: 0,
      risk: 0,
    },
    customStrategyCost: 0,
  })

  const [strategySlide, setStrategySlide] = useState({
    isOpen: false,
    strategyId: undefined as string | undefined,
  })

  const [playerCapital, setPlayerCapital] = useState(1000000) // Starting capital of 1,000,000 IDR

  const { playBackgroundMusic, stopBackgroundMusic, playButtonSound } = useSound()

  useEffect(() => {
    // Start background music when the game loads
    playBackgroundMusic()

    // Event listener for strategy slide
    const handleShowStrategySlide = (e: CustomEvent) => {
      setStrategySlide({
        isOpen: true,
        strategyId: e.detail?.strategyId,
      })
    }

    window.addEventListener("showStrategySlide", handleShowStrategySlide as EventListener)

    // Clean up when component unmounts
    return () => {
      stopBackgroundMusic()
      window.removeEventListener("showStrategySlide", handleShowStrategySlide as EventListener)
    }
  }, [playBackgroundMusic, stopBackgroundMusic])

  const handlePhaseComplete = (phase: string, choice: any) => {
    playButtonSound() // Add sound effect when moving to next phase
    setGameState((prev) => ({
      ...prev,
      phase: getNextPhase(phase),
      choices: {
        ...prev.choices,
        [phase]: choice,
      },
    }))
  }

  const handlePreviousPhase = (currentPhase: string) => {
    playButtonSound() // Add sound effect when going to previous phase
    const phases = ["player-select", "start", "phase1", "phase2", "phase3", "phase4", "risk", "results"]
    const currentIndex = phases.indexOf(currentPhase)

    if (currentIndex > 0) {
      setGameState((prev) => ({
        ...prev,
        phase: phases[currentIndex - 1],
      }))
    }
  }

  const handleEPChange = (phase: string, ep: number) => {
    setGameState((prev) => ({
      ...prev,
      ep: {
        ...prev.ep,
        [phase]: ep,
      },
    }))
  }

  const handleCustomStrategyCost = (cost: number) => {
    setGameState((prev) => ({
      ...prev,
      customStrategyCost: cost,
    }))
    // Reduce capital by the custom strategy cost
    if (cost > 0) {
      setPlayerCapital((prev) => prev - cost)
    }
  }

  const getNextPhase = (currentPhase: string) => {
    const phases = ["player-select", "start", "phase1", "phase2", "phase3", "phase4", "risk", "results"]
    const currentIndex = phases.indexOf(currentPhase)
    return phases[currentIndex + 1]
  }

  const totalEP = Object.values(gameState.ep).reduce((sum, ep) => sum + ep, 0)

  // Get the appropriate animation type based on the current phase
  const getAnimationType = () => {
    switch (gameState.phase) {
      case "phase1":
        return "social"
      case "phase2":
        return "engagement"
      case "phase3":
        return "analytics"
      case "phase4":
        return "email"
      case "risk":
        return "search"
      default:
        return "social"
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-8 bg-retro-yellow">
      <div className="w-full max-w-5xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl text-retro-dark font-extrabold font-mono tracking-tight">From Buzz to Buy</h1>
          <p className="text-xl font-mono text-retro-dark">Marketing Funnel Game Based Learning</p>
        </div>

        <Card className="w-full shadow-xl border-t-[2px] border-l-[2px] border-r-[8px] border-b-[8px] border-[#333333] bg-[#FCDC94] rounded-xl overflow-clip">
          <CardHeader className="bg-retro-pink border-b-[2px] border-retro-dark">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <DigitalMarketingAnimation type={getAnimationType()} className="w-10 h-10 color-retro-dark" />
                <CardTitle className="text-2xl text-retro-dark font-bold">Boots by Millie</CardTitle>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-retro-dark px-4 py-2 rounded-full text-white shadow-md">
                  <span className="font-semibold">EP: {totalEP}</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            {gameState.phase !== "start" && gameState.phase !== "results" && gameState.phase !== "player-select" && (
              <CategoryBoard currentPhase={gameState.phase} />
            )}

            {gameState.phase === 'player-select' && (
              <PlayerSelect 
                playerList={playerList}
                player={player}
                setPlayer={(player: string) => setPlayer(player) }  
                onComplete={(player: string) => setGameState((prev) => ({ ...prev, phase: "start", player: player }))} 
              />
            )}

            {gameState.phase === "start" && (
              <GameStart 
                player={player}
                onPlayerSelect={() => setGameState((prev) => ({ ...prev, phase: "player-select" }))} 
                onComplete={() => setGameState((prev) => ({ ...prev, phase: "phase1" }))} />
            )}

            {gameState.phase === "phase1" && (
              <PhaseOne
                onComplete={(choice) => handlePhaseComplete("phase1", choice)}
                onPrevious={() => handlePreviousPhase("phase1")}
                capital={playerCapital}
                setCapital={setPlayerCapital}
                onEPChange={(ep) => handleEPChange("phase1", ep)}
              />
            )}
            {gameState.phase === "phase2" && (
              <PhaseTwo
                onComplete={(choice) => handlePhaseComplete("phase2", choice)}
                onPrevious={() => handlePreviousPhase("phase2")}
                capital={playerCapital}
                setCapital={setPlayerCapital}
                onEPChange={(ep) => handleEPChange("phase2", ep)}
              />
            )}
            {gameState.phase === "phase3" && (
              <PhaseThree
                onComplete={() => handlePhaseComplete("phase3", null)}
                onPrevious={() => handlePreviousPhase("phase3")}
                capital={playerCapital}
                onEPChange={(ep) => handleEPChange("phase3", ep)}
                onCustomStrategyCost={handleCustomStrategyCost}
              />
            )}
            {gameState.phase === "phase4" && (
              <PhaseFour
                onComplete={(choice) => handlePhaseComplete("phase4", choice)}
                onPrevious={() => handlePreviousPhase("phase4")}
                capital={playerCapital}
                setCapital={setPlayerCapital}
                onEPChange={(ep) => handleEPChange("phase4", ep)}
              />
            )}
            {gameState.phase === "risk" && (
              <RiskManagement
                onComplete={(choice) => handlePhaseComplete("risk", choice)}
                onPrevious={() => handlePreviousPhase("risk")}
                capital={playerCapital}
                onEPChange={(ep) => handleEPChange("risk", ep)}
              />
            )}
            {gameState.phase === "results" && (
              <Results
                choices={gameState.choices}
                onPrevious={() => handlePreviousPhase("results")}
                capital={playerCapital}
                totalEP={totalEP}
                epByPhase={gameState.ep}
                customStrategyCost={gameState.customStrategyCost}
              />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Strategy Slide */}
      <StrategySlide
        isOpen={strategySlide.isOpen}
        onClose={() => setStrategySlide({ isOpen: false, strategyId: undefined })}
        strategyId={strategySlide.strategyId}
      />
    </main>
  )
}
