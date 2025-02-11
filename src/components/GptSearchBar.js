import React, { useRef, useState } from 'react';
import lang from '../utils/languageConstants';
import { useSelector } from 'react-redux';
// import openAi from '../utils/openAi';
import { generateContentWithGemini } from '../utils/gemini';

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);

  const searchText = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // const handleGptSearchClick = async () => {
  //   console.log(searchText.current.value);

  //   const gptQuery =
  //     'Act as a movie recommendation system and suggest some movies for the query' +
  //     searchText.current.value +
  //     '.only give me names of five movies, comma separated like in this example given here: Example Result: Gadar, Interstellar, Spiderman, Avengers, Golmaal';
  //   const gptResults = await openAi.chat.completions.create({
  //     messages: [{ role: 'user', content: gptQuery }],
  //     model: 'gpt-4o',
  //   });

  //   console.log(gptResults.choices);
  // };

  const handleGeminiSearchClick = async () => {
    if (!searchText.current || !searchText.current.value) {
      setError('Please enter a search query.');
      return;
    }

    const userQuery = searchText.current.value;
    console.log(userQuery);

    const geminiQuery = `Act as a movie recommendation system and suggest five movies for the query: "${userQuery}".  Return ONLY the movie names, comma-separated. Example: Gadar, Interstellar, Spiderman, Avengers, Golmaal`;

    const result = await generateContentWithGemini(geminiQuery, {
      // Add any desired generation config options here, like temperature, topP, etc.
      maxOutputTokens: 100, // Limit output length, good for comma-separated lists
    });

    setLoading(false);

    if (result.success) {
      // Split the comma-separated string into an array.  Trim whitespace.
      const movies = result.text
        .split(',')
        .map((movie) => movie.trim())
        .filter((movie) => movie !== ''); //remove any blank entries
    } else {
      setError(result.error);
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
