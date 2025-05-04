"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"

interface EPInputProps {
  onEPChange: (ep: number) => void
  initialEP?: number
  stageName: string
}

export function EPInput({ onEPChange, initialEP = 0, stageName }: EPInputProps) {
  const [ep, setEP] = useState(initialEP)

  const handleEPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    if (!isNaN(value) && value >= 0) {
      setEP(value)
      onEPChange(value)
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="p-4 bg-gradient-to-r from-brown-50 to-white border-brown-200 mb-4">
        <div className="space-y-2">
          <Label htmlFor={`ep-${stageName}`} className="text-lg font-medium text-brown-800">
            How many EP did you get in this {stageName}?
          </Label>
          <p className="text-sm text-gray-600 mb-2">Enter the Engagement Points awarded to you by your instructor.</p>
          <Input
            id={`ep-${stageName}`}
            type="number"
            min="0"
            value={ep}
            onChange={handleEPChange}
            className="border-brown-200"
          />
        </div>
      </Card>
    </motion.div>
  )
}
