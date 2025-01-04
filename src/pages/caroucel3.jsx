"use client"

import React, { useState, useRef, useEffect } from 'react'



const StackedCards = () => {
  const [scrollProgress, setScrollProgress] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const cards = [
    {
      title: "The Ever-Expanding World",
      image: "/placeholder.svg?height=800&width=1200",
      category: "Editorial"
    },
    {
      title: "Art X Code",
      image: "/placeholder.svg?height=800&width=1200",
      category: "Development"
    },
    {
      title: "Design Overview",
      image: "/placeholder.svg?height=800&width=1200",
      category: "Case Study"
    },
    {
      title: "Project Index",
      image: "/placeholder.svg?height=800&width=1200",
      category: "Archive"
    }
  ]

  useEffect(() => {
    const container = containerRef.current
    let requestId
    let lastScrollTop = 0
    const maxScroll = (cards.length - 1) * 100
    
    const handleScroll = (e) => {
      e.preventDefault()
      const scrollDelta = e.deltaY
      lastScrollTop += scrollDelta * 0.5
      lastScrollTop = Math.max(0, Math.min(lastScrollTop, maxScroll))
      
      requestId = requestAnimationFrame(() => {
        setScrollProgress(lastScrollTop)
      })
    }

    if (container) {
      container.addEventListener('wheel', handleScroll, { passive: false })
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleScroll)
      }
      if (requestId) {
        cancelAnimationFrame(requestId)
      }
    }
  }, [cards.length])

  const getCardStyles = (index) => {
    const progress = scrollProgress / 100
    const offset = index - progress
    
    return {
      transform: `
        translate3d(${-offset * 8}%, ${offset * 8}%, ${-Math.abs(offset) * 50}px)
        scale(${1 - Math.abs(offset) * 0.05})
      `,
      opacity: Math.max(0, 1 - Math.abs(offset) * 0.3),
      zIndex: cards.length - index,
    }
  }

  return (
    <div 
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-white"
    >
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full p-6 flex justify-between z-50 text-sm">
        <div className="flex gap-8">
          <span className="hover:opacity-50 cursor-pointer">UNVEIL</span>
          <span className="hover:opacity-50 cursor-pointer">PROJECTS</span>
        </div>
        <div className="flex gap-8">
          <span className="hover:opacity-50 cursor-pointer">STUDIO</span>
          <span className="hover:opacity-50 cursor-pointer">CONTACT</span>
        </div>
      </nav>

      {/* Cards Container */}
      <div 
        className="absolute top-0 left-0 w-full h-full"
        style={{ 
          perspective: '2000px',
          transformStyle: 'preserve-3d'
        }}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {cards.map((card, index) => (
            <div
              key={index}
              className="absolute w-[800px] aspect-[3/2] cursor-pointer"
              style={getCardStyles(index)}
            >
              <div 
                className="group relative w-full h-full bg-white shadow-lg transition-transform duration-500 ease-out hover:translate-x-4 hover:-translate-y-4"
              >
                <img 
                  src={card.image} 
                  alt={card.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 p-8 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50">
                  <div className="text-white">
                    <p className="text-sm font-light">{card.category}</p>
                    <h2 className="text-2xl font-light mt-2">{card.title}</h2>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="fixed bottom-6 right-6 text-sm opacity-50">
        Scroll to explore
      </div>
    </div>
  )
}

export default StackedCards

