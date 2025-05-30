import { useEffect, useState } from "react"
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel"
import { Card, CardContent, CardHeader } from "./ui/card"
import { facilitator_guidelines } from "@/commons/facilitator-guidelines"

export default function FacilitatorGuidelinesCarousel() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)
  const [Components, setComponents] = useState<React.FC[]>([])

  useEffect(() => {
    if (!api) return
    setCount(facilitator_guidelines.length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  useEffect(() => {
    const loadComponents = async () => {
      const loaded = await Promise.all(
        facilitator_guidelines.map(item => item.mdPath().then(mod => mod.default))
      )
      setComponents(loaded)
    }
    loadComponents()
  }, [])

  return (
    <div className="w-full">
      <Carousel
        opts={{
          align: "start",
          loop: true
        }}
        setApi={setApi} 
        className="relative h-fit w-full md:max-w-md lg:max-w-lg mx-auto"
      >        
        <CarouselContent>
          {Components.map((GuidelineComponent, index) => (
            <CarouselItem key={index}>
              <Card className="border-retro-dark border-l-2 border-t-2 border-b-4 border-r-4 bg-retro-blue overflow-clip">
                <CardHeader className="border-retro-dark border-b-2 py-4">
                  <h3 className="text-retro-dark text-lg font-bold text-center">
                    {facilitator_guidelines[index].title}
                  </h3>
                </CardHeader>
                <CardContent className="markdown-content p-6 space-y-4 bg-white font-medium h-96 max-h-96 overflow-scroll">
                  <GuidelineComponent />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden sm:inline">
          <CarouselPrevious />
          <CarouselNext />
        </div>
        <div className="absolute left-1/2 bottom-0">
          <div className="relative mx-auto sm:hidden">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </div>
      </Carousel>
      <div className="pt-8 text-center text-sm font-medium text-retro-dark">
        Slide {current} of {count}
      </div>
    </div>
  )
}
