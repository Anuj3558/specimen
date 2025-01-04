import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function BagPage() {
  // Sample bag items (replace with actual data)
  const bagItems = [
    {
      id: 1,
      title: 'PORSCHE 911 CARRERA',
      series: 'SPECIMEN15',
      price: 45,
      image: '/placeholder.svg?height=600&width=800',
      description: 'FINANCIOLOGIES ARULABLEMOM ESDOKE GOVEF',
    },
    {
      id: 2,
      title: 'PORSCHE 911 CARRERA',
      series: 'SPECIMEN15',
      price: 45,
      image: '/placeholder.svg?height=600&width=800',
      description: 'FINANCIOLOGIES ARULABLEMOM ESDOKE GOVEF',
    },
    {
      id: 3,
      title: 'PORSCHE 911 CARRERA',
      series: 'SPECIMEN15',
      price: 45,
      image: '/placeholder.svg?height=600&width=800',
      description: 'FINANCIOLOGIES ARULABLEMOM ESDOKE GOVEF',
    },
  ];

  // Calculate subtotal
  const subtotal = bagItems.reduce((total, item) => total + item.price, 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="min-h-screen bg-gray-50 p-36"
    >
      <div className="max-w-7xl mx-auto">
        {/* Page Title */}
        <h1 className="text-2xl font-bold mb-8">YOUR BAG</h1>

        {/* Bag Items */}
        <div className="space-y-8">
          {bagItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex flex-col md:flex-row items-center gap-6 border-b border-gray-200 pb-8"
            >
              {/* Item Image */}
              <div className="w-32 h-32 md:w-48 md:h-48 bg-gray-200 flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Item Details */}
              <div className="flex-1">
                <h2 className="text-lg font-bold">{item.title}</h2>
                <p className="text-sm text-gray-600">{item.series}</p>
                <p className="text-sm text-gray-600 mt-2">{item.description}</p>
                <p className="text-lg font-bold mt-4">${item.price}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Subtotal and Actions */}
        <div className="mt-8 border-t border-gray-200 pt-8">
          <div className="flex justify-between items-center">
            <p className="text-lg font-bold">SUBTOTAL:</p>
            <p className="text-lg font-bold">${subtotal}</p>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-col md:flex-row gap-4">
            <Link
              to="/checkout"
              className="w-full md:w-auto bg-black text-white py-3 px-8 text-center rounded-lg hover:bg-gray-800 transition-colors"
            >
              CHECKOUT
            </Link>
            <Link
              to="/"
              className="w-full md:w-auto border border-black py-3 px-8 text-center rounded-lg hover:bg-gray-100 transition-colors"
            >
              CONTINUE SHOPPING
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}