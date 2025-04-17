
// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { FaSearch } from "react-icons/fa";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// const API_KEY = "d53a11a77fbfcc4d08f4b388f269eff3";
// const BASE_URL = "https://api.themoviedb.org/3";

// const Movie = () => {
//     const [search, setSearch] = useState("");
//     const [movies, setMovies] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [trailerKey, setTrailerKey] = useState(null);

//     const handleSearch = async (query) => {
//         if (!query) return;
//         setLoading(true);
//         try {
//             const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=1`);
//             const data = await response.json();
//             setMovies(data.results);
//         } catch (error) {
//             console.error("Error fetching movies:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const fetchTrailer = async (movieId) => {
//         try {
//             const response = await fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`);
//             const data = await response.json();
//             const trailer = data.results.find((video) => video.type === "Trailer" && video.site === "YouTube");
//             setTrailerKey(trailer ? trailer.key : null);
//         } catch (error) {
//             console.error("Error fetching trailer:", error);
//         }
//     };

//     return (
//         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 flex flex-col items-center justify-center min-h-screen">
//             <h1 className="text-5xl font-bold text-red-700">Discover Your Movies</h1>
//             <div className="relative mt-10 w-full max-w-md">
//                 <input
//                     className="w-full rounded-[20px] p-5 bg-slate-950 text-center border border-red-700 focus:outline-none"
//                     type="search"
//                     value={search}
//                     onChange={(e) => setSearch(e.target.value)}
//                     onKeyPress={(e) => e.key === "Enter" && handleSearch(search)}
//                     placeholder="Search..."
//                 />
//                 <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-red-700 cursor-pointer" onClick={() => handleSearch(search)} />
//             </div>

//             {loading && <p className="text-white mt-5">Loading...</p>}

//             <div className="mt-12 px-4 w-full">
//                 <Swiper 
//                     modules={[Navigation, Pagination]}
//                     spaceBetween={30}
//                     slidesPerView={1}
//                     navigation
//                     pagination={{ clickable: true }}
//                     breakpoints={{
//                         640: { slidesPerView: 2 },
//                         768: { slidesPerView: 3 },
//                         1024: { slidesPerView: 4 },
//                     }}
//                 >
//                     {movies.map((movie) => (
//                         <SwiperSlide key={movie.id}>
//                             <div className="relative group w-[300px]  h-[400px] overflow-hidden rounded-3xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl mx-auto">
//                                 {movie.poster_path && (
//                                     <img className="w-full h-full object-cover rounded-xl" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
//                                 )}
//                                 <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent flex flex-col justify-end p-4 opacity-100 transition-opacity">
//                                     <h3 className="text-lg font-semibold text-white mb-1">{movie.title}</h3>
//                                     <button className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300 w-full" onClick={() => fetchTrailer(movie.id)}>
//                                         Play Trailer
//                                     </button>
//                                 </div>
//                             </div>
//                         </SwiperSlide>
//                     ))}
//                 </Swiper>
//             </div>

//             {trailerKey && (
//                 <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4">
//                     <div className="relative w-full max-w-4xl">
//                         <button className="absolute -top-10 right-0 bg-red-600 text-white p-2 rounded-full" onClick={() => setTrailerKey(null)}>
//                             Close
//                         </button>
//                         <iframe className="w-full h-96" src={`https://www.youtube.com/embed/${trailerKey}`} title="YouTube video player" frameBorder="0" allowFullScreen></iframe>
//                     </div>
//                 </div>
//             )}
//         </motion.div>
//     );
// };

// export default Movie;


import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const API_KEY = "d53a11a77fbfcc4d08f4b388f269eff3";
const BASE_URL = "https://api.themoviedb.org/3";

const Movie = () => {
    const [search, setSearch] = useState("");
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [trailerKey, setTrailerKey] = useState(null);

    const handleSearch = async (query) => {
        if (!query) return;
        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=1`);
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
            const response = await fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`);
            const data = await response.json();
            const trailer = data.results.find((video) => video.type === "Trailer" && video.site === "YouTube");
            setTrailerKey(trailer ? trailer.key : null);
        } catch (error) {
            console.error("Error fetching trailer:", error);
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="p-2 sm:p-4 flex flex-col items-center justify-center min-h-screen"
        >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-red-700 text-center px-2">
                Discover Your Movies
            </h1>
            <div className="relative mt-6 sm:mt-10 w-full max-w-xs sm:max-w-md">
                <input
                    className="w-full rounded-xl sm:rounded-[20px] p-3 sm:p-4 bg-slate-950 text-center border border-red-700 focus:outline-none text-sm sm:text-base"
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch(search)}
                    placeholder="Search..."
                />
                <FaSearch 
                    className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-red-700 cursor-pointer" 
                    onClick={() => handleSearch(search)} 
                />
            </div>

            {loading && <p className="text-white mt-4 sm:mt-5">Loading...</p>}

            <div className="mt-8 sm:mt-12 px-2 sm:px-4 w-full">
                <Swiper 
                    modules={[Navigation, Pagination]}
                    spaceBetween={15}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    breakpoints={{
                        320: { slidesPerView: 1 },
                        480: { slidesPerView: 2 },
                        640: { slidesPerView: 3 },
                        768: { slidesPerView: 3 },
                        1024: { slidesPerView: 4 },
                    }}
                >
                    {movies.map((movie) => (
                        <SwiperSlide key={movie.id}>
                            <div className="relative group w-full max-w-[280px] h-[360px] sm:h-[400px] overflow-hidden rounded-2xl sm:rounded-3xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl mx-auto">
                                {movie.poster_path && (
                                    <img 
                                        className="w-full h-full object-cover rounded-xl" 
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                                        alt={movie.title} 
                                    />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent flex flex-col justify-end p-3 sm:p-4 opacity-100 transition-opacity">
                                    <h3 className="text-sm sm:text-lg font-semibold text-white mb-1 truncate">{movie.title}</h3>
                                    <button 
                                        className="px-3 sm:px-4 py-1 sm:py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300 w-full text-xs sm:text-sm"
                                        onClick={() => fetchTrailer(movie.id)}
                                    >
                                        Play Trailer
                                    </button>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {trailerKey && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-2 sm:p-4 z-50">
                    <div className="relative w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-4xl">
                        <button 
                            className="absolute -top-8 sm:-top-10 right-0 bg-red-600 text-white p-1 sm:p-2 rounded-full text-xs sm:text-base"
                            onClick={() => setTrailerKey(null)}
                        >
                            Close
                        </button>
                        <iframe 
                            className="w-full h-[180px] sm:h-[250px] md:h-[350px] lg:h-[400px]" 
                            src={`https://www.youtube.com/embed/${trailerKey}`} 
                            title="YouTube video player" 
                            frameBorder="0" 
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default Movie;