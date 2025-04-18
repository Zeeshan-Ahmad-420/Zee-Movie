// import React, { useState, useEffect, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { NavLink, useLocation, useNavigate } from 'react-router-dom';
// import { 
//   FaSearch, 
//   FaUserPlus, 
//   FaBars, 
//   FaTimes, 
//   FaHome, 
//   FaFilm, 
//   FaCalendarAlt, 
//   FaStar,
//   FaUserCircle
// } from 'react-icons/fa';

// const Navbar = () => {
//     const [isMenuOpen, setIsMenuOpen] = useState(false);
//     const [scrolled, setScrolled] = useState(false);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [isSearchFocused, setIsSearchFocused] = useState(false);
//     const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
//     const location = useLocation();
//     const navigate = useNavigate();
//     const searchRef = useRef(null);
//     const userDropdownRef = useRef(null);

//     // Close mobile menu when route changes
//     useEffect(() => {
//         setIsMenuOpen(false);
//     }, [location]);

//     // Add scroll effect
//     useEffect(() => {
//         const handleScroll = () => {
//             if (window.scrollY > 10) {
//                 setScrolled(true);
//             } else {
//                 setScrolled(false);
//             }
//         };
//         window.addEventListener('scroll', handleScroll);
//         return () => window.removeEventListener('scroll', handleScroll);
//     }, []);

//     // Close dropdown when clicking outside
//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
//                 setIsUserDropdownOpen(false);
//             }
//             if (searchRef.current && !searchRef.current.contains(event.target)) {
//                 setIsSearchFocused(false);
//             }
//         };
//         document.addEventListener('mousedown', handleClickOutside);
//         return () => document.removeEventListener('mousedown', handleClickOutside);
//     }, []);

//     const navLinks = [
//         { to: '/', label: 'Home', icon: <FaHome className="mr-2" /> },
//         { to: '/movie', label: 'Movies', icon: <FaFilm className="mr-2" /> },
//         { to: '/upcoming', label: 'Upcoming', icon: <FaCalendarAlt className="mr-2" /> },
//         { to: '/toprated', label: 'Top Rated', icon: <FaStar className="mr-2" /> },
//     ];

//     const handleSearch = (e) => {
//         e.preventDefault();
//         if (searchQuery.trim()) {
//             navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
//             setSearchQuery('');
//         }
//     };

//     const mobileMenuVariants = {
//         hidden: { opacity: 0, height: 0 },
//         visible: { 
//             opacity: 1, 
//             height: 'auto',
//             transition: {
//                 staggerChildren: 0.1,
//                 delayChildren: 0.2
//             }
//         },
//         exit: { opacity: 0, height: 0 }
//     };

//     const navItemVariants = {
//         hidden: { opacity: 0, y: -10 },
//         visible: { opacity: 1, y: 0 }
//     };

//     return (
//         <motion.header 
//             initial={{ y: -100 }} 
//             animate={{ y: 0 }}
//             transition={{ type: 'spring', stiffness: 100, damping: 20 }}
//             className={`fixed w-full top-0 z-50 ${
//                 scrolled 
//                     ? 'bg-gray-900 shadow-xl' 
//                     : 'bg-gray-900/90 backdrop-blur-sm'
//             } transition-all duration-300`}
//         >
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 <div className="flex justify-between items-center h-16 md:h-20">
//                     {/* Logo */}
//                     <motion.div 
//                         whileHover={{ scale: 1.05 }}
//                         className="flex-shrink-0 flex items-center"
//                     >
//                         <NavLink to="/" className="flex items-center">
//                             <span className="text-3xl sm:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-yellow-400 hover:from-yellow-400 hover:to-red-500 transition-all duration-500">
//                                 ZEE
//                             </span>
//                             <span className="ml-1 text-2xl sm:text-3xl text-white font-medium">
//                                 Movie
//                             </span>
//                         </NavLink>
//                     </motion.div>

//                     {/* Desktop Search */}
//                     <div className="hidden md:flex flex-1 mx-8 max-w-md" ref={searchRef}>
//                         <form onSubmit={handleSearch} className="w-full">
//                             <motion.div 
//                                 animate={{
//                                     width: isSearchFocused ? '100%' : '80%',
//                                     transition: { duration: 0.3 }
//                                 }}
//                                 className="relative"
//                             >
//                                 <input
//                                     type="text"
//                                     placeholder="Search movies..."
//                                     className="w-full bg-gray-800 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200"
//                                     value={searchQuery}
//                                     onChange={(e) => setSearchQuery(e.target.value)}
//                                     onFocus={() => setIsSearchFocused(true)}
//                                     onBlur={() => setIsSearchFocused(false)}
//                                 />
//                                 <button 
//                                     type="submit"
//                                     className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
//                                 >
//                                     <FaSearch />
//                                 </button>
//                             </motion.div>
//                         </form>
//                     </div>

//                     {/* Desktop Navigation */}
//                     <div className="hidden md:flex items-center space-x-2">
//                         {navLinks.map((link) => (
//                             <NavLink 
//                                 key={link.to}
//                                 to={link.to}
//                                 className={({isActive}) => `
//                                     px-4 py-2 rounded-lg text-white hover:bg-gray-700/50 transition-all duration-200
//                                     ${isActive ? 'text-red-400 font-medium bg-gray-800' : ''}
//                                     flex items-center text-sm lg:text-base
//                                 `}
//                             >
//                                 {link.icon}
//                                 {link.label}
//                             </NavLink>
//                         ))}
//                     </div>

//                     {/* Auth Buttons - Desktop */}
//                     <div className="hidden md:flex items-center space-x-4">
//                         <motion.button 
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                             className="relative"
//                             onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
//                             ref={userDropdownRef}
//                         >
//                             <FaUserCircle className="text-2xl text-gray-300 hover:text-white" />
//                             <AnimatePresence>
//                                 {isUserDropdownOpen && (
//                                     <motion.div
//                                         initial={{ opacity: 0, y: 20 }}
//                                         animate={{ opacity: 1, y: 0 }}
//                                         exit={{ opacity: 0, y: 20 }}
//                                         transition={{ duration: 0.2 }}
//                                         className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-50"
//                                     >
//                                         <NavLink
//                                             to="/login"
//                                             className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
//                                         >
//                                             Sign In
//                                         </NavLink>
//                                         <NavLink
//                                             to="/register"
//                                             className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
//                                         >
//                                             Create Account
//                                         </NavLink>
//                                     </motion.div>
//                                 )}
//                             </AnimatePresence>
//                         </motion.button>
//                     </div>

//                     {/* Mobile Menu Button */}
//                     <div className="flex md:hidden items-center space-x-4">
//                         <button 
//                             onClick={() => navigate('/search')}
//                             className="text-white p-1"
//                         >
//                             <FaSearch size={18} />
//                         </button>
//                         <button 
//                             className="text-white text-2xl p-1 focus:outline-none"
//                             onClick={() => setIsMenuOpen(!isMenuOpen)}
//                             aria-label="Toggle menu"
//                         >
//                             {isMenuOpen ? <FaTimes /> : <FaBars />}
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {/* Mobile Menu */}
//             <AnimatePresence>
//                 {isMenuOpen && (
//                     <motion.div 
//                         initial="hidden"
//                         animate="visible"
//                         exit="exit"
//                         variants={mobileMenuVariants}
//                         className="md:hidden bg-gray-800/95 backdrop-blur-sm overflow-hidden"
//                     >
//                         <div className="px-2 pt-2 pb-4 space-y-1">
//                             {/* Mobile Search */}
//                             <motion.div variants={navItemVariants} className="px-4 py-2">
//                                 <form onSubmit={handleSearch} className="flex">
//                                     <input
//                                         type="text"
//                                         placeholder="Search movies..."
//                                         className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-l-lg focus:outline-none"
//                                         value={searchQuery}
//                                         onChange={(e) => setSearchQuery(e.target.value)}
//                                     />
//                                     <button 
//                                         type="submit"
//                                         className="bg-red-600 text-white px-4 py-2 rounded-r-lg hover:bg-red-700"
//                                     >
//                                         <FaSearch />
//                                     </button>
//                                 </form>
//                             </motion.div>

//                             {navLinks.map((link) => (
//                                 <motion.div key={link.to} variants={navItemVariants}>
//                                     <NavLink 
//                                         to={link.to}
//                                         className={({isActive}) => `
//                                             flex items-center px-4 py-3 rounded-lg text-white 
//                                             ${isActive ? 'bg-red-500/90 text-white' : 'hover:bg-gray-700/50'}
//                                             transition-all duration-200
//                                         `}
//                                     >
//                                         {link.icon}
//                                         {link.label}
//                                     </NavLink>
//                                 </motion.div>
//                             ))}

//                             <motion.div variants={navItemVariants} className="pt-2 border-t border-gray-700">
//                                 <NavLink to="/login" className="block px-4 py-3 rounded-lg text-white hover:bg-gray-700/50">
//                                     Sign In
//                                 </NavLink>
//                                 <NavLink to="/register" className="block px-4 py-3 rounded-lg text-white hover:bg-gray-700/50">
//                                     Create Account
//                                 </NavLink>
//                             </motion.div>
//                         </div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//         </motion.header>
//     );
// };

// export default Navbar;

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  FaUserPlus, 
  FaBars, 
  FaTimes, 
  FaHome, 
  FaFilm, 
  FaCalendarAlt, 
  FaStar,
  FaUserCircle
} from 'react-icons/fa';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const location = useLocation();
    const userDropdownRef = useRef(null);

    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
                setIsUserDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const navLinks = [
        { to: '/', label: 'Home', icon: <FaHome className="mr-2" /> },
        { to: '/movie', label: 'Movies', icon: <FaFilm className="mr-2" /> },
        { to: '/upcoming', label: 'Upcoming', icon: <FaCalendarAlt className="mr-2" /> },
        { to: '/toprated', label: 'Top Rated', icon: <FaStar className="mr-2" /> },
    ];

    const mobileMenuVariants = {
        hidden: { opacity: 0, height: 0 },
        visible: { 
            opacity: 1, 
            height: 'auto',
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        },
        exit: { opacity: 0, height: 0 }
    };

    const navItemVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.header 
            initial={{ y: -100 }} 
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className={`fixed w-full top-0 z-50 ${
                scrolled 
                    ? 'bg-gray-900 shadow-xl' 
                    : 'bg-gray-900/90 backdrop-blur-sm'
            } transition-all duration-300`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 md:h-20">
                    <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="flex-shrink-0 flex items-center"
                    >
                        <NavLink to="/" className="flex items-center">
                            <span className="text-3xl sm:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-yellow-400 hover:from-yellow-400 hover:to-red-500 transition-all duration-500">
                                ZEE
                            </span>
                            <span className="ml-1 text-2xl sm:text-3xl text-white font-medium">
                                Movie
                            </span>
                        </NavLink>
                    </motion.div>

                    <div className="hidden md:flex items-center space-x-2">
                        {navLinks.map((link) => (
                            <NavLink 
                                key={link.to}
                                to={link.to}
                                className={({isActive}) => `
                                    px-4 py-2 rounded-lg text-white hover:bg-gray-700/50 transition-all duration-200
                                    ${isActive ? 'text-red-400 font-medium bg-gray-800' : ''}
                                    flex items-center text-sm lg:text-base
                                `}
                            >
                                {link.icon}
                                {link.label}
                            </NavLink>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="relative"
                            onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                            ref={userDropdownRef}
                        >
                            <FaUserCircle className="text-2xl text-gray-300 hover:text-white" />
                            <AnimatePresence>
                                {isUserDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 20 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-50"
                                    >
                                        <NavLink
                                            to="/register"
                                            className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                                        >
                                            Register
                                        </NavLink>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    </div>

                    <div className="flex md:hidden items-center">
                        <button 
                            className="text-white text-2xl p-1 focus:outline-none"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <FaTimes /> : <FaBars />}
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div 
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={mobileMenuVariants}
                        className="md:hidden bg-gray-800/95 backdrop-blur-sm overflow-hidden"
                    >
                        <div className="px-2 pt-2 pb-4 space-y-1">
                            {navLinks.map((link) => (
                                <motion.div key={link.to} variants={navItemVariants}>
                                    <NavLink 
                                        to={link.to}
                                        className={({isActive}) => `
                                            flex items-center px-4 py-3 rounded-lg text-white 
                                            ${isActive ? 'bg-red-500/90 text-white' : 'hover:bg-gray-700/50'}
                                            transition-all duration-200
                                        `}
                                    >
                                        {link.icon}
                                        {link.label}
                                    </NavLink>
                                </motion.div>
                            ))}

                            <motion.div variants={navItemVariants} className="pt-2 border-t border-gray-700">
                                <NavLink to="/register" className="block px-4 py-3 rounded-lg text-white hover:bg-gray-700/50">
                                    Register
                                </NavLink>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
};

export default Navbar;