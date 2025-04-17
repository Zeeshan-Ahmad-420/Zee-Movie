import {React,useState }from 'react'
import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { FaSearch, FaUserPlus, FaBars } from 'react-icons/fa'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <motion.div initial={{ y: -100 }} animate={{ y: 0 }}>
            <nav className='z-10 flex justify-between sm:justify-around items-center p-2 sm:p-0 sm:mt-3'>
                <div className="logo text-lg sm:text-xl md:text-2xl text-red-700 font-bold tracking-wide uppercase flex items-center">
                    <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold">ZEE</span>
                    <span className="ml-1 text-xl sm:text-2xl">Movie</span>
                </div>
                
                <button 
                    className="sm:hidden text-white text-xl"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <FaBars />
                </button>
                
                <div className={`${isMenuOpen ? 'flex' : 'hidden'} sm:flex flex-col sm:flex-row absolute sm:static top-16 left-0 right-0 bg-gray-900 sm:bg-transparent p-4 sm:p-0 gap-4 sm:gap-7 items-center z-10`}>
                    <NavLink to='/' onClick={() => setIsMenuOpen(false)}>
                        <li className='list-none text-base sm:text-xl hover:text-red-700'>Home</li>
                    </NavLink>
                    <NavLink to='/Movie' onClick={() => setIsMenuOpen(false)}>
                        <li className='list-none text-base sm:text-xl hover:text-red-700'>Movies</li>
                    </NavLink>
                    <NavLink to='/upcoming' onClick={() => setIsMenuOpen(false)}>
                        <li className='list-none text-base sm:text-xl hover:text-red-700'>UpComing</li>
                    </NavLink>
                    <NavLink to='/toprated' onClick={() => setIsMenuOpen(false)}>
                        <li className='list-none text-base sm:text-xl hover:text-red-700'>Top-Rated</li>
                    </NavLink>
                </div>
                
                <div className="hidden sm:flex items-center gap-3">
                    <NavLink to='/register'>
                        <button className='flex items-center bg-red-700 text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1 sm:py-2 rounded-md hover:bg-red-800 transition duration-300'>
                            <FaUserPlus className='mr-1 sm:mr-2 text-white' />
                            Register
                        </button>
                    </NavLink>
                </div>
            </nav>
        </motion.div>
    )
}

export default Navbar