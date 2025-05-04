import React, { useState } from "react";
import { FaGoogle, FaFacebook, FaGithub, FaRegClock } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const FutureAuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("This feature is coming soon!\n\nDemo form data:\n" + JSON.stringify(formData, null, 2));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-gray-800/80 backdrop-blur-sm p-4 sm:p-8 rounded-xl shadow-2xl border border-gray-700 relative overflow-hidden"
      >
        {/* Coming Soon Ribbon - Adjusted for mobile */}
        <div className="absolute -right-10 -top-10 w-32 h-32 bg-yellow-500 flex items-end justify-center rotate-45 sm:-right-8 sm:-top-8">
          <span className="text-xs font-bold text-gray-900 mb-8">COMING SOON</span>
        </div>
        
        <div className="text-center mb-4 sm:mb-6 relative z-10">
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
          >
            {isLogin ? "Future Login" : "Future Signup"}
          </motion.h2>
          <p className="text-gray-400 mt-1 sm:mt-2 text-sm sm:text-base">
            {isLogin ? "This login experience is coming in our next update" : "Exciting new signup features coming soon"}
          </p>
        </div>

        <div className="flex justify-between mb-4 sm:mb-6 border-b border-gray-700">
          <button
            className={`w-1/2 py-2 sm:py-3 text-sm sm:text-base font-semibold transition-colors ${isLogin ? "border-b-2 border-purple-500 text-purple-500" : "text-gray-400 hover:text-gray-300"}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`w-1/2 py-2 sm:py-3 text-sm sm:text-base font-semibold transition-colors ${!isLogin ? "border-b-2 border-purple-500 text-purple-500" : "text-gray-400 hover:text-gray-300"}`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <AnimatePresence mode="wait">
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <input
                  name="name"
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 sm:p-3 text-sm sm:text-base bg-gray-700/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400 border border-gray-600"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div>
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 sm:p-3 text-sm sm:text-base bg-gray-700/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400 border border-gray-600"
            />
          </div>

          <div>
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 sm:p-3 text-sm sm:text-base bg-gray-700/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400 border border-gray-600"
            />
          </div>

          <AnimatePresence mode="wait">
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full p-2 sm:p-3 text-sm sm:text-base bg-gray-700/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400 border border-gray-600"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-2 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 shadow-lg relative group"
          >
            {isLogin ? "Preview Login" : "Preview Signup"}
            <span className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-xs bg-white/20 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full flex items-center">
              <FaRegClock className="mr-1" size={10} />
              Demo
            </span>
          </motion.button>
        </form>

        <div className="mt-6 sm:mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-xs sm:text-sm">
              <span className="px-2 bg-gray-800 text-gray-400">
                Future Social Logins
              </span>
            </div>
          </div>

          <div className="mt-4 sm:mt-6 grid grid-cols-3 gap-2 sm:gap-3">
            {[
              { icon: <FaFacebook className="text-blue-500" size={18} />, name: "Facebook", color: "blue" },
              { icon: <FaGoogle className="text-red-500" size={18} />, name: "Google", color: "red" },
              { icon: <FaGithub className="text-gray-300" size={18} />, name: "GitHub", color: "gray" }
            ].map((provider, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <div className="w-full flex flex-col items-center justify-center p-2 sm:p-3 bg-gray-700/30 rounded-lg border border-dashed border-gray-600 cursor-not-allowed">
                  <div className="relative">
                    {provider.icon}
                    <div className="absolute -top-2 -right-2 bg-yellow-500 text-gray-900 text-xs px-1 py-0.5 rounded-full">
                      <FaRegClock size={10} />
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 mt-1">{provider.name}</span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                  <span className="text-xs text-center text-white px-2">Coming in v2.0</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-4 sm:mt-6 p-2 sm:p-3 bg-gray-900/50 rounded-lg border border-gray-700">
          <p className="text-center text-xs sm:text-sm text-gray-400">
            This is a preview of our upcoming authentication system. 
            <br />
            All features will be available in the next release!
          </p>
        </div>

        <p className="text-center text-gray-400 mt-4 sm:mt-6 text-xs sm:text-sm">
          {isLogin ? "New user?" : "Already registered?"}
          <button
            className="text-purple-400 hover:text-purple-300 ml-1 font-semibold transition"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Preview Signup" : "Preview Login"}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default FutureAuthForm;