import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function ContactPage() {
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
      className="h-screen bg-gray-50 flex items-center justify-center"
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

      {/* Contact Form */}
      <motion.div
        className="bg-white p-8 lg:p-12 rounded-lg shadow-lg w-full max-w-md"
        variants={contentVariants}
        initial="initial"
        animate="animate"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Contact Us</h2>
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Message</label>
            <textarea
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
              rows="4"
              placeholder="Enter your message"
            />
          </div>
          <motion.button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg text-sm tracking-wide"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Send Message
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
}