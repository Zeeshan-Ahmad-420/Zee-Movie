// import React, { useState } from "react";
// import { FaGoogle, FaFacebook, FaGithub } from "react-icons/fa";
// import { motion } from "framer-motion";

// const Register = () => {
//   const [isLogin, setIsLogin] = useState(true);

//   return (
//     <>
//       <div>This Feature is avilable in future</div>
//       <div className="flex justify-center items-center min-h-screen bg-gray-900">
//         <motion.div
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="w-full max-w-md bg-gray-800 p-6 rounded-xl shadow-lg text-white"
//         >
//           {/* Tabs for Login & Signup */}
//           <div className="flex justify-between mb-6">
//             <button
//               className={`w-1/2 py-2 font-semibold ${
//                 isLogin
//                   ? "border-b-4 border-red-500 text-red-500"
//                   : "text-gray-400"
//               }`}
//               onClick={() => setIsLogin(true)}
//             >
//               Login
//             </button>
//             <button
//               className={`w-1/2 py-2 font-semibold ${
//                 !isLogin
//                   ? "border-b-4 border-red-500 text-red-500"
//                   : "text-gray-400"
//               }`}
//               onClick={() => setIsLogin(false)}
//             >
//               Signup
//             </button>
//           </div>

//           {/* Form Section */}
//           <form className="space-y-4">
//             {!isLogin && (
//               <input
//                 type="text"
//                 placeholder="Full Name"
//                 className="w-full p-3 bg-gray-700 rounded-md outline-none focus:ring-2 focus:ring-red-500"
//               />
//             )}
//             <input
//               type="email"
//               placeholder="Email"
//               className="w-full p-3 bg-gray-700 rounded-md outline-none focus:ring-2 focus:ring-red-500"
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               className="w-full p-3 bg-gray-700 rounded-md outline-none focus:ring-2 focus:ring-red-500"
//             />
//             {!isLogin && (
//               <input
//                 type="password"
//                 placeholder="Confirm Password"
//                 className="w-full p-3 bg-gray-700 rounded-md outline-none focus:ring-2 focus:ring-red-500"
//               />
//             )}
//             <button className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-md font-semibold transition duration-300">
//               {isLogin ? "Login" : "Signup"}
//             </button>
//           </form>

//           {/* Social Authentication */}
//           <div className="mt-6">
//             <p className="text-center text-gray-400">
//               Or {isLogin ? "Login" : "Signup"} with
//             </p>
//             <div className="flex justify-center gap-4 mt-4">
//               <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition duration-300">
//                 <FaFacebook className="text-xl" /> Facebook
//               </button>
//               <button className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-md transition duration-300">
//                 <FaGoogle className="text-xl text-red-500" /> Google
//               </button>
//               <button className="flex items-center gap-2 bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded-md transition duration-300">
//                 <FaGithub className="text-xl" /> GitHub
//               </button>
//             </div>
//           </div>

//           {/* Switch to Login/Signup */}
//           <p className="text-center text-gray-400 mt-6">
//             {isLogin ? "Don't have an account?" : "Already have an account?"}
//             <span
//               className="text-red-500 cursor-pointer ml-1"
//               onClick={() => setIsLogin(!isLogin)}
//             >
//               {isLogin ? "Signup" : "Login"}
//             </span>
//           </p>
//         </motion.div>
//       </div>
//     </>
//   );
// };

// export default Register;


import React, { useState } from "react";
import { FaGoogle, FaFacebook, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";

const Register = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <div className="text-center text-red-500 p-2">This feature is coming soon!</div>
      <div className="flex justify-center items-center min-h-screen bg-gray-900 p-4">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-xs sm:max-w-md bg-gray-800 p-4 sm:p-6 rounded-xl shadow-lg text-white"
        >
          <div className="flex justify-between mb-4 sm:mb-6">
            <button
              className={`w-1/2 py-2 text-sm sm:text-base font-semibold ${
                isLogin
                  ? "border-b-2 sm:border-b-4 border-red-500 text-red-500"
                  : "text-gray-400"
              }`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={`w-1/2 py-2 text-sm sm:text-base font-semibold ${
                !isLogin
                  ? "border-b-2 sm:border-b-4 border-red-500 text-red-500"
                  : "text-gray-400"
              }`}
              onClick={() => setIsLogin(false)}
            >
              Signup
            </button>
          </div>

          <form className="space-y-3 sm:space-y-4">
            {!isLogin && (
              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-2 sm:p-3 text-sm sm:text-base bg-gray-700 rounded-md outline-none focus:ring-2 focus:ring-red-500"
              />
            )}
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 sm:p-3 text-sm sm:text-base bg-gray-700 rounded-md outline-none focus:ring-2 focus:ring-red-500"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 sm:p-3 text-sm sm:text-base bg-gray-700 rounded-md outline-none focus:ring-2 focus:ring-red-500"
            />
            {!isLogin && (
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full p-2 sm:p-3 text-sm sm:text-base bg-gray-700 rounded-md outline-none focus:ring-2 focus:ring-red-500"
              />
            )}
            <button className="w-full bg-red-600 hover:bg-red-700 py-2 sm:py-3 rounded-md font-semibold transition duration-300 text-sm sm:text-base">
              {isLogin ? "Login" : "Signup"}
            </button>
          </form>

          <div className="mt-4 sm:mt-6">
            <p className="text-center text-xs sm:text-sm text-gray-400">
              Or {isLogin ? "Login" : "Signup"} with
            </p>
            <div className="flex justify-center gap-2 sm:gap-4 mt-2 sm:mt-4 flex-wrap">
              <button className="flex items-center gap-1 sm:gap-2 bg-blue-600 hover:bg-blue-700 px-2 sm:px-4 py-1 sm:py-2 rounded-md transition duration-300 text-xs sm:text-sm">
                <FaFacebook className="text-sm sm:text-xl" /> Facebook
              </button>
              <button className="flex items-center gap-1 sm:gap-2 bg-white text-black px-2 sm:px-4 py-1 sm:py-2 rounded-md transition duration-300 text-xs sm:text-sm">
                <FaGoogle className="text-sm sm:text-xl text-red-500" /> Google
              </button>
              <button className="flex items-center gap-1 sm:gap-2 bg-gray-700 hover:bg-gray-800 px-2 sm:px-4 py-1 sm:py-2 rounded-md transition duration-300 text-xs sm:text-sm">
                <FaGithub className="text-sm sm:text-xl" /> GitHub
              </button>
            </div>
          </div>
          <p className="text-center text-xs sm:text-sm text-gray-400 mt-4 sm:mt-6">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <span
              className="text-red-500 cursor-pointer ml-1"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Signup" : "Login"}
            </span>
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default Register;