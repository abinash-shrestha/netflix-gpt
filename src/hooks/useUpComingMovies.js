import { useDispatch, useSelector } from 'react-redux';
import { API_OPTIONS } from '../utils/constants';
import { addUpComingMovies } from '../utils/moviesSlice';
import { useEffect } from 'react';

const useUpComingMovies = () => {
  const dispatch = useDispatch();

  const upComingMovies = useSelector((store) => store.movies.upComingMovies);

  const getUpComingMovies = async () => {
    const data = await fetch(
      'https://api.themoviedb.org/3/movie/upcoming?page=1',
      API_OPTIONS
    );
    const json = await data.json();
    // console.log(json.results)
    dispatch(addUpComingMovies(json.results));
  };

  useEffect(() => {
    !upComingMovies && getUpComingMovies();
  }, []);
};

export default useUpComingMovies;
