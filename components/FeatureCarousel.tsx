"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Feature {
  id: number
  title: string
  description: string
  image: string
}

interface FeatureCarouselProps {
  features: Feature[]
}

export default function FeatureCarousel({ features }: FeatureCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === features.length - 1 ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? features.length - 1 : prevIndex - 1))
  }

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="overflow-hidden rounded-xl shadow-lg">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {features.map((feature) => (
            <div key={feature.id} className="min-w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white">
                <div className="relative w-full h-64 md:h-80 lg:h-96 flex items-center justify-center">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="rounded-lg"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 focus:outline-none md:-translate-x-6"
        aria-label="Previous feature"
      >
        <ChevronLeft className="h-6 w-6 text-gray-700" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 focus:outline-none md:translate-x-6"
        aria-label="Next feature"
      >
        <ChevronRight className="h-6 w-6 text-gray-700" />
      </button>

      <div className="flex justify-center mt-6 space-x-2">
        {features.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 w-2 rounded-full transition-colors duration-300 ${index === currentIndex ? "bg-[#fc7e8d] w-6" : "bg-gray-300"
              }`}
            aria-label={`Go to feature ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}