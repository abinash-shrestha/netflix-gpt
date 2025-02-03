import Header from './Header';
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import useNowPlayingMovies from '../hooks/useNowPlayingMovies.js';

const Browse = () => {
  useNowPlayingMovies();
  return (
    <div>
      <Header />
      <MainContainer />
      <SecondaryContainer />
    </div>
  );
};

export default Browse;
