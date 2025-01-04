import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function SignupPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="min-h-screen bg-gray-50 flex items-center justify-center p-8"
    >
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        {/* Page Title */}
        <h1 className="text-2xl font-bold mb-6 text-center">SIGN UP</h1>

        {/* Signup Form */}
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
              placeholder="Enter your full name"
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
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
              placeholder="Enter your password"
            />
          </div>

          {/* Signup Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-black text-white py-3 rounded-lg text-sm hover:bg-gray-800 transition-colors"
          >
            SIGN UP
          </motion.button>
        </form>

        {/* Login Link */}
        <p className="mt-6 text-center text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-black font-semibold hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </motion.div>
  );
}