import React from 'react';
import { useSelector } from 'react-redux';
import MovieList from './MovieList';

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  return (
    movies && (
      <div className="bg-black z-20">
        <div className="-mt-5 md:-mt-80 md:ml-12 relative z-20">
          <MovieList title="Now Playing" movies={movies.nowPlayingMovies} />
          <MovieList title="Popular Movies" movies={movies.popularMovies} />
          <MovieList title="Top Rated Movies" movies={movies.topRatedMovies} />
          <MovieList title="Upcoming Movies" movies={movies.upComingMovies} />
        </div>
      </div>
    )
  );
};

export default SecondaryContainer;
