"use client"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type React from "react"

import { Button } from "@/components/ui/button"
import { useSound } from "@/hooks/use-sound"
import { motion } from "framer-motion"

type Strategy = {
  id: string
  title: string
  cost: number
  description: string
}

export function StrategyCard({
  strategy,
  isSelected,
  onSelect,
  onConfirm,
}: {
  strategy: Strategy
  isSelected: boolean
  onSelect: () => void
  onConfirm: () => void
}) {
  const { playButtonSound, playSuccessSound } = useSound()

  const handleClick = () => {
    playButtonSound()
    if (!isSelected) {
      onSelect()
    }
  }

  const handleConfirm = (e: React.MouseEvent) => {
    e.stopPropagation()
    playSuccessSound()
    onConfirm()
  }

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Card
        className={`cursor-pointer transition-all duration-300  ${
          isSelected
            ? "bg-[#ffecd2e6] rounded-md border-retro-dark border-[2px]"
            : "border-retro-yellow/20 hover:border-retro-yellow/50 bg-retro-card"
        }`}
        onClick={handleClick}
      >
        <CardHeader className="pb-2">
          <CardTitle className={`text-lg font-semibold ${isSelected ? "text-retro-dark" : "text-retro-dark"}`}>
            {strategy.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">{strategy.description}</p>
        </CardContent>
        <CardFooter className="pt-0 flex flex-col items-start">
          <p className={`text-lg font-semibold ${isSelected ? "text-retro-coral" : "text-gray-700"} mb-2`}>
            IDR {strategy.cost.toLocaleString()}
          </p>
          {isSelected && (
            <Button
              onClick={handleConfirm}
              className="w-full bg-retro-green hover:bg-retro-green hover:opacity-90 text-white shadow-md transform transition-transform hover:scale-105 active:scale-95"
            >
              Choose this strategy
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  )
}
