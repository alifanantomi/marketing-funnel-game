"use client"

import { useState, useEffect } from "react"
import { useSound } from "@/hooks/use-sound"

interface TypeAnimationProps {
  text: string
  className?: string
  delay?: number
  speed?: number
}

export function TypeAnimation({ text, className = "", delay = 0, speed = 30 }: TypeAnimationProps) {
  const [displayText, setDisplayText] = useState("")
  const [startTyping, setStartTyping] = useState(false)
  const { playTypingSound, stopTypingSound } = useSound()

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      setStartTyping(true)
    }, delay)

    return () => clearTimeout(delayTimer)
  }, [delay])

  useEffect(() => {
    if (!startTyping) return

    let currentIndex = 0
    playTypingSound() // Start typing sound when animation begins

    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayText(text.substring(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(interval)
        stopTypingSound() // Stop typing sound when animation ends
      }
    }, speed)

    return () => {
      clearInterval(interval)
      stopTypingSound() // Make sure to stop sound if component unmounts during animation
    }
  }, [text, speed, startTyping, playTypingSound, stopTypingSound])

  return <p className={className}>{displayText}</p>
}
