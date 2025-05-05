"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { TypeAnimation } from "@/components/type-animation"
import { AnimatePresence, motion } from "framer-motion"
import { useSound } from "@/hooks/use-sound"
import { CharacterAnimation } from "@/components/character-animation"
import { DigitalMarketingAnimation } from "@/components/digital-marketing-animation"
import client from "@/tina/__generated__/client"
import { useTina } from "tinacms/dist/react"
import { TinaMarkdown } from "tinacms/dist/rich-text"
import { MarkdownTyper } from "./markdown-typer"
import { formatIDR } from "@/lib/formatIDR"

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

  const[storyline, setStoryline] = useState<any>();
  const[setup, setSetup] = useState<any>();
  
  useEffect(() => {
    const fetchStoryline = async () => {
      const result = await client.queries.game_start({
        relativePath: "Storyline.md",
      });
      setStoryline(result);
    };

    const fetchGameSetup = async () => {
      const result = await client.queries.game_setup({
        relativePath: "Game-Setup.md",
      });
      setSetup(result);
    };

    fetchStoryline();
    fetchGameSetup();
  }, []);


  const storylineData = useTina({
    data: storyline?.data,
    query: storyline?.query,
    variables: storyline?.variables
  })
  
  const setupData = useTina({
    data: setup?.data,
    query: setup?.query,
    variables: setup?.variables
  })

  const storyline_title = storylineData?.data?.game_start?.title;
  const storyline_body = storylineData?.data?.game_start?.body;

  const game_setup_title = setupData?.data?.game_setup?.title
  const game_setup_body = setupData?.data?.game_setup?.body
  const game_setup_price = setupData?.data?.game_setup?.boot_price.toString()

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
                <h2 className="text-3xl font-bold text-retro-dark mb-4">{storyline_title}</h2>
                <div className="rounded-lg space-y-4 font-medium text-retro-dark">
                  <MarkdownTyper content={storyline_body} />
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
                <h2 className="text-2xl font-bold text-retro-dark mb-4">{game_setup_title}</h2>
                <div className="space-y-4">
                  <div className="text-retro-dark font-medium">
                    <MarkdownTyper content={game_setup_body} />
                  </div>

                  <div className="text-retro-green font-bold">
                    <TypeAnimation text={`Price: IDR ${formatIDR(game_setup_price)}/boots`} className="text-retro-green font-bold text-xl" delay={3000} />
                  </div>
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
                <h2 className="text-3xl font-bold text-retro-dark mb-4">Game Guidelines</h2>
                <div className="font-medium">
                  <TypeAnimation
                    text="This game runs through four exciting marketing stages: Attention, Interest, Desire, and Action. In each stage, players will be faced with strategic decisions designed to experience real-life brand choices."
                    className="mb-4"
                  />
                  <TypeAnimation
                    text="After making a choice, you'll have 2 minutes to pitch your reasoning and strategy. Think of it as your moment in the spotlight: explain why you picked that option, how you plan to execute it, and what outcome you expect."
                    className="mb-4"
                    delay={3000}
                  />
                  <TypeAnimation
                    text="Stage 3 is where things get even more real. Instead of choosing from fixed options, you'll be asked to create your own custom strategy plan complete with creative ideas and action steps."
                    className="mb-4"
                    delay={6000}
                  />
                  <TypeAnimation
                    text="At the end of the game, you'll see how your choices would impact Millie's business in the real world!"
                    className="mb-4"
                    delay={9000}
                  />
                  <TypeAnimation
                    text=" Psst.. psst.. Watch out, there will be huge problems that you will face at the end of the game. So, be prepared!"
                    className="mb-4 text-retro-green font-bold"
                    delay={11000}
                  />
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
