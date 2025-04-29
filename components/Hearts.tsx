import { useState, useEffect } from "react"

interface Heart {
  id: string
  x: number
  y: number
  scale: number
  rotation: number
  opacity: number
  delay: number
  duration: number
  distance: number
  direction: number
}

interface HeartAnimationProps {
  color: string
  posX: number
  posY: number
  onComplete: () => void
}

export default function HeartAnimation({ color, posX, posY, onComplete }: HeartAnimationProps) {
  const [hearts, setHearts] = useState<Heart[]>([])
  
  useEffect(() => {
    const newHearts: Heart[] = Array.from({ length: 15 }, (_, i) => {
      const direction = Math.random() * 360 // Direction in degrees
      
      return {
        id: `heart-${i}-${Date.now()}`,
        x: Math.random() * 60 - 30, // Random initial offset from center point
        y: Math.random() * 60 - 30, // Random initial offset
        scale: 0.4 + Math.random() * 0.8, // Random size
        rotation: Math.random() * 60 - 30, // Random rotation
        opacity: 0.9,
        delay: i * 80, // Staggered animation start
        duration: 1500 + Math.random() * 2000, // Random animation duration
        distance: 100 + Math.random() * 300, // Random float distance
        direction: direction, // Direction in degrees
      }
    })
    
    setHearts(newHearts)
    
    // Clean up animation
    const maxDuration = Math.max(...newHearts.map(h => h.duration + h.delay)) + 500
    const timeout = setTimeout(() => {
      onComplete()
    }, maxDuration)
    
    return () => clearTimeout(timeout)
  }, [onComplete])
  
  return (
    <div className="absolute pointer-events-none" style={{ left: posX, top: posY }}>
      {hearts.map((heart) => {
        // Calculate the final position based on direction and distance
        const directionRad = (heart.direction * Math.PI) / 180
        const finalX = Math.cos(directionRad) * heart.distance
        const finalY = Math.sin(directionRad) * heart.distance
        
        return (
          <div
            key={heart.id}
            className="absolute"
            style={{
              animation: `heartfloat-${heart.id} ${heart.duration}ms ease-out ${heart.delay}ms forwards`,
              color: color,
              opacity: 0
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
            <style jsx>{`
              @keyframes heartfloat-${heart.id} {
                0% {
                  transform: translate(${heart.x}px, ${heart.y}px) scale(${heart.scale * 0.5}) rotate(${heart.rotation}deg);
                  opacity: 0;
                }
                10% {
                  opacity: 1;
                }
                70% {
                  opacity: 0.8;
                }
                100% {
                  transform: translate(${finalX}px, ${finalY}px) scale(${heart.scale}) rotate(${heart.rotation + Math.random() * 360}deg);
                  opacity: 0;
                }
              }
            `}</style>
          </div>
        )
      })}
    </div>
  )
}