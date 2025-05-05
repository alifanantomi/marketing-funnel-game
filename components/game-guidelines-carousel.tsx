import { useEffect, useState } from "react"
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel"
import { Card, CardContent, CardHeader } from "./ui/card"
import { game_guidelines } from "@/commons/game-guidelines"

export default function GameGuidelinesCarousel() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)
  const [Components, setComponents] = useState<React.FC[]>([])

  useEffect(() => {
    if (!api) return
    setCount(game_guidelines.length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  useEffect(() => {
    const loadComponents = async () => {
      const loaded = await Promise.all(
        game_guidelines.map(item => item.mdPath().then(mod => mod.default))
      )
      setComponents(loaded)
    }
    loadComponents()
  }, [])

  return (
    <div className="w-full">
      <Carousel setApi={setApi} className="mx-auto w-full max-w-[12rem] md:max-w-md lg:max-w-lg">
        <CarouselContent>
          {Components.map((GuidelineComponent, index) => (
            <CarouselItem key={index}>
              <Card className="border-retro-dark border-l-2 border-t-2 border-b-4 border-r-4 bg-retro-blue overflow-clip">
                <CardHeader className="border-retro-dark border-b-2 py-4">
                  <h3 className="text-retro-dark text-lg font-bold text-center">
                    {game_guidelines[index].title}
                  </h3>
                </CardHeader>
                <CardContent className="p-6 space-y-4 bg-white font-medium max-h-96 overflow-scroll">
                  <GuidelineComponent />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="py-2 text-center text-sm font-medium text-retro-dark">
        Slide {current} of {count}
      </div>
    </div>
  )
}
