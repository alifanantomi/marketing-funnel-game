"use client"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { useSound } from "@/hooks/use-sound"

interface StrategySlideProps {
  isOpen: boolean
  onClose: () => void
  strategyId?: string
}

export function StrategySlide({ isOpen, onClose, strategyId }: StrategySlideProps) {
  const { playButtonSound } = useSound()

  const handleClose = () => {
    playButtonSound()
    onClose()
  }

  // Since we don't need to show any descriptions, we can simplify this component
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClose()
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl"
          >
            <h2 className="text-2xl font-bold text-brown-800 mb-4 text-center">Strategy Selected</h2>
            <p className="text-center text-gray-700 mb-6">You have 2 minutes to explain your strategy!</p>
            <div className="flex justify-center">
              <Button onClick={handleClose} className="bg-brown-600 hover:bg-brown-700">
                Close
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
