import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Define the animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Delay between each child animation
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function PosterGrid({ posters }) {
  return (
    <div className="w-full bg-white mx-auto  sm:px-6 lg:px-8 pt-24 pb-12">
      {/* Grid Container */}
      <motion.div
        className="grid grid-cols-1 p-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {posters.map((poster) => (
          <motion.div
            key={poster.id}
            variants={itemVariants}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -5 }}
            className="group"
          >
            <Link to={`/poster/${poster.id}`}>
              <div className="aspect-[3/4] overflow-hidden bg-gray-100 rounded-none">
                <img
                  src={poster.image}
                  alt={poster.title}
                  className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="mt-4 space-y-1">
                <p className="text-sm text-gray-500">{poster.series}</p>
                <h3 className="text-sm font-medium">{poster.title}</h3>
                <p className="text-sm">${poster.price}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Pagination */}
      <div className="mt-12 flex justify-center space-x-2">
        {[1, 2, 3, 4, 5, 6].map((page) => (
          <button
            key={page}
            className="w-8 h-8 flex items-center justify-center text-sm hover:bg-gray-100 transition-colors rounded-full"
          >
            {page}
          </button>
        ))}
        <button className="w-8 h-8 flex items-center justify-center text-sm hover:bg-gray-100 transition-colors rounded-full">
          →
        </button>
      </div>
    </div>
  );
}