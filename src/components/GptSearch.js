import { BACKGROUND_IMAGE } from "../utils/constants";
import GptMovieSuggestions from "./GptMovieSuggestions";
import GptSearchBar from "./GptSearchBar";

const GptSearch = () => {
  return <div>
    <div className="absolute -z-10">
      <img
        className=""
        src={BACKGROUND_IMAGE}
        alt="Background of different movie poster for login page of netflix"
      />
    </div>
    <GptSearchBar />
    <GptMovieSuggestions />
  </div>;
};

export default GptSearch;
