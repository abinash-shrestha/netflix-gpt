import React from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ title, movies }) => {
  // console.log(movies)
  return (
    <div className="m-4">
      <h1 className="text-2xl font-bold text-white">{title}</h1>
      <div className="flex overflow-x-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent space-x-4 px-2 snap-x snap-mandatory scroll-smooth">
        <div className="flex ">
          {movies &&
            movies?.map((movie) => (
              <MovieCard key={movie.id} poster_path={movie.poster_path} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
