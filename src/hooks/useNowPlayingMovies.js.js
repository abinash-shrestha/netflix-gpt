import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addNowPlayingMovies } from "../utils/moviesSlice";
import { useEffect } from "react";

const useNowPlayingMovies = () => {

    const dispatch = useDispatch();

    const nowPlayingMovies = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1', API_OPTIONS);
        const json = await data.json();
        // console.log(json.results)
        dispatch(addNowPlayingMovies(json.results))
    }

    // const nowPlayingMovies = async () => {
    //     try {
    //         const response = await fetch("https://api.themoviedb.org/3/movie/now_playing?page=1", API_OPTIONS);
    //         if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    //         const json = await response.json();
    //         dispatch(addNowPlayingMovies(json.results));
    //     } catch (error) {
    //         console.error("Error fetching now playing movies:", error);
    //     }
    // };

    useEffect(() => {
        nowPlayingMovies();
    }, [])
}



export default useNowPlayingMovies;