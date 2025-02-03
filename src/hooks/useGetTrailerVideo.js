// import { useEffect } from 'react';
// import { API_OPTIONS } from '../utils/constants';
// import { useDispatch } from 'react-redux';
// import { addTrailerVideo } from '../utils/moviesSlice';

// const useGetTrailerVideo = (movieId) => {
//   const dispatch = useDispatch();

//   const getMovieTrailer = async () => {
//     const data = await fetch(
//       'https://api.themoviedb.org/3/movie/' +
//         movieId +
//         '/videos?language=en-US',
//       API_OPTIONS
//     );
//     const json = await data.json();
//     // console.log(json)

//     const filteredData = json?.results?.filter(
//       (video) => video.type === 'Trailer'
//     );
//     const trailerData = filteredData?.length
//       ? filteredData[0]
//       : json.results[0];
//     // console.log(trailerData);

//     dispatch(addTrailerVideo(trailerData));
//   };
//   useEffect(() => {
//     getMovieTrailer();
//   }, []);
// };

// export default useGetTrailerVideo;

import { useEffect } from 'react';
import { API_OPTIONS } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addTrailerVideo } from '../utils/moviesSlice';

const useGetTrailerVideo = (movieId) => {
  const dispatch = useDispatch();

  const getMovieTrailer = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        API_OPTIONS
      );
      const json = await response.json();

      if (!json.results || json.results.length === 0) {
        console.error('No videos found for this movie.');
        return;
      }

      const filteredData = json.results.filter(
        (video) => video.type === 'Trailer'
      );

      const trailerData =
        filteredData.length > 0 ? filteredData[0] : json.results[0];

      dispatch(addTrailerVideo(trailerData));
    } catch (error) {
      console.error('Error fetching trailer:', error);
    }
  };

  useEffect(() => {
    if (movieId) getMovieTrailer();
  }, [movieId]); // Depend on `movieId` to ensure it is valid before calling
};

export default useGetTrailerVideo;
