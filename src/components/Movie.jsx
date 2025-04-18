import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaStar, FaTimes, FaPlay } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const API_KEY = "d53a11a77fbfcc4d08f4b388f269eff3";
const BASE_URL = "https://api.themoviedb.org/3";

const Movie = () => {
    const [search, setSearch] = useState("");
    const [movies, setMovies] = useState([]);
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [trailerKey, setTrailerKey] = useState(null);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [showTrending, setShowTrending] = useState(true);

    // Fetch trending movies on initial load
    useEffect(() => {
        const fetchTrendingMovies = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`
                );
                const data = await response.json();
                setTrendingMovies(data.results.slice(0, 10));
            } catch (error) {
                console.error("Error fetching trending movies:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTrendingMovies();
    }, []);

    const handleSearch = async (query) => {
        if (!query.trim()) {
            setShowTrending(true);
            return;
        }
        
        setLoading(true);
        setShowTrending(false);
        try {
            const response = await fetch(
                `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=1`
            );
            const data = await response.json();
            setMovies(data.results);
        } catch (error) {
            console.error("Error fetching movies:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchTrailer = async (movieId) => {
        try {
            const response = await fetch(
                `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`
            );
            const data = await response.json();
            const trailer = data.results.find(
                (video) => video.type === "Trailer" && video.site === "YouTube"
            );
            
            if (trailer) {
                setTrailerKey(trailer.key);
                setSelectedMovie(
                    movies.find(movie => movie.id === movieId) || 
                    trendingMovies.find(movie => movie.id === movieId)
                );
            } else {
                alert("No trailer available for this movie");
            }
        } catch (error) {
            console.error("Error fetching trailer:", error);
        }
    };

    const closeTrailer = () => {
        setTrailerKey(null);
        setSelectedMovie(null);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"
                ></motion.div>
            </div>
        );
    }

    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-9 p-4 sm:p-6 flex flex-col items-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800"
        >
            {/* Header with animated gradient text */}
            <motion.h1 
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 mt-6 sm:mt-10"
            >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-yellow-400 to-red-500 bg-size-200 animate-gradient">
                    Movie Explorer
                </span>
            </motion.h1>

            {/* Search bar with floating animation */}
            <motion.div 
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="relative w-full max-w-md mb-10"
            >
                <input
                    className="w-full rounded-full py-3 px-5 pl-12 bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent shadow-lg transition-all duration-300 hover:shadow-red-500/20"
                    type="search"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        if (!e.target.value) setShowTrending(true);
                    }}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch(search)}
                    placeholder="Search for movies..."
                />
                <FaSearch 
                    className="absolute left-5 top-1/2 transform -translate-y-1/2 text-red-500 cursor-pointer hover:text-red-400 transition" 
                    onClick={() => handleSearch(search)} 
                />
                {search && (
                    <FaTimes 
                        className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-white transition"
                        onClick={() => {
                            setSearch("");
                            setShowTrending(true);
                        }}
                    />
                )}
            </motion.div>

            {/* Content area */}
            <div className="w-full max-w-7xl">
                <AnimatePresence>
                    {showTrending ? (
                        <>
                            <motion.h2 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="text-xl sm:text-2xl font-semibold text-white mb-6 flex items-center"
                            >
                                <FaStar className="text-yellow-400 mr-2" />
                                Trending This Week
                            </motion.h2>
                            
                            <Swiper 
                                modules={[Navigation, Pagination, Autoplay]}
                                spaceBetween={20}
                                slidesPerView={1}
                                navigation
                                pagination={{ clickable: true }}
                                autoplay={{ delay: 5000, disableOnInteraction: false }}
                                loop={true}
                                breakpoints={{
                                    320: { slidesPerView: 1 },
                                    480: { slidesPerView: 2 },
                                    640: { slidesPerView: 3 },
                                    768: { slidesPerView: 4 },
                                    1024: { slidesPerView: 5 },
                                }}
                                className="mb-16"
                            >
                                {trendingMovies.map((movie) => (
                                    <SwiperSlide key={movie.id}>
                                        <motion.div 
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.5 }}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="relative group w-full h-[320px] sm:h-[360px] overflow-hidden rounded-xl shadow-xl bg-gray-800 mx-auto cursor-pointer"
                                            onClick={() => fetchTrailer(movie.id)}
                                        >
                                            {movie.poster_path ? (
                                                <img 
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                                                    alt={movie.title} 
                                                    loading="lazy"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                                                    <span className="text-gray-400">No image available</span>
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-4">
                                                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                                    <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                                                        {movie.title}
                                                    </h3>
                                                    <div className="flex items-center text-yellow-400 mb-3">
                                                        <FaStar className="mr-1" />
                                                        <span>{movie.vote_average.toFixed(1)}</span>
                                                    </div>
                                                    <button className="flex items-center justify-center w-full py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition-all duration-300">
                                                        <FaPlay className="mr-2" />
                                                        Watch Trailer
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </>
                    ) : (
                        <>
                            <motion.h2 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-xl sm:text-2xl font-semibold text-white mb-6"
                            >
                                Search Results for "{search}"
                            </motion.h2>
                            
                            {movies.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-16">
                                    {movies.map((movie) => (
                                        <motion.div
                                            key={movie.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3 }}
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.97 }}
                                            className="relative group w-full h-[280px] sm:h-[320px] overflow-hidden rounded-xl shadow-lg bg-gray-800 cursor-pointer"
                                            onClick={() => fetchTrailer(movie.id)}
                                        >
                                            {movie.poster_path ? (
                                                <img 
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                                                    alt={movie.title} 
                                                    loading="lazy"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                                                    <span className="text-gray-400">No image available</span>
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-4">
                                                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                                    <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                                                        {movie.title}
                                                    </h3>
                                                    <button className="flex items-center justify-center w-full py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition-all duration-300">
                                                        <FaPlay className="mr-2" />
                                                        Watch Trailer
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex flex-col items-center justify-center py-16 text-gray-400"
                                >
                                    <FaSearch className="text-5xl mb-4" />
                                    <p className="text-xl">No movies found for "{search}"</p>
                                    <button 
                                        className="mt-6 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full transition"
                                        onClick={() => setShowTrending(true)}
                                    >
                                        View Trending Movies
                                    </button>
                                </motion.div>
                            )}
                        </>
                    )}
                </AnimatePresence>
            </div>

            {/* Trailer Modal */}
            <AnimatePresence>
                {trailerKey && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
                        onClick={closeTrailer}
                    >
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full max-w-4xl bg-gray-900 rounded-xl overflow-hidden shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className="absolute -top-12 right-0 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full z-50 transition transform hover:rotate-90"
                                onClick={closeTrailer}
                            >
                                <FaTimes className="h-5 w-5" />
                            </button>
                            
                            <div className="aspect-w-16 aspect-h-9 w-full">
                                <iframe
                                    className="w-full h-[200px] sm:h-[350px] md:h-[450px] lg:h-[500px]"
                                    src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=0`}
                                    title="Movie Trailer"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                            
                            {selectedMovie && (
                                <div className="p-4 sm:p-6 bg-gray-800">
                                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                                        {selectedMovie.title}
                                    </h3>
                                    <div className="flex items-center text-yellow-400 mb-3">
                                        <FaStar className="mr-1" />
                                        <span>{selectedMovie.vote_average.toFixed(1)}</span>
                                        <span className="text-gray-400 ml-4">
                                            {new Date(selectedMovie.release_date).getFullYear()}
                                        </span>
                                    </div>
                                    <p className="text-gray-300 line-clamp-3">
                                        {selectedMovie.overview || "No description available."}
                                    </p>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Movie;