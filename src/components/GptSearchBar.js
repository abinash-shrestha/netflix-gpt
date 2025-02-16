import React, { useRef, useState } from 'react';
import lang from '../utils/languageConstants';
import { useDispatch, useSelector } from 'react-redux';
// import openAi from '../utils/openAi';
import { generateContentWithGemini } from '../utils/gemini';
import { API_OPTIONS } from '../utils/constants';
import { addGptMovieResults } from '../utils/gptSlice';

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const dispatch = useDispatch();

  const searchText = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // const searchMovieTMDB = async (movie) => {
  //   const data = await fetch(
  //     'https://api.themoviedb.org/3/search/movie?query=' +
  //       movie +
  //       'include_adult=false&language=en-US&page=1',
  //     API_OPTIONS
  //   );
  //   const json = await data.json();
  //   return json.results || [];
  // };

  const searchMovieTMDB = async (movie) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
        movie
      )}&include_adult=false&language=en-US&page=1`,
      API_OPTIONS
    );

    const json = await response.json();
    // console.log(`TMDB response for "${movie}":`, json);
    return json.results || [];
  };

  const handleGeminiSearchClick = async () => {
    if (!searchText.current || !searchText.current.value) {
      setError('Please enter a search query.');
      return;
    }

    const userQuery = searchText.current.value;
    console.log(userQuery);

    const geminiQuery = `Act as a movie and tv series recommendation system and suggest ten movies and series for the query: "${userQuery}".  Return ONLY the movie names and series, comma-separated. Example: Gadar, Interstellar, Spiderman, Avengers, Golmaal, Wednesday, Game of thrones`;

    const result = await generateContentWithGemini(geminiQuery, {
      // Add any desired generation config options here, like temperature, topP, etc.
      maxOutputTokens: 100, // Limit output length, good for comma-separated lists
    });

    setLoading(false);

    if (result.success) {
      // Split the comma-separated string into an array.
      const movies = result.text.split(',');
      // console.log(movies);

      const promiseArray = movies.map((movie) => searchMovieTMDB(movie));
      // [Promise, Promise, Promise, Promise, Promise]
      // console.log(promiseArray);

      const tmdbResults = await Promise.all(promiseArray);
      // console.log(tmdbResults);

      dispatch(
        addGptMovieResults({ movieNames: movies, movieResults: tmdbResults })
      );
    }
  };
  return (
    <div className="pt-[40%] sm:pt-[20%] md:pt-[15%] lg:pt-[12%] flex justify-center">
      <form
        className="bg-black w-[95%] sm:w-[80%] md:w-1/2 grid grid-cols-12 rounded-lg bg-opacity-75 p-2 md:p-2 lg:p-4"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="mx-2 my-1 px-2 py-2 text-center text-gray-500 col-span-8 text-xs sm:col-span-9 sm:text-sm md:text-base rounded-lg"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          className="mx-2 my-1 px-2 py-2 bg-red-500 rounded-md text-white text-xs col-span-4 sm:col-span-3 sm:text-sm font-normal  "
          onClick={handleGeminiSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
