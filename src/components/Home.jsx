import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

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
  const [activeMovieForTrailer, setActiveMovieForTrailer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await Promise.all(categories.map(({ title, url }) => fetchMovies(url, title)));
        await fetchHeroMovie();
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
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
      setActiveMovieForTrailer(movieId);
      const response = await fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`);
      const data = await response.json();
      const trailer = data.results.find((video) => video.type === "Trailer" && video.site === "YouTube");
      setTrailerKey(trailer ? trailer.key : null);
    } catch (error) {
      console.error("Error fetching trailer:", error);
      setActiveMovieForTrailer(null);
    }
  };

  const closeTrailer = () => {
    setTrailerKey(null);
    setActiveMovieForTrailer(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900 min-h-screen pb-16"
    >
      {heroMovie && (
        <div className="relative w-full h-[50vh] sm:h-[70vh] lg:h-[85vh] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/30 to-transparent z-10"></div>
          <img
            className="w-full h-full object-cover object-center"
            src={`https://image.tmdb.org/t/p/original${heroMovie.backdrop_path}`}
            alt={heroMovie.title}
          />
          <div className="absolute inset-0 flex items-center justify-center text-center z-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight"
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-yellow-400">
                  {heroMovie.title}
                </span>
              </motion.h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-gray-200 text-lg sm:text-xl md:text-2xl mb-8 line-clamp-3"
              >
                {heroMovie.overview}
              </motion.p>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  onClick={() => fetchTrailer(heroMovie.id)}
                  className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  Watch Trailer
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      )}

      <div className="w-full">
        {categories.map(({ title }) => (
          <MovieSection 
            key={title} 
            title={title} 
            movies={movies[title]} 
            fetchTrailer={fetchTrailer} 
            activeMovieForTrailer={activeMovieForTrailer}
          />
        ))}
      </div>

      {trailerKey && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          onClick={closeTrailer}
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-full max-w-4xl bg-black rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute -top-12 right-0 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full z-50 transition"
              onClick={closeTrailer}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="aspect-w-16 aspect-h-9 w-full">
              <iframe
                className="w-full h-[200px] sm:h-[350px] md:h-[450px] lg:h-[550px]"
                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                title="Movie Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

const MovieSection = ({ title, movies = [], fetchTrailer, activeMovieForTrailer }) => {
  if (!movies || movies.length === 0) return null;

  return (
    <div className="mb-16 w-full overflow-hidden">
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="px-4 sm:px-6 lg:px-8 mb-6"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white inline-block">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-yellow-400 animate-text">
            {title}
          </span>
        </h2>
      </motion.div>
      
      <div className="relative group w-full">
        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView="auto"
          navigation={{
            nextEl: `.next-${title.replace(/\s+/g, '-')}`,
            prevEl: `.prev-${title.replace(/\s+/g, '-')}`,
          }}
          className="!overflow-visible !px-4 sm:!px-6 lg:!px-8"
        >
          {movies.map((movie) => (
            <SwiperSlide key={movie.id} className="!w-[150px] sm:!w-[180px] md:!w-[200px] lg:!w-[220px]">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="relative h-[225px] sm:h-[270px] md:h-[300px] rounded-xl overflow-hidden shadow-lg cursor-pointer bg-gray-800"
              >
                <img 
                  className="w-full h-full object-cover transition duration-300 group-hover:brightness-75" 
                  src={
                    movie.poster_path 
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : '/placeholder-movie.jpg'
                  } 
                  alt={movie.title}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-3 opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-white font-semibold text-sm sm:text-base mb-2 line-clamp-2">
                    {movie.title}
                  </h3>
                  <button 
                    className={`w-full py-2 px-3 rounded-md text-xs sm:text-sm font-medium transition ${
                      activeMovieForTrailer === movie.id 
                        ? "bg-red-700 text-white" 
                        : "bg-red-600 hover:bg-red-700 text-white"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      fetchTrailer(movie.id);
                    }}
                  >
                    {activeMovieForTrailer === movie.id ? "Loading..." : "Watch Trailer"}
                  </button>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
        
        <button className={`prev-${title.replace(/\s+/g, '-')} absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full hidden sm:flex items-center justify-center ml-2`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>
        <button className={`next-${title.replace(/\s+/g, '-')} absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full hidden sm:flex items-center justify-center mr-2`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Home;
