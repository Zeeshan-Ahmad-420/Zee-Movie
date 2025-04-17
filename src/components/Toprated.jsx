// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";

// const API_KEY = "d53a11a77fbfcc4d08f4b388f269eff3";
// const BASE_URL = "https://api.themoviedb.org/3";
// const upcoming = `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`;
// const Toprated = () => {
//   const [movies, setMovies] = useState([]);
//   const [trailerKey, setTrailerKey] = useState(null);
//   const [isTrailerOpen, setIsTrailerOpen] = useState(false);

//   useEffect(() => {
//     const fetchMovies = async () => {
//       try {
//         const response = await fetch(upcoming);
//         if (!response.ok) throw new Error("Failed to fetch movies.");
//         const data = await response.json();
//         setMovies(data.results || []);
//       } catch (error) {
//         console.error("Error fetching movies:", error);
//       }
//     };

//     fetchMovies();
//   }, []);

//   const fetchTrailer = async (movieId) => {
//     try {
//       const response = await fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`);
//       if (!response.ok) throw new Error("Failed to fetch trailer.");
//       const data = await response.json();
//       const trailer = data.results?.find((video) => video.type === "Trailer" && video.site === "YouTube");
      
//       if (trailer) {
//         setTrailerKey(trailer.key);
//         setIsTrailerOpen(true);
//       } else {
//         setTrailerKey(null);
//         alert("Trailer not available.");
//       }
//     } catch (error) {
//       console.error("Error fetching trailer:", error);
//     }
//   };

//   return (
//     <motion.div
//       initial={{ y: -100, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ type: "spring", stiffness: 100, damping: 10, delay: 1 }}
//       className="p-4"
//     >
//       <h1 className="text-5xl mt-32 font-bold text-red-700 text-center mb-6">
//         Upcoming Movies
//       </h1>
//       <div className="flex flex-wrap mt-12 justify-center gap-6">
//         {movies.length > 0 ? (
//           movies.map((movie) => (
//             <div
//               key={movie.id}
//               className="relative group w-[300px] h-[450px] rounded-3xl overflow-hidden shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl mx-auto"
//             >
//               <img
//                 className="w-full h-full object-cover rounded-xl"
//                 src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "/placeholder.jpg"}
//                 alt={movie.title || "Movie Poster"}
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent flex flex-col justify-end p-4 opacity-100 transition-opacity">
//                 <h3 className="text-lg font-semibold text-white mb-2">
//                   {movie.title || "Untitled"}
//                 </h3>
//                 <button
//                   className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300 w-full"
//                   onClick={() => fetchTrailer(movie.id)}
//                 >
//                   Play Trailer
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-center text-gray-400">Loading movies...</p>
//         )}
//       </div>

//       {isTrailerOpen && trailerKey && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
//           <div className="relative w-full max-w-3xl">
//             <button
//               className="absolute top-2 right-2 bg-white text-black px-3 py-1 rounded-full font-bold"
//               onClick={() => setIsTrailerOpen(false)}
//             >
//               ✕
//             </button>
//             <iframe
//               className="w-full h-[400px] rounded-xl"
//               src={`https://www.youtube.com/embed/${trailerKey}`}
//               title="Movie Trailer"
//               allowFullScreen
//             ></iframe>
//           </div>
//         </div>
//       )}
//     </motion.div>
//   );
// };

// export default Toprated;


import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const API_KEY = "d53a11a77fbfcc4d08f4b388f269eff3";
const BASE_URL = "https://api.themoviedb.org/3";
const upcoming = `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`;
const Toprated = () => {
  const [movies, setMovies] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(upcoming);
        if (!response.ok) throw new Error("Failed to fetch movies.");
        const data = await response.json();
        setMovies(data.results || []);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const fetchTrailer = async (movieId) => {
    try {
      const response = await fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`);
      if (!response.ok) throw new Error("Failed to fetch trailer.");
      const data = await response.json();
      const trailer = data.results?.find((video) => video.type === "Trailer" && video.site === "YouTube");
      
      if (trailer) {
        setTrailerKey(trailer.key);
        setIsTrailerOpen(true);
      } else {
        setTrailerKey(null);
        alert("Trailer not available.");
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  };

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 10, delay: 1 }}
      className="p-2 sm:p-4"
    >
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-20 sm:mt-24 md:mt-28 lg:mt-32 font-bold text-red-700 text-center mb-4 sm:mb-6">
        Top Rated Movies
      </h1>
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-5 lg:gap-6">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div
              key={movie.id}
              className="relative group w-[140px] h-[200px] sm:w-[180px] sm:h-[250px] md:w-[220px] md:h-[300px] lg:w-[250px] lg:h-[350px] xl:w-[280px] xl:h-[400px] rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl mx-auto"
            >
              <img
                className="w-full h-full object-cover rounded-xl"
                src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "/placeholder.jpg"}
                alt={movie.title || "Movie Poster"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent flex flex-col justify-end p-2 sm:p-3 md:p-4 opacity-100 transition-opacity">
                <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-white mb-1 truncate">
                  {movie.title || "Untitled"}
                </h3>
                <button
                  className="px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 bg-red-600 text-white font-semibold rounded-md sm:rounded-lg hover:bg-red-700 transition duration-300 w-full text-xs sm:text-sm"
                  onClick={() => fetchTrailer(movie.id)}
                >
                  Play Trailer
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">Loading movies...</p>
        )}
      </div>

      {isTrailerOpen && trailerKey && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50 p-2">
          <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-3xl">
            <button
              className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-white text-black px-2 py-1 sm:px-3 sm:py-1 rounded-full font-bold text-xs sm:text-sm"
              onClick={() => setIsTrailerOpen(false)}
            >
              ✕
            </button>
            <iframe
              className="w-full h-[180px] sm:h-[250px] md:h-[300px] lg:h-[350px] xl:h-[400px] rounded-lg"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="Movie Trailer"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Toprated;