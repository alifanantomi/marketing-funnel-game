"use client"

import { useRef, useCallback, useEffect, useState } from "react"

export function useSound() {
  const typingSoundRef = useRef<HTMLAudioElement | null>(null)
  const buttonSoundRef = useRef<HTMLAudioElement | null>(null)
  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null)
  const successSoundRef = useRef<HTMLAudioElement | null>(null)
  const spinSoundRef = useRef<HTMLAudioElement | null>(null)
  const [soundsLoaded, setSoundsLoaded] = useState(false)
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("bgMusic") !== "off"
    }
    return true
  })

  // Initialize audio elements if they don't exist
  const initAudio = useCallback(() => {
    if (typeof window === "undefined") return

    if (!typingSoundRef.current) {
      typingSoundRef.current = new Audio("/sounds/typing.mp3")
      typingSoundRef.current.volume = 0.2
    }

    if (!buttonSoundRef.current) {
      buttonSoundRef.current = new Audio("/sounds/click-fun.mp3")
      buttonSoundRef.current.volume = 0.3
    }

    if (!backgroundMusicRef.current) {
      backgroundMusicRef.current = new Audio("/sounds/bg-sound.mp3")
      backgroundMusicRef.current.volume = 0.15
      backgroundMusicRef.current.loop = true
    }

    if (!successSoundRef.current) {
      successSoundRef.current = new Audio("/sounds/success.mp3")
      successSoundRef.current.volume = 0.3
    }

    if (!spinSoundRef.current) {
      spinSoundRef.current = new Audio("/sounds/spin.mp3")
      spinSoundRef.current.volume = 0.3
    }

    setSoundsLoaded(true)
  }, [])

  // Initialize sounds when component mounts
  useEffect(() => {
    initAudio()
  }, [initAudio])

  const playTypingSound = useCallback(() => {
    if (!soundsLoaded) return
    if (typingSoundRef.current) {
      typingSoundRef.current.currentTime = 0
      typingSoundRef.current.play().catch((e) => console.log("Audio play failed:", e))
    }
  }, [soundsLoaded])

  const stopTypingSound = useCallback(() => {
    if (typingSoundRef.current) {
      typingSoundRef.current.pause()
      typingSoundRef.current.currentTime = 0
    }
  }, [])

  const playButtonSound = useCallback(() => {
    if (!soundsLoaded) return
    if (buttonSoundRef.current) {
      buttonSoundRef.current.currentTime = 0
      buttonSoundRef.current.play().catch((e) => console.log("Audio play failed:", e))
    }
  }, [soundsLoaded])

  const playSuccessSound = useCallback(() => {
    if (!soundsLoaded) return
    if (successSoundRef.current) {
      successSoundRef.current.currentTime = 0
      successSoundRef.current.play().catch((e) => console.log("Audio play failed:", e))
    }
  }, [soundsLoaded])

  const playSpinSound = useCallback(() => {
    if (!soundsLoaded) return
    if (spinSoundRef.current) {
      spinSoundRef.current.currentTime = 0
      spinSoundRef.current.play().catch((e) => console.log("Audio play failed:", e))
    }
  }, [soundsLoaded])

  const playBackgroundMusic = useCallback(() => {
    if (!soundsLoaded) return
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.play().catch((e) => console.log("Audio play failed:", e))
    }
  }, [soundsLoaded])

  const stopBackgroundMusic = useCallback(() => {
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.pause()
      backgroundMusicRef.current.currentTime = 0
    }
  }, [])

  const toggleBackgroundMusic = useCallback(() => {
    const newState = !isMusicPlaying
    setIsMusicPlaying(newState)
    localStorage.setItem("bgMusic", newState ? "on" : "off")
    if (newState) {
      playBackgroundMusic()
    } else {
      stopBackgroundMusic()
    }
  }, [isMusicPlaying, playBackgroundMusic, stopBackgroundMusic])

  return {
    playTypingSound,
    stopTypingSound,
    playButtonSound,
    playSuccessSound,
    playSpinSound,
    playBackgroundMusic,
    stopBackgroundMusic,
    toggleBackgroundMusic,
    isMusicPlaying
  }
}
