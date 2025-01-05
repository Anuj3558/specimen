import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Hero } from '../Assets';

export default function PosterDetail() {
  const [isFrameOpen, setIsFrameOpen] = useState(false);
  const navigate = useNavigate();

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <motion.div 
      className="min-h-screen pt-20 bg-gray-50/50"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Close Button */}
      <button 
        onClick={() => navigate(-1)}
        className="fixed top-8 left-8 text-xl z-50 hover:opacity-60 transition-opacity"
      >
        ×
      </button>

      {/* Main Content */}
      <div className="container mx-auto px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column - Current Poster */}
          <div className="lg:col-span-1">
            <motion.img
              src={Hero}
              alt="Porsche 911 Carrera Poster"
              className="w-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Middle Column - Details */}
          <div className="lg:col-span-1 space-y-8">
            <div className="space-y-2">
              <motion.p 
                className="text-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                SPECIMEN°15
              </motion.p>
              <motion.h1 
                className="text-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                1978 PORSCHE 911 CARRERA
              </motion.h1>
              <motion.p 
                className="text-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                $ 45
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <button
                onClick={() => setIsFrameOpen(!isFrameOpen)}
                className="w-full flex items-center justify-between py-4 border-t border-gray-200 group"
              >
                <span className="text-sm">FRAMED POSTER WITH 15×15" DIMENSIONS</span>
                <span className="text-sm transform transition-transform">
                  {isFrameOpen ? '−' : '+'}
                </span>
              </button>
            </motion.div>

            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <button className="w-full bg-black text-white py-3">
                CHECKOUT
              </button>
              <button className="w-full border border-black py-3">
                ADD TO BAG
              </button>
            </motion.div>
          </div>

          {/* Right Column - Next Poster */}
          <div className="lg:col-span-1  relative">
            <motion.img
              src={Hero}
              alt="Next Poster Preview"
              className="w-full object-cover opacity-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ duration: 0.5 }}
            />
            <motion.button
              className="absolute right-4 bottom-4 text-black"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              →
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}