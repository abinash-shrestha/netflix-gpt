import React from 'react'
import { CDN_IMG_URL } from '../utils/constants'

const MovieCard = ({ poster_path }) => {
    return (
        <div className='w-48 pr-4'>
            <img src={CDN_IMG_URL + poster_path} />
        </div>
    )
}

export default MovieCard
