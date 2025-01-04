import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const NavigationArrow = ({ onClick }) => (
  <motion.div
    whileHover={{ scale: 1.2 }}
    whileTap={{ scale: 0.9 }}
    className="absolute bottom-4 right-4 lg:bottom-8 lg:right-8 bg-black text-white p-2 rounded-full cursor-pointer"
    onClick={onClick}
  >
    <ArrowRight size={20} />
  </motion.div>
);

export default function PosterDetail({ poster, nextPoster, onNextPoster }) {
  const [isFrameOpen, setIsFrameOpen] = useState(false);
  const navigate = useNavigate();

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const contentVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }
    }
  };

  return (
    <motion.div 
      className="h-screen bg-gray-50 overflow-x-hidden overflow-hidden"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Close Button */}
      <motion.button 
        onClick={() => navigate(-1)}
        className="fixed top-8 left-4 lg:top-24 lg:left-8 text-2xl z-50"
        whileHover={{ scale: 1.2, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
      >
        ×
      </motion.button>

      {/* Main Content */}
      <div className="h-full mx-auto px-4 lg:pl-32 pt-16 lg:pt-32 pb-16 overflow-y-auto">
        {/* Adjusted gap here: reduced from gap-8 lg:gap-24 to gap-4 lg:gap-12 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-12 h-full">
          {/* Left Side - Current Poster */}
          <motion.div
            variants={contentVariants}
            initial="initial"
            animate="animate"
            className="lg:col-span-6 relative flex justify-center lg:justify-start"
          >
            <motion.img
              src="/api/placeholder/600/800"
              alt="Porsche 911 Carrera Poster"
              className="w-full lg:w-[50vh] h-auto lg:h-full object-cover bg-[#f5e6d3]"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          {/* Right Side - Details and Next Poster */}
          <motion.div
            variants={contentVariants}
            initial="initial"
            animate="animate"
            className="lg:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-12"
          >
            {/* Product Details */}
            <div className="space-y-4 lg:space-y-8">
              <motion.div 
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <p className="text-xs tracking-wide">SPECIMEN°15</p>
                <h2 className="text-lg tracking-wide">1978 PORSCHE 911 CARRERA</h2>
                <p className="text-lg">$ 45</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <motion.button
                  onClick={() => setIsFrameOpen(!isFrameOpen)}
                  className="w-full flex items-center justify-between py-4 border-t border-gray-200 text-xs tracking-wide"
                  whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                >
                  <span>FRAMED POSTER WITH 15×15" DIMENSIONS</span>
                  <motion.span
                    animate={{ rotate: isFrameOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isFrameOpen ? '−' : '+'}
                  </motion.span>
                </motion.button>
              </motion.div>

              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <motion.button 
                  className="w-full bg-black text-white py-3 text-xs tracking-wide"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  CHECKOUT
                </motion.button>
                <motion.button 
                  className="w-full border border-black py-3 text-xs tracking-wide"
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(0,0,0,0.05)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  ADD TO BAG
                </motion.button>
              </motion.div>
            </div>

            {/* Next Poster Preview */}
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src="/api/placeholder/600/800"
                alt="Next Porsche Poster"
                className="w-full h-full object-cover blur-sm bg-[#f5e6d3]"
              />
              <NavigationArrow onClick={onNextPoster} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}