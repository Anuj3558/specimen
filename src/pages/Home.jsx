"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import { motion, AnimatePresence } from 'framer-motion';
import { Hero } from '../Assets';

const Home = () => {
  const [scrollPosition, setScrollPosition] = useState(400);
  const [activeIndex, setActiveIndex] = useState(4);
  const [isScrolling, setIsScrolling] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [velocity, setVelocity] = useState(0);
  const containerRef = useRef(null);
  const audioRef = useRef(null);
  const scrollTimeout = useRef(null);
  const lastScrollTime = useRef(Date.now());
  const lastTouchY = useRef(0);
  const lastTouchTime = useRef(Date.now());
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const images = Array(11).fill(Hero);
  const minSwipeDistance = 30; // Reduced minimum swipe distance for better responsiveness
  const velocityFactor = 0.8; // Factor to control the impact of velocity on scrolling

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

  const handleScroll = (delta, currentVelocity = 0) => {
    const now = Date.now();
    if (now - lastScrollTime.current < 16) {
      return;
    }
    lastScrollTime.current = now;

    // Adjust scroll sensitivity based on velocity
    const velocityMultiplier = Math.min(Math.abs(currentVelocity * velocityFactor), 2);
    const scrollDelta = delta * (isMobile ? 0.15 : 0.3) * (1 + velocityMultiplier);
    const newScrollPosition = scrollPosition + scrollDelta;
    const maxScrollPosition = (images.length - 1) * 100;

    let clampedScrollPosition = Math.max(0, Math.min(newScrollPosition, maxScrollPosition));
    
    // Add elastic bounce effect at edges
    if (newScrollPosition < 0) {
      clampedScrollPosition = Math.max(-20, newScrollPosition * 0.5);
    } else if (newScrollPosition > maxScrollPosition) {
      clampedScrollPosition = Math.min(maxScrollPosition + 20, maxScrollPosition + (newScrollPosition - maxScrollPosition) * 0.5);
    }

    setScrollPosition(clampedScrollPosition);
    setIsScrolling(true);

    clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      // Snap to nearest position
      const targetIndex = Math.round(clampedScrollPosition / 100);
      const newIndex = Math.max(0, Math.min(targetIndex, images.length - 1));
      
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
        audioRef.current?.();
      }
      
      setIsScrolling(false);
      setScrollPosition(targetIndex * 100);
      setVelocity(0);
    }, 200); // Increased timeout for smoother settling
  };

  useEffect(() => {
    const container = containerRef.current;

    const handleWheelScroll = (e) => {
      e.preventDefault();
      handleScroll(e.deltaY);
    };

    if (container) {
      container.addEventListener('wheel', handleWheelScroll, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheelScroll);
      }
      clearTimeout(scrollTimeout.current);
    };
  }, [scrollPosition, activeIndex, images.length]);

  const onTouchStart = (e) => {
    setTouchEnd(null);
    const touch = e.targetTouches[0];
    setTouchStart({
      x: touch.clientX,
      y: touch.clientY
    });
    lastTouchY.current = touch.clientY;
    lastTouchTime.current = Date.now();
    setVelocity(0);
  };

  const onTouchMove = (e) => {
    const touch = e.targetTouches[0];
    setTouchEnd({
      x: touch.clientX,
      y: touch.clientY
    });

    // Calculate velocity
    const deltaY = lastTouchY.current - touch.clientY;
    const deltaTime = Date.now() - lastTouchTime.current;
    if (deltaTime > 0) {
      const newVelocity = deltaY / deltaTime;
      setVelocity(newVelocity);
    }

    lastTouchY.current = touch.clientY;
    lastTouchTime.current = Date.now();
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = touchStart.y - touchEnd.y;
    const isHorizontalSwipe = Math.abs(distanceX) > Math.abs(distanceY);

    if (isMobile && !isHorizontalSwipe && Math.abs(distanceY) > minSwipeDistance) {
      handleScroll(distanceY * 1.5, velocity);
    } else if (!isMobile && isHorizontalSwipe && Math.abs(distanceX) > minSwipeDistance) {
      handleScroll(distanceX * 1.5, velocity);
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  const getImageStyles = (index) => {
    const centerPosition = scrollPosition / 100;
    const distance = index - centerPosition;
    const normalizedDistance = Math.abs(distance);

    const scale = 1 - normalizedDistance * (isMobile ? 0.06 : 0.15); // Reduced scale change for mobile
    const opacity = Math.max(0.3, 1 - normalizedDistance * 0.2); // Increased minimum opacity
    const blur = Math.min(normalizedDistance * 2, 6); // Reduced maximum blur

    if (isMobile) {
      const yTranslate = distance * 30; // Reduced translation distance
      const zTranslate = -Math.abs(distance) * 30;

      return {
        transform: `
          translate3d(0, ${yTranslate}%, ${zTranslate}px)
          scale(${scale})
          rotateX(${distance * -1.5}deg)
        `,
        opacity,
        zIndex: 100 - Math.abs(Math.round(distance * 10)),
        filter: `blur(${blur}px)`,
        transition: isScrolling 
          ? 'transform 0.1s ease-out' 
          : 'all 0.4s cubic-bezier(0.2, 0, 0.2, 1)',
        WebkitTransform: `
          translate3d(0, ${yTranslate}%, ${zTranslate}px)
          scale(${scale})
          rotateX(${distance * -1.5}deg)
        `,
      };
    }

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
      transition: isScrolling 
        ? 'transform 0.1s ease-out' 
        : 'all 0.4s cubic-bezier(0.2, 0, 0.2, 1)',
    };
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
      className="relative min-h-screen bg-gray-100 mx-auto overflow-hidden touch-none"
    >
      <div
        ref={containerRef}
        className="fixed inset-0 flex items-center justify-center overflow-hidden"
        style={{ height: '100vh' }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="relative w-full h-full max-w-[2000px] mx-auto flex items-center justify-center">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute ${
                isMobile 
                  ? 'left-[30vw] -translate-x-1/2'
                  : 'sm:left-[35vw] md:left-[35vw] top-1/2 -translate-y-1/2 -translate-x-1/2'
              }`}
              style={getImageStyles(index)}
            >
              <div
                className={`relative ${isMobile ? 'w-[320px]' : 'w-[400px] md:w-[500px]'} 
                          aspect-[3/4] bg-white p-2 md:p-4 shadow-2xl
                          ${index === activeIndex ? 'ring-2 ring-gray-900' : ''}`}
              >
                <img
                  src={image}
                  alt={`Porsche 918 - ${index + 1}`}
                  className="w-full h-full object-cover"
                  draggable="false"
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

export default Home;