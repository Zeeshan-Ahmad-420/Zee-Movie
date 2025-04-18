import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { FaHome, FaSadTear } from 'react-icons/fa';

const Error = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4"
    >
      <div className="text-center max-w-2xl mx-auto">
        <motion.div
          initial={{ scale: 0.8, y: -20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="flex justify-center mb-6"
        >
          <div className="relative">
            <div className="absolute -inset-4 bg-red-500 rounded-full blur opacity-75"></div>
            <div className="relative bg-gray-800 p-8 rounded-full">
              <FaSadTear className="text-6xl text-red-400" />
            </div>
          </div>
        </motion.div>

        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-yellow-300"
        >
          404
        </motion.h1>

        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-2xl md:text-3xl font-semibold mb-6"
        >
          Oops! Page Not Found
        </motion.h2>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-gray-300 mb-8 text-lg"
        >
          The page you're looking for doesn't exist or has been moved. 
          Don't worry, let's get you back home!
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <NavLink 
            to="/" 
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-500 to-yellow-500 rounded-lg font-medium hover:from-red-600 hover:to-yellow-600 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <FaHome className="mr-2" />
            Return Home
          </NavLink>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-gray-400 text-sm"
        >
          <p>Still lost? Try these options:</p>
          <div className="flex justify-center space-x-4 mt-2">
            <NavLink to="/movie" className="hover:text-white transition">Movies</NavLink>
            <NavLink to="/upcoming" className="hover:text-white transition">Upcoming</NavLink>
            <NavLink to="/toprated" className="hover:text-white transition">Top Rated</NavLink>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Error;