import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function TermsAndServicePage() {
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

      {/* Terms and Service Content */}
      <motion.div
        className="bg-white p-8 lg:p-12 rounded-lg shadow-lg w-full max-w-3xl"
        variants={contentVariants}
        initial="initial"
        animate="animate"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Terms and Service</h2>
        <div className="space-y-4 text-sm text-gray-700">
          <p>
            By using our services, you agree to comply with and be bound by the following terms and conditions. Please read them carefully.
          </p>
          <p>
            1. <strong>Acceptance of Terms:</strong> Your access to and use of our services is subject to your acceptance of these terms.
          </p>
          <p>
            2. <strong>User Responsibilities:</strong> You are responsible for maintaining the confidentiality of your account and password.
          </p>
          <p>
            3. <strong>Privacy Policy:</strong> Your use of our services is also governed by our Privacy Policy.
          </p>
          <p>
            4. <strong>Limitation of Liability:</strong> We are not liable for any indirect, incidental, or consequential damages.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}