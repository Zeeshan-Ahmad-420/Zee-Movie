import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaYoutube, FaFacebook, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-gray-900 border-t border-gray-800 text-gray-400 w-full py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="flex flex-col h-full"
            >
              <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-yellow-400 mb-4">
                Zee Movies
              </h3>
              <p className="text-sm mb-4 flex-grow">
                Discover unlimited movies and TV shows. Stream anytime, anywhere.
              </p>
              <div className="flex space-x-4">
                {[
                  { icon: <FaGithub className="h-5 w-5" />, url: "https://github.com" },
                  { icon: <FaTwitter className="h-5 w-5" />, url: "https://twitter.com" },
                  { icon: <FaYoutube className="h-5 w-5" />, url: "https://youtube.com" },
                  { icon: <FaLinkedin className="h-5 w-5" />, url: "https://linkedin.com" },
                  { icon: <FaFacebook className="h-5 w-5" />, url: "https://facebook.com" },
                  { icon: <FaInstagram className="h-5 w-5" />, url: "https://instagram.com" }
                ].map((social, index) => (
                  <motion.a 
                    key={index}
                    whileHover={{ y: -2, scale: 1.1 }}
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-lg">Explore</h4>
            <ul className="space-y-3">
              {['Home', 'Movies', 'TV Shows', 'Trending', 'My List'].map((item, index) => (
                <motion.li key={index} whileHover={{ x: 5 }}>
                  <a href="#" className="hover:text-white transition text-sm sm:text-base">{item}</a>
                </motion.li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-lg">Legal</h4>
            <ul className="space-y-3">
              {['Terms of Service', 'Privacy Policy', 'Cookie Policy', 'DMCA', 'GDPR'].map((item, index) => (
                <motion.li key={index} whileHover={{ x: 5 }}>
                  <a href="#" className="hover:text-white transition text-sm sm:text-base">{item}</a>
                </motion.li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-lg">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-sm sm:text-base">za7240054@gmail.com</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-sm sm:text-base">+92 (336) 89-90890</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm sm:text-base">123 Movie St, Hollywood, CA</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-center md:text-left mb-4 md:mb-0">
            &copy; {currentYear} Zee Movie. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-sm hover:text-white transition">Terms</a>
            <a href="#" className="text-sm hover:text-white transition">Privacy</a>
            <a href="#" className="text-sm hover:text-white transition">Cookies</a>
          </div>
        </div>

        <div className="text-xs text-gray-500 mt-4 text-center">
          <p>This product uses the TMDb API but is not endorsed or certified by TMDb.</p>
          <p className="mt-1">Data provided by The Movie Database (TMDb).</p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;