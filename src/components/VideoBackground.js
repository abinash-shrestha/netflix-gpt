import React from 'react'
import useGetTrailerVideo from '../hooks/useGetTrailerVideo'
import { useSelector } from 'react-redux';

const VideoBackground = ({ movieId }) => {
    useGetTrailerVideo(movieId);
    const trailerVideo = useSelector((store) => store.movies?.trailerVideo);

    return (
        <div className='w-screen '>

            <iframe className='w-screen aspect-video ' src={"https://www.youtube-nocookie.com/embed/" + trailerVideo?.key + "?autoplay=1&amp;mute=1&amp;controls=0"} title="YouTube video player" allow="web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>

        </div>
    )
}

export default VideoBackground
