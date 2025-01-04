import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BubbleAnimation from "./bubbleAnimation"

const AnimatedNumbers = () => {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showBubbles, setShowBubbles] = useState(false);
  const [pageFade, setPageFade] = useState(false);
  const [themeTransition, setThemeTransition] = useState(false);
  const numbers = ["00", "27", "59"];

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev < numbers.length - 1) {
          return prev + 1;
        }
        clearInterval(interval);
        setTimeout(() => setShowBubbles(true), 50);
        setTimeout(() => {
          setPageFade(true);
          setThemeTransition(true);
          setTimeout(() => {
            // Handle navigation to the home page in React.js
             // Replace with your routing logic
          }, 1000); // Adjust the delay as needed
        }, 2000);
        return prev;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [numbers.length]);

  return (
    <motion.div
      className={`relative min-h-screen overflow-hidden text-white ${
        themeTransition ? "theme-light" : "theme-dark"
      }`}
      animate={{ opacity: pageFade ? 0 : 1 }}
      transition={{ duration: 1 }}
    >
      <div className="h-screen flex absolute items-center left-[40vw] justify-center">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
      >
        {/* Animated Text */}
        <motion.div
          className="text-4xl lg:text-6xl  tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Specimen
        </motion.div>

        {/* Loading Bar */}
        <motion.div
          className="mt-6 h-1.5 bg-white rounded-full"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          style={{ originX: 0 }}
        />
      </motion.div>
    </div>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="fixed top-0 w-full flex justify-between items-center p-8 z-20"
      >
        <motion.div
          className="space-y-1"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <div className="text-sm tracking-wider">DESIGN DISTILLED</div>
          <div className="text-sm tracking-wider text-gray-400">-SPECIMEN</div>
        </motion.div>
        <motion.div
          className="text-right space-y-1"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <div className="text-sm tracking-wider">
            WE CRAFT VISUAL EXPERIENCES
          </div>
          <div className="text-sm tracking-wider text-gray-400">
            THAT EMBODY CREATIVITY AND PRECISION
          </div>
        </motion.div>
        <motion.div
          className="absolute right-8 text-sm tracking-wider"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          FOUNDED IN 2024
        </motion.div>
      </motion.div>

      {/* Animated Circle Background */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.1 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border-2 border-white"
      />

      {/* Main Content */}
      <div className="relative w-full h-screen">
        <div className="absolute left-8 top-[75vh] -translate-y-1/2 w-2/3">
          <AnimatePresence mode="wait">
            {currentIndex >= 0 && (
              <div className="relative">
                <motion.div
                  key={numbers[currentIndex]}
                  initial={{
                    opacity: 0,
                    x: -50,
                    filter: "blur(10px)",
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    filter: "blur(0px)",
                  }}
                  exit={{
                    opacity: 0,
                    x: 30,
                    filter: "blur(5px)",
                    transition: { delay: 0.2 },
                  }}
                  transition={{
                    duration: 0.8,
                    ease: [0.19, 1, 0.22, 1],
                  }}
                  className="text-[20rem] font-light relative z-10"
                  style={{
                    fontFamily: "'SF Pro Display', sans-serif",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {numbers[currentIndex]}
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Animated Text */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.19, 1, 0.22, 1],
            delay: 1.5,
          }}
          className="absolute right-8 top-1/2 -translate-y-1/2 max-w-md space-y-6"
        >
          <motion.p
            className="text-sm tracking-wider leading-relaxed"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            SPECIMEN IS A DECLARATION OF CREATIVITY, INDIVIDUALITY, AND
            UNAPOLOGETIC LIVING INTO EVERYTHING WE CRAFT.
          </motion.p>
          <motion.p
            className="text-sm tracking-wider leading-relaxed text-gray-400"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            ROOTED IN A LIFESTYLE-FIRST PHILOSOPHY, SPECIMEN TRANSFORMS IDEAS
            INTO BOLD STATEMENTS, INSPIRING SELF-EXPRESSION IN EVERY FORM.
          </motion.p>
        </motion.div>
      </div>

      {/* Corner Accents */}
      {isLoaded && (
        <>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 2 }}
            className="fixed top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-white"
          />
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 2.1 }}
            className="fixed bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-white"
          />
        </>
      )}

      {/* Bubble Animation */}
      {showBubbles && <BubbleAnimation />}
    </motion.div>
  );
};

export default AnimatedNumbers;