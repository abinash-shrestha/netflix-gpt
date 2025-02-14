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
      console.log(movies);

      const promiseArray = movies.map((movie) => searchMovieTMDB(movie));
      // [Promise, Promise, Promise, Promise, Promise]
      console.log(promiseArray);

      const tmdbResults = await Promise.all(promiseArray);
      console.log(tmdbResults);

      dispatch(
        addGptMovieResults({ movieNames: movies, movieResults: tmdbResults })
      );
    }
  };
  return (
    <div className="pt-[6%] flex justify-center">
      <form
        className="bg-black w-1/2 grid grid-cols-12 rounded-lg bg-opacity-75 px-6 py-2"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 text-gray-500 col-span-9 rounded-lg"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          className="px-3 py-1 m-6 bg-red-500 rounded-md text-white col-span-3 font-bold"
          onClick={handleGeminiSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
