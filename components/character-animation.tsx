"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

type Mood = "happy" | "sad" | "neutral"

interface CharacterAnimationProps {
  mood?: Mood
  width?: number
  height?: number
  alt?: string
  className?: string
}

export function CharacterAnimation({
  mood = "neutral",
  width = 200,
  height = 200,
  alt = "Millie",
  className = "",
}: CharacterAnimationProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const getImagePath = () => {
    switch (mood) {
      case "happy":
        return "/images/mille-happi.png"
      case "sad":
        return "/images/mille-sadge.png"
      case "neutral":
      default:
        return "/images/mille-flat.png"
    }
  }

  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 20,
      }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        animate={{
          y: [0, -10, 0],
          rotate: [0, 2, 0, -2, 0],
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 3,
          ease: "easeInOut",
        }}
      >
        <Image src={getImagePath() || "/placeholder.svg"} width={width} height={height} alt={alt} />
      </motion.div>
    </motion.div>
  )
}
