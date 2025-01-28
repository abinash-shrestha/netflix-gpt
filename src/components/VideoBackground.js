import React, { useEffect } from 'react'
import { API_OPTIONS } from '../utils/constants'

const VideoBackground = ({ id }) => {
    const getMovieTrailer = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/939243/videos?language=en-US', API_OPTIONS)
        const json = await data.json();
        console.log(json)

        const filteredData = json.results.filter((video) => video.type === "Trailer");
        const trailerData = filteredData.length ? filteredData[0] : json.results[0];
        console.log(trailerData);



    }
    useEffect(() => {
        getMovieTrailer();
    }, [])
    return (
        <div>
            VideoBackground

        </div>
    )
}

export default VideoBackground
