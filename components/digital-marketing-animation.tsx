"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Share2, TrendingUp, Users, Zap, MessageCircle, Heart, ThumbsUp, Search, Mail } from "lucide-react"

interface DigitalMarketingAnimationProps {
  type: "social" | "analytics" | "engagement" | "search" | "email"
  className?: string
}

export function DigitalMarketingAnimation({ type, className = "" }: DigitalMarketingAnimationProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  if (type === "social") {
    return (
      <motion.div
        className={`relative flex items-center justify-center ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
      >
        <motion.div
          className="absolute"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 5, 0, -5, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 5,
            ease: "easeInOut",
          }}
        >
          <Share2 size={40} className="text-[#333333]" />
        </motion.div>

        <motion.div
          className="absolute"
          initial={{ scale: 0, x: 0, y: 0 }}
          animate={{
            scale: [0, 1, 0],
            x: [0, 30, 60],
            y: [0, -30, -60],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 3,
            delay: 1,
            ease: "easeOut",
          }}
        >
          <Heart size={20} className="text-retro-pink" />
        </motion.div>

        <motion.div
          className="absolute"
          initial={{ scale: 0, x: 0, y: 0 }}
          animate={{
            scale: [0, 1, 0],
            x: [0, -40, -80],
            y: [0, -20, -40],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 4,
            delay: 2,
            ease: "easeOut",
          }}
        >
          <ThumbsUp size={20} className="text-retro-purple" />
        </motion.div>

        <motion.div
          className="absolute"
          initial={{ scale: 0, x: 0, y: 0 }}
          animate={{
            scale: [0, 1, 0],
            x: [0, 20, 40],
            y: [0, 30, 60],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 3.5,
            delay: 0.5,
            ease: "easeOut",
          }}
        >
          <MessageCircle size={20} className="text-retro-blue" />
        </motion.div>
      </motion.div>
    )
  }

  if (type === "analytics") {
    return (
      <motion.div
        className={`relative flex items-end justify-center h-24 ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
      >
        <motion.div
          className="w-6 h-12 bg-retro-blue rounded-t-md mx-1"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{ transformOrigin: "bottom" }}
        />
        <motion.div
          className="w-6 h-16 bg-retro-purple rounded-t-md mx-1"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          style={{ transformOrigin: "bottom" }}
        />
        <motion.div
          className="w-6 h-20 bg-retro-pink rounded-t-md mx-1"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          style={{ transformOrigin: "bottom" }}
        />
        <motion.div
          className="w-6 h-14 bg-retro-coral rounded-t-md mx-1"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          style={{ transformOrigin: "bottom" }}
        />
        <motion.div
          className="w-6 h-18 bg-retro-green rounded-t-md mx-1"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1, delay: 1 }}
          style={{ transformOrigin: "bottom" }}
        />

        <motion.div
          className="absolute -top-8 right-0"
          animate={{
            y: [0, -5, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 3,
            ease: "easeInOut",
          }}
        >
          <TrendingUp size={24} className="text-retro-green" />
        </motion.div>
      </motion.div>
    )
  }

  if (type === "engagement") {
    return (
      <motion.div
        className={`relative flex items-center justify-center ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
      >
        <motion.div
          className="relative"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 2,
            ease: "easeInOut",
          }}
        >
          <Users size={40} className="text-retro-purple" />

          <motion.div
            className="absolute -top-2 -right-2 w-4 h-4 bg-retro-pink rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0.5, 1],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 2,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        <motion.div
          className="absolute"
          initial={{ scale: 0, x: 0, y: 0 }}
          animate={{
            scale: [0, 1, 0],
            x: [0, 30, 60],
            y: [0, -20, -40],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 3,
            delay: 1,
            ease: "easeOut",
          }}
        >
          <Zap size={20} className="text-retro-yellow" />
        </motion.div>

        <motion.div
          className="absolute"
          initial={{ scale: 0, x: 0, y: 0 }}
          animate={{
            scale: [0, 1, 0],
            x: [0, -30, -60],
            y: [0, -10, -20],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 2.5,
            delay: 0.5,
            ease: "easeOut",
          }}
        >
          <Heart size={20} className="text-retro-pink" />
        </motion.div>
      </motion.div>
    )
  }

  if (type === "search") {
    return (
      <motion.div
        className={`relative flex items-center justify-center ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
      >
        <motion.div
          className="relative"
          animate={{
            rotate: [0, 10, 0, -10, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 5,
            ease: "easeInOut",
          }}
        >
          <Search size={40} className="text-retro-blue" />
        </motion.div>

        <motion.div
          className="absolute top-0 left-0 w-full h-full"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: [0.8, 1.2, 0.8],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 3,
            ease: "easeInOut",
          }}
        >
          <Search size={40} className="text-retro-blue opacity-30" />
        </motion.div>

        <motion.div
          className="absolute"
          initial={{ opacity: 0, y: 0 }}
          animate={{
            opacity: [0, 1, 0],
            y: [0, 30, 60],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 3,
            delay: 1,
            ease: "easeOut",
          }}
        >
          <div className="px-2 py-1 bg-retro-blue text-white text-xs rounded">SEO</div>
        </motion.div>
      </motion.div>
    )
  }

  if (type === "email") {
    return (
      <motion.div
        className={`relative flex items-center justify-center ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
      >
        <motion.div
          className="relative"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 3,
            ease: "easeInOut",
          }}
        >
          <Mail size={40} className="text-retro-purple" />
        </motion.div>

        <motion.div
          className="absolute"
          initial={{ scale: 0, x: 0, y: 0 }}
          animate={{
            scale: [0, 1, 0],
            x: [0, 40, 80],
            y: [0, -20, -40],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 3,
            delay: 0.5,
            ease: "easeOut",
          }}
        >
          <Mail size={20} className="text-retro-pink" />
        </motion.div>

        <motion.div
          className="absolute"
          initial={{ scale: 0, x: 0, y: 0 }}
          animate={{
            scale: [0, 1, 0],
            x: [0, -40, -80],
            y: [0, -10, -20],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 2.5,
            delay: 1,
            ease: "easeOut",
          }}
        >
          <Mail size={15} className="text-retro-blue" />
        </motion.div>
      </motion.div>
    )
  }

  return null
}
