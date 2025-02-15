import { BACKGROUND_IMAGE } from '../utils/constants';
import GptMovieSuggestions from './GptMovieSuggestions';
import GptSearchBar from './GptSearchBar';

const GptSearch = () => {
  return (
    <div>
      <div className="fixed -z-10">
        <img
          className="h-screen w-screen object-cover"
          src={BACKGROUND_IMAGE}
          alt="Background of different movie poster for login page of netflix"
        />
      </div>
      <GptSearchBar />
      <GptMovieSuggestions />
    </div>
  );
};

export default GptSearch;
