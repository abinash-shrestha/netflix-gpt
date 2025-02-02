import React from 'react'
import useGetTrailerVideo from '../hooks/useGetTrailerVideo'
import { useSelector } from 'react-redux';

const VideoBackground = ({ movieId }) => {
    useGetTrailerVideo(movieId);
    const trailerVideo = useSelector((store) => store.movies?.trailerVideo);

    return (
        <div className='w-screen '>

            <iframe className='w-screen aspect-video ' src={"https://www.youtube.com/embed/" + trailerVideo?.key} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

        </div>
    )
}

export default VideoBackground
