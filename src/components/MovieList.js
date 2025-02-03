import React from 'react'
import MovieCard from './MovieCard'

const MovieList = ({ title, movies }) => {
    console.log(movies)
    return (
        <div className='m-4'>
            <h1 className='text-2xl font-bold text-white'>{title}</h1>
            <div className='flex overflow-x-scroll'>
                <div className='flex '>
                    {movies && (
                        movies?.map((movie) => (
                            <MovieCard key={movie.id} poster_path={movie.poster_path} />
                        ))
                    )}
                </div>
            </div>


        </div>
    )
}

export default MovieList
