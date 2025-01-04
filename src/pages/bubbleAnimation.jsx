import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const BubbleAnimation = () => {
  const [bubbles, setBubbles] = useState([])

  useEffect(() => {
    const newBubbles = Array.from({ length: 20 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 100 + 50,
    }))
    setBubbles(newBubbles)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none">
      {bubbles.map((bubble, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full bg-white opacity-10"
          style={{
            left: bubble.x,
            top: bubble.y,
            width: bubble.size,
            height: bubble.size,
          }}
          initial={{ scale: 0 }}
          animate={{
            scale: [0, 1, 0.8, 1],
            opacity: [0, 0.2, 0.1, 0],
          }}
          transition={{
            duration: 4,
            ease: "easeInOut",
            delay: index * 0.1,
            repeat: Infinity,
            repeatDelay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  )
}

export default BubbleAnimation

