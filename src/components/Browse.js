import { useEffect } from 'react';
import { API_OPTIONS } from '../utils/constants';
import Header from './Header';
import { addNowPlayingMovies } from '../utils/moviesSlice';
import { useDispatch } from 'react-redux';
import useNowPlayingMovies from '../hooks/useNowPlayingMovies';

const Browse = () => {

  useNowPlayingMovies();




  return (
    <div>
      <Header />
    </div>
  );
};

export default Browse;
