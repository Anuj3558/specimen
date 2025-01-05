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
  const containerRef = useRef(null);
  const audioRef = useRef(null);
  const scrollTimeout = useRef(null);
  const lastScrollTime = useRef(Date.now());
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const images = Array(11).fill(Hero);

  // Minimum swipe distance for touch events (in pixels)
  const minSwipeDistance = 50;

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

  // Handle smooth scrolling and index updates
  const handleScroll = (delta) => {
    const now = Date.now();
    if (now - lastScrollTime.current < 16) {
      return;
    }
    lastScrollTime.current = now;

    const scrollDelta = delta * (isMobile ? 0.2 : 0.3);
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

  // Mouse wheel event handler
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

  // Touch event handlers
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    });
  };

  const onTouchMove = (e) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    });
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = touchStart.y - touchEnd.y;
    const isHorizontalSwipe = Math.abs(distanceX) > Math.abs(distanceY);

    if (isMobile && !isHorizontalSwipe && Math.abs(distanceY) > minSwipeDistance) {
      // Vertical swipe
      handleScroll(distanceY * 2);
    } else if (!isMobile && isHorizontalSwipe && Math.abs(distanceX) > minSwipeDistance) {
      // Horizontal swipe for desktop
      handleScroll(distanceX * 2);
    }

    // Reset touch coordinates
    setTouchStart(null);
    setTouchEnd(null);
  };

  const getImageStyles = (index) => {
    const centerPosition = scrollPosition / 100;
    const distance = index - centerPosition;
    const normalizedDistance = Math.abs(distance);

    const scale = 1 - normalizedDistance * (isMobile ? 0.08 : 0.15);
    const opacity = Math.max(0.2, 1 - normalizedDistance * 0.25);
    const blur = Math.min(normalizedDistance * 3, 10);

    if (isMobile) {
      const yTranslate = distance * 35;
      const zTranslate = -Math.abs(distance) * 40;

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
        WebkitTransform: `
          translate3d(0, ${yTranslate}%, ${zTranslate}px)
          scale(${scale})
          rotateX(${distance * -2}deg)
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
      transition: isScrolling ? 'transform 0.2s ease-out' : 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
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
                  ? 'left-1/2 -translate-x-1/2'
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