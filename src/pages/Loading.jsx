import { motion } from 'framer-motion';

export default function SpecimenLoading() {
  return (
    <div className="h-screen bg-gray-50 flex items-center justify-center">
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
          className="mt-6 h-1.5 bg-black rounded-full"
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
  );
}