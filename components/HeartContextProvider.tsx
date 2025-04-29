"use client"

import React, { createContext, useState, useContext, ReactNode } from "react"
import HeartAnimation from "@/components/Hearts"

interface HeartAnimationInstance {
  id: string
  x: number
  y: number
  color: string
}

interface AnimationContextType {
  createHeartAnimation: (x: number, y: number, color: string) => void
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined)

export function AnimationProvider({ children }: { children: ReactNode }) {
  const [animations, setAnimations] = useState<HeartAnimationInstance[]>([])

  const createHeartAnimation = (x: number, y: number, color: string) => {
    const animationId = `anim-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    
    setTimeout(() => {
      setAnimations(prev => [...prev, { id: animationId, x, y, color }])
    }, Math.random() * 100)
  }

  const removeAnimation = (animationId: string) => {
    setAnimations(prev => prev.filter(anim => anim.id !== animationId))
  }

  return (
    <AnimationContext.Provider value={{ createHeartAnimation }}>
      {children}

      <div 
        className="fixed inset-0 pointer-events-none z-50"
        style={{ 
          overflow: 'hidden',
          // Setting a very high z-index to ensure it's on top of everything
          zIndex: 9999 
        }}
        aria-hidden="true"
      >
        {animations.map(anim => (
          <HeartAnimation
            key={anim.id}
            color={anim.color}
            posX={anim.x}
            posY={anim.y}
            onComplete={() => removeAnimation(anim.id)}
          />
        ))}
      </div>
    </AnimationContext.Provider>
  )
}

export function useAnimation() {
  const context = useContext(AnimationContext)
  if (context === undefined) {
    throw new Error("useAnimation must be used within an AnimationProvider")
  }
  return context
}