import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Hero } from '../Assets';

const BagPage = () => {
  const bagItems = [
    {
      id: 1,
      title: 'SPECIMEN15',
      subtitle: 'FRAMED POSTER',
      price: 45,
      image: Hero,
      status: 'AVAILABLE NOW',
      size: '50X15'
    },
    {
      id: 2,
      title: 'SPECIMEN15',
      subtitle: 'FRAMED POSTER',
      price: 45,
      image: Hero,
      status: 'AVAILABLE NOW',
      size: '50X15'
    },
    {
      id: 3,
      title: 'SPECIMEN15',
      subtitle: 'FRAMED POSTER',
      price: 45,
      image: Hero,
      status: 'AVAILABLE NOW',
      size: '50X15'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const subtotal = bagItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-gray-50/50  px-6 py-12 md:px-12 lg:px-24">
      <div className="max-w-7xl p-14 mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl mb-16"
        >
          YOUR BAG
        </motion.h1>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {bagItems.map((item, index) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-[100px_1fr_120px] lg:grid-cols-[150px_1fr_120px] gap-8 items-start border-t border-gray-200 pt-8"
            >
              <div className="aspect-[3/4] bg-gray-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between md:justify-start md:space-x-8">
                  <p>{item.title}</p>
                  <p className="md:hidden">${item.price}</p>
                </div>
                <p className="text-sm text-gray-600">{item.subtitle}</p>
                <p className="text-sm text-gray-600 mt-4">{item.status}</p>
                <p className="text-sm text-gray-600">{item.size}</p>
                <button className="text-sm underline mt-4">
                  REMOVE
                </button>
              </div>

              <p className="hidden md:block text-right">
                ${item.price}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 border-t border-gray-200 pt-8"
        >
          <div className="flex justify-between mb-8">
            <p>SUBTOTAL</p>
            <p>${subtotal}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              to="/checkout"
              className="bg-black text-white py-3 px-6 text-center hover:bg-gray-900 transition-colors"
            >
              CHECKOUT
            </Link>
            <Link
              to="/"
              className="border border-black py-3 px-6 text-center hover:bg-gray-50 transition-colors"
            >
              CONTINUE SHOPPING
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BagPage;