import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaPlay, FaTimes, FaStar, FaHeart, FaRegHeart, 
  FaShareAlt, FaSpinner, FaFilter, FaSearch,
  FaCalendarAlt
} from "react-icons/fa";
import debounce from "lodash.debounce";

const API_KEY = "d53a11a77fbfcc4d08f4b388f269eff3";
const BASE_URL = "https://api.themoviedb.org/3";

const Upcoming = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [isTrailerLoading, setIsTrailerLoading] = useState(false);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteUpcomingMovies');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const fetchMovies = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`
      );
      if (!response.ok) throw new Error("Failed to fetch upcoming movies.");
      const data = await response.json();
      setMovies(prev => page === 1 ? data.results : [...prev, ...data.results]);
      setTotalPages(data.total_pages);
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  const applyFilters = useCallback(() => {
    let result = [...movies];
    
    if (searchQuery) {
      result = result.filter(movie => 
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (yearFilter) {
      result = result.filter(movie => 
        movie.release_date?.startsWith(yearFilter)
      );
    }
    
    if (ratingFilter > 0) {
      result = result.filter(movie => 
        movie.vote_average >= ratingFilter
      );
    }
    
    setFilteredMovies(result);
  }, [movies, searchQuery, yearFilter, ratingFilter]);

  const handleSearch = debounce((query) => {
    setSearchQuery(query);
  }, 300);

  const fetchTrailer = useCallback(async (movieId) => {
    try {
      setIsTrailerLoading(true);
      const response = await fetch(
        `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`
      );
      if (!response.ok) throw new Error("Failed to fetch trailer.");
      const data = await response.json();
      const trailer = data.results?.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );

      if (trailer) {
        setTrailerKey(trailer.key);
        setSelectedMovie(movies.find(movie => movie.id === movieId));
      } else {
        throw new Error("Trailer not available");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsTrailerLoading(false);
    }
  }, [movies]);

  const closeTrailer = useCallback(() => {
    setTrailerKey(null);
    setSelectedMovie(null);
  }, []);

  const toggleFavorite = useCallback((movieId) => {
    const newFavorites = favorites.includes(movieId)
      ? favorites.filter(id => id !== movieId)
      : [...favorites, movieId];
    
    setFavorites(newFavorites);
    localStorage.setItem('favoriteUpcomingMovies', JSON.stringify(newFavorites));
  }, [favorites]);

  const shareMovie = useCallback((movie) => {
    const shareData = {
      title: movie.title,
      text: `Check out ${movie.title} (${movie.vote_average}/10), coming soon!`,
      url: `https://www.themoviedb.org/movie/${movie.id}`,
    };
    
    if (navigator.share) {
      navigator.share(shareData).catch(console.error);
    } else {
      navigator.clipboard?.writeText(shareData.url)
        .then(() => alert('Link copied to clipboard!'))
        .catch(() => alert(`Share this movie: ${shareData.url}`));
    }
  }, []);

  const loadMore = useCallback(() => {
    if (page < totalPages) {
      setPage(prev => prev + 1);
    }
  }, [page, totalPages]);

  const resetFilters = useCallback(() => {
    setSearchQuery("");
    setYearFilter("");
    setRatingFilter(0);
    setFilteredMovies(movies);
  }, [movies]);

  const yearOptions = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 5 }, (_, i) => currentYear + i);
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const displayMovies = useMemo(() => {
    return filteredMovies.length > 0 || searchQuery || yearFilter || ratingFilter > 0 
      ? filteredMovies 
      : movies;
  }, [movies, filteredMovies, searchQuery, yearFilter, ratingFilter]);

  if (isLoading && page === 1) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-red-500 p-4">
        <p className="text-xl mb-4">Error: {error}</p>
        <button
          onClick={() => {
            setError(null);
            fetchMovies();
          }}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mt-12 min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-8 px-4 sm:px-6"
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-yellow-400 to-red-500 animate-gradient">
          Upcoming Movies
        </h1>
        <p className="text-gray-400 mt-2 max-w-2xl mx-auto">
          Discover the most anticipated movies coming soon to theaters
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 w-full sm:w-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search movies..."
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 pr-4 py-2 w-full bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <FaFilter />
            <span>Filters</span>
          </button>
        </div>
        
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
            className="mt-4 p-4 bg-gray-800 rounded-lg"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-400 mb-2">Release Year</label>
                <select
                  value={yearFilter}
                  onChange={(e) => setYearFilter(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white"
                >
                  <option value="">All Years</option>
                  {yearOptions.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-gray-400 mb-2">Minimum Rating</label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="0.5"
                    value={ratingFilter}
                    onChange={(e) => setRatingFilter(parseFloat(e.target.value))}
                    className="w-full"
                  />
                  <span className="text-yellow-400 font-medium w-10">
                    {ratingFilter > 0 ? ratingFilter : 'Any'}
                  </span>
                </div>
              </div>
              
              <div className="flex items-end">
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {displayMovies.length > 0 && (
        <div className="max-w-6xl mx-auto mb-4 text-gray-400">
          Showing {displayMovies.length} of {movies.length} movies
          {(searchQuery || yearFilter || ratingFilter > 0) && " (filtered)"}
        </div>
      )}

      {displayMovies.length === 0 ? (
        <div className="text-center text-gray-400 py-16">
          <p className="text-xl mb-4">
            {movies.length === 0 
              ? "No upcoming movies found." 
              : "No movies match your search/filters."}
          </p>
          {movies.length === 0 ? (
            <button
              onClick={fetchMovies}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
            >
              Retry
            </button>
          ) : (
            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
            >
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 max-w-6xl mx-auto">
            {displayMovies.map((movie) => (
              <MovieCard 
                key={movie.id}
                movie={movie}
                isFavorite={favorites.includes(movie.id)}
                onTrailerClick={fetchTrailer}
                onFavoriteToggle={toggleFavorite}
                onShareClick={shareMovie}
              />
            ))}
          </div>

          {page < totalPages && displayMovies.length === movies.length && (
            <div className="flex justify-center mt-10">
              <button
                onClick={loadMore}
                disabled={isLoading}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-300 flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Load More Movies"
                )}
              </button>
            </div>
          )}
        </>
      )}

      <AnimatePresence>
        {trailerKey && (
          <TrailerModal 
            trailerKey={trailerKey}
            movie={selectedMovie}
            isFavorite={favorites.includes(selectedMovie?.id)}
            isTrailerLoading={isTrailerLoading}
            onClose={closeTrailer}
            onFavoriteToggle={toggleFavorite}
            onShareClick={shareMovie}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const MovieCard = React.memo(({ movie, isFavorite, onTrailerClick, onFavoriteToggle, onShareClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="relative group rounded-xl overflow-hidden shadow-lg bg-gray-800 cursor-pointer"
    >
      <div className="aspect-[2/3] w-full">
        <img
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : '/placeholder.jpg'
          }
          alt={movie.title || "Movie Poster"}
          loading="lazy"
        />
      </div>

      <div className="absolute top-2 right-2 z-10">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onFavoriteToggle(movie.id);
          }}
          className="p-2 bg-black/50 rounded-full hover:bg-red-500/80 transition-colors"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? 
            <FaHeart className="text-red-500" /> : 
            <FaRegHeart className="text-white" />
          }
        </button>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-sm sm:text-base font-bold text-white mb-1 line-clamp-2">
            {movie.title || "Untitled"}
          </h3>
          <div className="flex items-center text-yellow-400 mb-2">
            <FaStar className="mr-1" />
            <span className="text-xs sm:text-sm">
              {movie.vote_average?.toFixed(1) || "N/A"}
            </span>
          </div>
          <div className="flex items-center text-gray-300 text-xs sm:text-sm mb-3">
            <FaCalendarAlt className="mr-1" />
            <span>
              {movie.release_date
                ? new Date(movie.release_date).toLocaleDateString()
                : "Coming soon"}
            </span>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onTrailerClick(movie.id);
              }}
              className="flex-1 flex items-center justify-center py-2 bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-medium rounded-md transition-colors duration-300"
            >
              <FaPlay className="mr-2" />
              Trailer
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onShareClick(movie);
              }}
              className="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors duration-300"
              aria-label="Share movie"
            >
              <FaShareAlt />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

const TrailerModal = React.memo(({ trailerKey, movie, isFavorite, isTrailerLoading, onClose, onFavoriteToggle, onShareClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="relative w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute -top-10 right-0 text-white hover:text-red-500 text-2xl transition-colors"
          onClick={onClose}
          aria-label="Close trailer"
        >
          <FaTimes />
        </button>

        {isTrailerLoading ? (
          <div className="aspect-video bg-gray-800 flex items-center justify-center rounded-lg">
            <FaSpinner className="animate-spin text-4xl text-red-500" />
          </div>
        ) : (
          <>
            <div className="aspect-w-16 aspect-h-9 w-full">
              <iframe
                className="w-full h-[200px] sm:h-[350px] md:h-[450px] lg:h-[500px] rounded-lg"
                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=0`}
                title={`${movie?.title || 'Movie'} Trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {movie && (
              <div className="mt-4 p-4 bg-gray-800 rounded-lg">
                <div className="flex flex-col sm:flex-row justify-between items-start mb-2 gap-2">
                  <h3 className="text-xl font-bold text-white">
                    {movie.title}
                  </h3>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center text-yellow-400">
                      <FaStar className="mr-1" />
                      {movie.vote_average?.toFixed(1) || "N/A"}
                    </span>
                    <span className="flex items-center text-gray-400">
                      <FaCalendarAlt className="mr-1" />
                      {movie.release_date
                        ? new Date(movie.release_date).toLocaleDateString()
                        : "Coming soon"}
                    </span>
                  </div>
                </div>
                <p className="text-gray-300 text-sm sm:text-base mb-4">
                  {movie.overview || "No description available."}
                </p>
                <div className="flex flex-wrap gap-3">
                  <button 
                    onClick={() => onFavoriteToggle(movie.id)}
                    className="flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
                  >
                    {isFavorite ? 
                      <FaHeart className="text-red-500 mr-2" /> : 
                      <FaRegHeart className="mr-2" />
                    }
                    {isFavorite ? 'Favorited' : 'Favorite'}
                  </button>
                  <button 
                    onClick={() => onShareClick(movie)}
                    className="flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
                  >
                    <FaShareAlt className="mr-2" />
                    Share
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </motion.div>
    </motion.div>
  );
});

export default Upcoming;