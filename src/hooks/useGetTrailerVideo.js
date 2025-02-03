import { useEffect } from 'react'
import { API_OPTIONS } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addTrailerVideo } from '../utils/moviesSlice';

const useGetTrailerVideo = (movieId) => {

    const dispatch = useDispatch();


    const getMovieTrailer = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/' + movieId + '/videos?language=en-US', API_OPTIONS)
        const json = await data.json();
        // console.log(json)

        const filteredData = json.results.filter((video) => video.type === "Trailer");
        const trailerData = filteredData.length ? filteredData[0] : json.results[0];
        // console.log(trailerData);

        dispatch(addTrailerVideo(trailerData));





    }
    useEffect(() => {
        getMovieTrailer();
    }, [])
}

export default useGetTrailerVideo
