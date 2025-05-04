"use client"

import type React from "react"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { Award, DollarSign, Copy, Camera, TrendingUp, Star } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useSound } from "@/hooks/use-sound"
import { CharacterAnimation } from "@/components/character-animation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"

export default function Results({
  choices,
  onPrevious,
  capital,
  totalEP,
  epByPhase,
  customStrategyCost,
}: {
  choices: any
  onPrevious: () => void
  capital: number
  totalEP: number
  epByPhase: Record<string, number>
  customStrategyCost: number
}) {
  const [showDetails, setShowDetails] = useState(false)
  const [bootsSold, setBootsSold] = useState(0)
  const { playButtonSound } = useSound()
  const resultsRef = useRef<HTMLDivElement>(null)
  const [exporting, setExporting] = useState(false)

  // Calculate revenue and profit
  const pricePerBoot = 350000 // IDR 350,000 per boot
  const revenue = bootsSold * pricePerBoot
  const totalProfit = revenue + capital // Total profit = Revenue + Remaining Capital

  const handleBootsSoldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    if (!isNaN(value) && value >= 0) {
      setBootsSold(value)
    }
  }

  // Export as PDF
  const exportAsPDF = async () => {
    if (!resultsRef.current) return

    setExporting(true)
    playButtonSound()

    try {
      const canvas = await html2canvas(resultsRef.current, {
        scale: 2,
        logging: false,
        useCORS: true,
        backgroundColor: "#ffffff",
      })

      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      const imgWidth = 210
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight)
      pdf.save("boots-by-millie-results.pdf")
    } catch (error) {
      console.error("Error exporting PDF:", error)
    } finally {
      setExporting(false)
    }
  }

  // Export as image
  const exportAsImage = async () => {
    if (!resultsRef.current) return

    setExporting(true)
    playButtonSound()

    try {
      const canvas = await html2canvas(resultsRef.current, {
        scale: 2,
        logging: false,
        useCORS: true,
        backgroundColor: "#ffffff",
      })

      const link = document.createElement("a")
      link.download = "boots-by-millie-results.png"
      link.href = canvas.toDataURL("image/png")
      link.click()
    } catch (error) {
      console.error("Error exporting image:", error)
    } finally {
      setExporting(false)
    }
  }

  // Copy results to clipboard
  const copyToClipboard = () => {
    playButtonSound()

    const resultsText = `
Boots by Millie - Game Results
------------------------------
Boots Sold: ${bootsSold} pairs
Total Revenue: IDR ${revenue.toLocaleString()}
Remaining Capital: IDR ${capital.toLocaleString()}
Total Profit: IDR ${totalProfit.toLocaleString()}
Total EP: ${totalEP}
    `

    navigator.clipboard
      .writeText(resultsText)
      .then(() => {
        alert("Results copied to clipboard!")
      })
      .catch((err) => {
        console.error("Failed to copy results:", err)
      })
  }

  return (
    <div className="space-y-6">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div ref={resultsRef} className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6 items-center mb-6">
              <div className="w-full md:w-1/4 flex justify-center">
                <CharacterAnimation mood="happy" width={150} height={150} />
              </div>
              <div className="w-full md:w-3/4">
                <div className="bg-gradient-to-r from-brown-100 to-brown-50 p-6 rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-3xl font-bold text-retro-dark">Game Results</h2>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="bg-white border-brown-300 text-retro-dark hover:bg-brown-50"
                          disabled={exporting}
                        >
                          {exporting ? "Exporting..." : "Export Results"} <Camera className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={exportAsPDF}>
                          <Camera className="mr-2 h-4 w-4" /> Export as PDF
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={exportAsImage}>
                          <Camera className="mr-2 h-4 w-4" /> Save as Image
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={copyToClipboard}>
                          <Copy className="mr-2 h-4 w-4" /> Copy to Clipboard
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="mb-6">
                    <Label htmlFor="boots-sold" className="text-lg font-medium mb-2 block">
                      How many boots did you sell?
                    </Label>
                    <Input
                      id="boots-sold"
                      type="number"
                      min="0"
                      value={bootsSold}
                      onChange={handleBootsSoldChange}
                      className="mb-4"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-6">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Card className="bg-white border-brown-200 h-full">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg flex items-center justify-center">
                            <Award className="mr-2 text-brown-600" size={20} />
                            Boots Sold
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                          <p className="text-3xl font-bold text-brown-600">{bootsSold} pairs</p>
                        </CardContent>
                      </Card>
                    </motion.div>

                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Card className="bg-white border-brown-200 h-full">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg flex items-center justify-center">
                            <DollarSign className="mr-2 text-brown-600" size={20} />
                            Total Revenue
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                          <p className="text-3xl font-bold text-brown-600">IDR {revenue.toLocaleString()}</p>
                        </CardContent>
                      </Card>
                    </motion.div>

                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      <Card className="bg-white border-brown-200 h-full">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg flex items-center justify-center">
                            <TrendingUp className="mr-2 text-brown-600" size={20} />
                            Total Profit
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                          <p className="text-3xl font-bold text-brown-600">IDR {totalProfit.toLocaleString()}</p>
                        </CardContent>
                      </Card>
                    </motion.div>

                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.8 }}
                    >
                      <Card className="bg-white border-brown-200 h-full">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg flex items-center justify-center">
                            <Star className="mr-2 text-brown-600" size={20} />
                            Total EP
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                          <p className="text-3xl font-bold text-brown-600">{totalEP} points</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>

                  <Button
                    onClick={() => {
                      setShowDetails(!showDetails)
                      playButtonSound()
                    }}
                    variant="outline"
                    className="bg-white border-brown-300 text-retro-dark hover:bg-brown-50"
                  >
                    {showDetails ? "Hide Details" : "Show Details"}
                  </Button>
                </div>
              </div>
            </div>

            {showDetails && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="space-y-4 overflow-hidden"
              >
                <h3 className="text-xl font-bold text-retro-dark">Game Journey</h3>

                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="bg-brown-100 rounded-full w-8 h-8 flex items-center justify-center text-retro-dark font-bold mr-3">
                      1
                    </div>
                    <p className="text-gray-700">
                      <span className="font-semibold">Attention Phase:</span> You chose a strategy to attract customers
                      to Millie's boots. <span className="text-brown-600 font-medium">EP: {epByPhase.phase1}</span>
                    </p>
                  </div>

                  <div className="flex items-center">
                    <div className="bg-brown-100 rounded-full w-8 h-8 flex items-center justify-center text-retro-dark font-bold mr-3">
                      2
                    </div>
                    <p className="text-gray-700">
                      <span className="font-semibold">Interest Phase:</span> You built interest in Millie's brand and
                      products. <span className="text-brown-600 font-medium">EP: {epByPhase.phase2}</span>
                    </p>
                  </div>

                  <div className="flex items-center">
                    <div className="bg-brown-100 rounded-full w-8 h-8 flex items-center justify-center text-retro-dark font-bold mr-3">
                      3
                    </div>
                    <p className="text-gray-700">
                      <span className="font-semibold">Desire Phase:</span> You created a custom strategy to make
                      customers want the boots.{" "}
                      <span className="text-brown-600 font-medium">EP: {epByPhase.phase3}</span>
                    </p>
                  </div>

                  <div className="flex items-center">
                    <div className="bg-brown-100 rounded-full w-8 h-8 flex items-center justify-center text-retro-dark font-bold mr-3">
                      4
                    </div>
                    <p className="text-gray-700">
                      <span className="font-semibold">Action Phase:</span> You implemented a payment strategy to
                      facilitate purchases. <span className="text-brown-600 font-medium">EP: {epByPhase.phase4}</span>
                    </p>
                  </div>

                  <div className="flex items-center">
                    <div className="bg-brown-100 rounded-full w-8 h-8 flex items-center justify-center text-retro-dark font-bold mr-3">
                      5
                    </div>
                    <p className="text-gray-700">
                      <span className="font-semibold">Risk Management:</span> You handled an unexpected business
                      challenge. <span className="text-brown-600 font-medium">EP: {epByPhase.risk}</span>
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-xl font-bold text-retro-dark mb-2">Financial Summary</h3>
                  <div className="bg-gray-50 p-4 rounded-lg w-fit">
                    <div className="grid grid-cols-2 gap-2">
                      <p className="text-gray-600">Boots Sold:</p>
                      <p className="text-gray-800 font-semibold">{bootsSold} pairs</p>

                      <p className="text-gray-600">Revenue (IDR 350,000/boot):</p>
                      <p className="text-gray-800 font-semibold">IDR {revenue.toLocaleString()}</p>

                      <p className="text-gray-600">Remaining Capital:</p>
                      <p className="text-gray-800 font-semibold">IDR {capital.toLocaleString()}</p>

                      <p className="text-gray-600">Custom Strategy Cost:</p>
                      <p className="text-gray-800 font-semibold">IDR {customStrategyCost.toLocaleString()}</p>

                      <p className="text-gray-600">Total Profit:</p>
                      <p className="text-gray-800 font-semibold">IDR {totalProfit.toLocaleString()}</p>

                      <p className="text-gray-600">Total EP:</p>
                      <p className="text-gray-800 font-semibold">{totalEP} points</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Button onClick={onPrevious} className="bg-white border border-brown-300 text-retro-dark hover:bg-brown-50">
              Previous
            </Button>
            <Button
              onClick={() => {
                window.location.reload()
                playButtonSound()
              }}
              className="w-full bg-retro-yellow hover:bg-retro-yellow hover:opacity-90 text-retro-dark font-bold py-2 px-6 rounded-lg border-[2px] border-retro-dark shadow-md"
              >
              Play Again
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
