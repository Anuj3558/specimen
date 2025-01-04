"use client"

import React, { useState, useEffect, useRef } from 'react'



const PerspectiveCarousel = () => {
  const [scrollProgress, setScrollProgress] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const slides = [
    {
      title: "The Ever-Expanding World",
      image: "/placeholder.svg?height=400&width=800",
      bgColor: "bg-white"
    },
    {
      title: "Art X Code",
      image: "/placeholder.svg?height=400&width=800",
      bgColor: "bg-blue-600"
    },
    {
      title: "Design Overview",
      image: "/placeholder.svg?height=400&width=800",
      bgColor: "bg-gray-900"
    },
    {
      title: "Project Index",
      image: "/placeholder.svg?height=400&width=800",
      bgColor: "bg-gray-100"
    }
  ]

  useEffect(() => {
    const container = containerRef.current
    let requestId
    let lastScrollTop = 0
    const maxScroll = (slides.length - 1) * 100 // 100 represents 100% per slide
    
    const handleScroll = (e) => {
      e.preventDefault()
      const scrollDelta = e.deltaY
      
      // Make scrolling smoother by reducing the delta
      lastScrollTop += scrollDelta * 0.5
      
      // Clamp the scroll value between 0 and maxScroll
      lastScrollTop = Math.max(0, Math.min(lastScrollTop, maxScroll))
      
      // Use requestAnimationFrame for smooth animation
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
  }, [slides.length])

  const getActiveIndex = () => Math.round(scrollProgress / 100)

  const getSlideStyles = (index) => {
    const progress = scrollProgress / 100 // Convert to 0-1 range per slide
    const offset = index - progress
    
    return {
      transform: `
        translateX(${offset * 10}%) 
        translateY(${offset * 10}%) 
        translateZ(${-Math.abs(offset) * 100}px)
        scale(${1 - Math.abs(offset) * 0.1})
      `,
      opacity: Math.max(0, 1 - Math.abs(offset) * 0.5),
      filter: `blur(${Math.abs(offset) * 2}px)`,
    }
  }

  return (
    <div 
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-gray-900"
    >
      <div 
        className="absolute top-0 left-0 w-full h-full" 
        style={{ 
          perspective: '1500px',
          transformStyle: 'preserve-3d',
        }}
      >
        <div 
          className="relative w-full h-full"
          style={{ 
            transform: 'rotateX(45deg) rotateZ(-45deg)',
            transformStyle: 'preserve-3d',
          }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute top-1/2 left-1/2 w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 
                         transition-all duration-700 ease-out ${slide.bgColor} shadow-2xl`}
              style={getSlideStyles(index)}
            >
              <div className="aspect-[16/9] relative">
                <img 
                  src={slide.image} 
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 p-8 flex flex-col justify-between">
                  <h2 className="text-3xl font-bold text-white mix-blend-difference">
                    {slide.title}
                  </h2>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress indicators */}
      <div className="fixed bottom-8 right-8 z-50 flex gap-4">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 
              ${index === getActiveIndex() ? 'bg-blue-600 scale-125' : 'bg-gray-400'}`}
            aria-label={`Slide ${index + 1} of ${slides.length}`}
          />
        ))}
      </div>

      {/* Scroll instruction */}
      <div className="fixed bottom-8 left-8 z-50 text-white/70 text-sm">
        Scroll to navigate
      </div>
    </div>
  )
}

export default PerspectiveCarousel

