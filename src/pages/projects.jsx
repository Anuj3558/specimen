"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import { motion, AnimatePresence } from 'framer-motion';
import { Hero } from '../Assets';

const Project = () => {
  const [scrollPosition, setScrollPosition] = useState(400);
  const [activeIndex, setActiveIndex] = useState(4);
  const [isScrolling, setIsScrolling] = useState(false);
  const containerRef = useRef(null);
  const audioRef = useRef(null);
  const scrollTimeout = useRef(null);
  const lastScrollTime = useRef(Date.now());
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const images = Array(11).fill(Hero);
  const sideNavItems = [
    "THE CAR SERIES_23",
    "MOVIE SERIES",
    "RAP ARTISTS",
    "DLX EDITIONS",
    "NEW IN"
  ];

  // Audio setup remains the same
  useEffect(() => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudioContext();

    const createClickSound = () => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(2000, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(20, audioContext.currentTime + 0.1);

      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.1);
    };

    audioRef.current = createClickSound;
  }, []);

  // Scroll handling remains similar but with adjusted values for mobile
  useEffect(() => {
    const container = containerRef.current;

    const handleScroll = (e) => {
      e.preventDefault();

      const now = Date.now();
      if (now - lastScrollTime.current < 16) {
        return;
      }
      lastScrollTime.current = now;

      const scrollDelta = e.deltaY * (isMobile ? 0.2 : 0.3); // Reduced sensitivity on mobile
      const newScrollPosition = scrollPosition + scrollDelta;
      const maxScrollPosition = (images.length - 1) * 100;
      let clampedScrollPosition;

      if (newScrollPosition < 0) {
        clampedScrollPosition = Math.max(0, newScrollPosition);
      } else if (newScrollPosition > maxScrollPosition) {
        clampedScrollPosition = Math.min(maxScrollPosition, newScrollPosition);
      } else {
        clampedScrollPosition = newScrollPosition;
      }

      setScrollPosition(clampedScrollPosition);
      setIsScrolling(true);

      clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        const targetIndex = Math.round(clampedScrollPosition / 100);
        const newIndex = Math.max(0, Math.min(targetIndex, images.length - 1));
        if (newIndex !== activeIndex) {
          setActiveIndex(newIndex);
          audioRef.current?.();
        }
        setIsScrolling(false);
        setScrollPosition(targetIndex * 100);
      }, 150);
    };

    if (container) {
      container.addEventListener('wheel', handleScroll, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleScroll);
      }
      clearTimeout(scrollTimeout.current);
    };
  }, [scrollPosition, activeIndex, images.length, isMobile]);

  const getImageStyles = (index) => {
    const centerPosition = scrollPosition / 100;
    const distance = index - centerPosition;
    const normalizedDistance = Math.abs(distance);

    // Adjusted scale and opacity for better mobile visibility
    const scale = 1 - normalizedDistance * (isMobile ? 0.08 : 0.15);
    const opacity = Math.max(0.3, 1 - normalizedDistance * 0.2);
    const blur = Math.min(normalizedDistance * 2, 8);

    if (isMobile) {
      // Adjusted vertical spacing and perspective for mobile
      const yTranslate = distance * 35; // Reduced from 45 for tighter stacking
      const zTranslate = -Math.abs(distance) * 40; // Reduced for less aggressive depth

      return {
        transform: `
          translate3d(0, ${yTranslate}%, ${zTranslate}px)
          scale(${scale})
          rotateX(${distance * -2}deg)
        `,
        opacity,
        zIndex: 100 - Math.abs(Math.round(distance * 10)),
        filter: `blur(${blur}px)`,
        transition: isScrolling ? 'transform 0.2s ease-out' : 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
      };
    }

    // Desktop styles remain the same
    const xTranslate = distance * 45;
    const zTranslate = -Math.abs(distance) * 100;

    return {
      transform: `
        translate3d(${xTranslate}%, -50%, ${zTranslate}px)
        scale(${scale})
        rotateY(${distance * 5}deg)
      `,
      opacity,
      zIndex: 100 - Math.abs(Math.round(distance * 10)),
      filter: `blur(${blur}px)`,
      transition: isScrolling ? 'transform 0.2s ease-out' : 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    };
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
      className="relative min-h-screen bg-gray-100 mx-auto overflow-hidden"
    >
      {/* Adjusted navigation positioning for mobile */}
      <div className={`fixed ${isMobile ? 'top-[40vh] left-[3vw] z-50 justify-center text-center' : 'left-8 top-1/2 -translate-y-1/2 z-40'}`}>
        {sideNavItems.map((item, index) => (
          <div
            key={index}
            className={`text-xs md:text-sm ${activeIndex === index ? 'text-gray-900 font-medium' : 'text-gray-600'} 
                       mb-2 md:mb-4 transition-colors duration-300 ${isMobile ? 'text-right' : ''}`}
          >
            {item}
          </div>
        ))}
      </div>

      <div
        ref={containerRef}
        className="fixed inset-0 flex items-center justify-center overflow-hidden"
        style={{ height: '100vh' }}
      >
        <div className="relative w-full h-full max-w-[2000px] mx-auto flex items-center justify-center">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute ${
                isMobile 
                  ? 'left-[30vw] -translate-x-1/2' // Centered horizontally on mobile
                  : 'sm:left-[35vw] md:left-[35vw] top-1/2 -translate-y-1/2 -translate-x-1/2'
              }`}
              style={getImageStyles(index)}
            >
              <div
                className={`relative ${isMobile ? 'w-[300px]' : 'w-[400px] md:w-[500px]'} 
                            aspect-[3/4] bg-white p-2 md:p-4 shadow-2xl
                            ${index === activeIndex ? 'ring-2 ring-gray-900' : ''}`}
              >
                <img
                  src={image}
                  alt={`Porsche 918 - ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 text-white">
                  <h2 className="text-lg md:text-2xl font-bold">Porsche 918</h2>
                  <p className="text-xs md:text-sm opacity-80">83_00{index + 1}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Project;