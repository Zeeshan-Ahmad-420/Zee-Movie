// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import { Navigation, Pagination } from "swiper/modules";


// const API_KEY = "d53a11a77fbfcc4d08f4b388f269eff3";
// const BASE_URL = "https://api.themoviedb.org/3";


// const categories = [
//   { title: "Trending Movies", url: `/trending/movie/day?api_key=${API_KEY}` },
//   { title: "Top Rated", url: `/movie/top_rated?api_key=${API_KEY}` },
//   { title: "Action Movies", url: `/discover/movie?api_key=${API_KEY}&with_genres=28` },
//   { title: "Comedy Movies", url: `/discover/movie?api_key=${API_KEY}&with_genres=35` },
//   { title: "Drama Movies", url: `/discover/movie?api_key=${API_KEY}&with_genres=18` },
//   { title: "Bollywood Movies", url: `/discover/movie?api_key=${API_KEY}&with_origin_country=IN` },
//   { title: "Hollywood Movies", url: `/discover/movie?api_key=${API_KEY}&with_origin_country=US` },
//   { title: "Lollywood Movies", url: `/discover/movie?api_key=${API_KEY}&with_origin_country=PK` }, 
//   { title: "Horror Movies", url: `/discover/movie?api_key=${API_KEY}&with_genres=27` }, 
//   { title: "Romance Movies", url: `/discover/movie?api_key=${API_KEY}&with_genres=10749` }, 
//   { title: "Documentaries", url: `/discover/movie?api_key=${API_KEY}&with_genres=99` }, 
//   { title: "Cartoon", url: `/discover/movie?api_key=${API_KEY}&with_genres=16` },
// ];

// const Home = () => {
//   const [movies, setMovies] = useState({});
//   const [heroMovie, setHeroMovie] = useState(null);
//   const [trailerKey, setTrailerKey] = useState(null);

//   useEffect(() => {
//     categories.forEach(({ title, url }) => fetchMovies(url, title));
//     fetchHeroMovie();
//   }, []);

//   const fetchMovies = async (url, category) => {
//     try {
//       let response = await fetch(`${BASE_URL}${url}`);
//       let data = await response.json();
//       setMovies((prev) => ({ ...prev, [category]: data.results }));
//     } catch (error) {
//       console.error("Error fetching movies:", error);
//     }
//   };

//   const fetchHeroMovie = async () => {
//     try {
//       let response = await fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`);
//       let data = await response.json();
//       if (data.results.length > 0) {
//         setHeroMovie(data.results[0]);
//       }
//     } catch (error) {
//       console.error("Error fetching hero movie:", error);
//     }
//   };

//   const fetchTrailer = async (movieId) => {
//     try {
//       const response = await fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`);
//       const data = await response.json();
//       const trailer = data.results.find((video) => video.type === "Trailer" && video.site === "YouTube");
//       setTrailerKey(trailer ? trailer.key : null);
//     } catch (error) {
//       console.error("Error fetching trailer:", error);
//     }
//   };

//   return (
//     // <motion.div initial={{ y: -100 }} animate={{ y: 0 }} className="p-4">

//     <motion.div
//       initial={{ y: -100, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{
//         type: "spring",
//         stiffness: 100,
//         damping: 10,
//         delay: 1,
//       }} className="p-4"
//     >
//       {heroMovie && (
//         <div className="hero w-full h-[60vh] relative overflow-hidden">
//           <img
//             className="w-full h-full object-cover absolute top-0 left-0"
//             src={`https://image.tmdb.org/t/p/original${heroMovie.backdrop_path}`}
//             alt={heroMovie.title}
//           />
//           <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black via-black/70 to-black/20"></div>
//           <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-center text-white px-4">
 
//          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{heroMovie.title}</h1>
//            <button
//               onClick={() => fetchTrailer(heroMovie.id)}
//               className="mt-8 px-8 py-3 bg-red-700 text-white font-semibold rounded-lg hover:bg-red-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
//             >
//               Watch Trailer
//             </button> 
//           </div>
//         </div>
//       )}
//       {categories.map(({ title }) => (
//         <MovieSection key={title} title={title} movies={movies[title]} fetchTrailer={fetchTrailer} />
//       ))}
//       {trailerKey && (
//         <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
//           <div className="relative w-full max-w-2xl">
//             <iframe
//               className="w-full h-[500px]"
//               src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
//               title="Movie Trailer"
//               allow="autoplay; encrypted-media"
//               allowFullScreen
//             />
//             <button
//               className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full"
//               onClick={() => setTrailerKey(null)}
//             >
//               ✖
//             </button>
//           </div>
//         </div>
//       )}
//     </motion.div>
//   );
// };

// const MovieSection = ({ title, movies = [], fetchTrailer }) => (
//   <div className="mt-12 px-4">
//     {/* <h2 className="text-3xl font-bold mb-8 text-center text-white">{title}</h2> */}
//     <motion.h2
//       initial={{ y: 50, opacity: 0 }}
//       whileInView={{ y: 0, opacity: 1 }}
//       transition={{ duration: 0.8 }}
//       viewport={{ once: true }}
//       className="text-3xl font-bold mb-8 text-center text-white"
//     ></motion.h2>
//     <Swiper
//       modules={[Navigation, Pagination]}
//       spaceBetween={10}
//       slidesPerView={1}
//       navigation
//       pagination={{ clickable: true }}
//       breakpoints={{
//         640: { slidesPerView: 2 },
//         768: { slidesPerView: 3 },
//         1024: { slidesPerView: 4 },
//       }}
//     >
//       {movies.map((movie) => (
//         <SwiperSlide key={movie.id}>
//           <div className="relative group w-[300px] h-[400px] rounded-3xl overflow-hidden  shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl mx-auto">
//             <img className="w-[300px] h-[400px] object-cover rounded-xl" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
//             <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent flex flex-col justify-end p-4 opacity-100 transition-opacity">
//               <h3 className="text-lg font-semibold text-white mb-1">{movie.title}</h3>
//               <button className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300 w-full" onClick={() => fetchTrailer(movie.id)}>
//                 Play Trailer
//               </button>
//             </div>
//           </div>
//         </SwiperSlide>
//       ))}
//     </Swiper>
//   </div>
// );


// export default Home;



import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

const API_KEY = "d53a11a77fbfcc4d08f4b388f269eff3";
const BASE_URL = "https://api.themoviedb.org/3";

const categories = [
  { title: "Trending Movies", url: `/trending/movie/day?api_key=${API_KEY}` },
  { title: "Top Rated", url: `/movie/top_rated?api_key=${API_KEY}` },
  { title: "Action Movies", url: `/discover/movie?api_key=${API_KEY}&with_genres=28` },
  { title: "Comedy Movies", url: `/discover/movie?api_key=${API_KEY}&with_genres=35` },
  { title: "Drama Movies", url: `/discover/movie?api_key=${API_KEY}&with_genres=18` },
  { title: "Bollywood Movies", url: `/discover/movie?api_key=${API_KEY}&with_origin_country=IN` },
  { title: "Hollywood Movies", url: `/discover/movie?api_key=${API_KEY}&with_origin_country=US` },
  { title: "Lollywood Movies", url: `/discover/movie?api_key=${API_KEY}&with_origin_country=PK` }, 
  { title: "Horror Movies", url: `/discover/movie?api_key=${API_KEY}&with_genres=27` }, 
  { title: "Romance Movies", url: `/discover/movie?api_key=${API_KEY}&with_genres=10749` }, 
  { title: "Documentaries", url: `/discover/movie?api_key=${API_KEY}&with_genres=99` }, 
  { title: "Cartoon", url: `/discover/movie?api_key=${API_KEY}&with_genres=16` },
];

const Home = () => {
  const [movies, setMovies] = useState({});
  const [heroMovie, setHeroMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    categories.forEach(({ title, url }) => fetchMovies(url, title));
    fetchHeroMovie();
  }, []);

  const fetchMovies = async (url, category) => {
    try {
      let response = await fetch(`${BASE_URL}${url}`);
      let data = await response.json();
      setMovies((prev) => ({ ...prev, [category]: data.results }));
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const fetchHeroMovie = async () => {
    try {
      let response = await fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`);
      let data = await response.json();
      if (data.results.length > 0) {
        setHeroMovie(data.results[0]);
      }
    } catch (error) {
      console.error("Error fetching hero movie:", error);
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
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 10,
        delay: 1,
      }} 
      className="px-2 sm:px-4"
    >
      {heroMovie && (
        <div className="hero w-full h-[40vh] sm:h-[50vh] md:h-[60vh] relative overflow-hidden">
          <img
            className="w-full h-full object-cover absolute top-0 left-0"
            src={`https://image.tmdb.org/t/p/original${heroMovie.backdrop_path}`}
            alt={heroMovie.title}
          />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black via-black/70 to-black/20"></div>
          <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-center text-white px-4">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 sm:mb-4 px-2">
              {heroMovie.title}
            </h1>
            <button
              onClick={() => fetchTrailer(heroMovie.id)}
              className="mt-4 sm:mt-8 px-4 sm:px-6 py-2 sm:py-3 bg-red-700 text-white font-semibold rounded-lg hover:bg-red-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base"
            >
              Watch Trailer
            </button> 
          </div>
        </div>
      )}
      {categories.map(({ title }) => (
        <MovieSection key={title} title={title} movies={movies[title]} fetchTrailer={fetchTrailer} />
      ))}
      {trailerKey && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-2">
          <div className="relative w-full max-w-2xl">
            <iframe
              className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px]"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              title="Movie Trailer"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
            <button
              className="absolute top-2 right-2 bg-red-600 text-white p-1 sm:p-2 rounded-full text-xs sm:text-base"
              onClick={() => setTrailerKey(null)}
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

const MovieSection = ({ title, movies = [], fetchTrailer }) => (
  <div className="mt-8 sm:mt-12 px-2 sm:px-4">
    <motion.h2
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-8 text-center text-white"
    >
      {title}
    </motion.h2>
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={10}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      breakpoints={{
        320: { slidesPerView: 1 },
        480: { slidesPerView: 2 },
        640: { slidesPerView: 3 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 4 },
        1280: { slidesPerView: 5 },
      }}
    >
      {movies?.map((movie) => (
        <SwiperSlide key={movie.id}>
          <div className="relative group w-full max-w-[280px] sm:max-w-[300px] h-[360px] sm:h-[400px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl mx-auto">
            <img 
              className="w-full h-full object-cover rounded-xl" 
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
              alt={movie.title} 
            />
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
);

export default Home;









