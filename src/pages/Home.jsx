"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import Footer from './Footer'; // Import the Footer component

const Home = () => {
  const [scrollPosition, setScrollPosition] = useState(400); // Initialize to 400 for the 5th image
  const [activeIndex, setActiveIndex] = useState(4); // Initialize to 4 for the 5th image
  const containerRef = useRef(null);
  const audioRef = useRef(null);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const images = Array(11).fill("/placeholder.svg?height=1000&width=800");

  // Create audio context and sounds on component mount
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

  useEffect(() => {
    const container = containerRef.current;

    const handleScroll = (e) => {
      e.preventDefault();

      // Calculate the new scroll position
      const scrollDelta = e.deltaY;
      const newScrollPosition = scrollPosition + scrollDelta * 0.3;

      // Clamp the scroll position between 0 and the maximum scrollable area
      const maxScrollPosition = (images.length - 1) * 100;
      const clampedScrollPosition = Math.max(0, Math.min(newScrollPosition, maxScrollPosition));

      setScrollPosition(clampedScrollPosition);

      // Update the active index based on the scroll position
      const newIndex = Math.round(clampedScrollPosition / 100);
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
        audioRef.current?.(); // Play the click sound
      }
    };

    if (container) {
      container.addEventListener('wheel', handleScroll, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleScroll);
      }
    };
  }, [scrollPosition, activeIndex, images.length]);

  const getImageStyles = (index) => {
    const centerPosition = scrollPosition / 100;
    const distance = index - centerPosition;
    const normalizedDistance = Math.abs(distance);

    const scale = 1 - normalizedDistance * 0.15;
    const opacity = Math.max(0.2, 1 - normalizedDistance * 0.25);
    const blur = Math.min(normalizedDistance * 3, 10);

    const xTranslate = distance * 45;
    const zTranslate = -Math.abs(distance) * 100;

    return {
      transform: `
        translate3d(${xTranslate}%, -50%, ${zTranslate}px)
        scale(${scale})
        rotateY(${distance * 5}deg)
      `,
      opacity: opacity,
      zIndex: 100 - Math.abs(Math.round(distance * 10)),
      filter: `blur(${blur}px)`,
      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    };
  };

  return (
    <div className="relative min-h-screen bg-gray-100 mx-auto overflow-hidden">
      {/* Main Content */}
      <div
        ref={containerRef}
        className="fixed inset-0 flex items-center justify-center overflow-hidden"
        style={{ height: '100vh' }} // Ensure the container has a height
      >
        <div className="relative w-full h-full max-w-[2000px] mx-auto flex items-center justify-center">
          {images.map((image, index) => (
            <div
              key={index}
              className="absolute sm:left-[35vw] md:left-[35vw] top-1/2 transform -translate-x-1/2 -translate-y-1/2"
              style={getImageStyles(index)}
            >
              <div
                className={`relative ${isMobile ? 'w-[200px]' : 'w-[400px] md:w-[500px]'} 
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

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;