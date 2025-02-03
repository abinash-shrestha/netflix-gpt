import React from 'react';
import useGetTrailerVideo from '../hooks/useGetTrailerVideo';
import { useSelector } from 'react-redux';

const VideoBackground = ({ movieId }) => {
  useGetTrailerVideo(movieId);
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);

  return (
    <div className="w-screen">
      <iframe
        className="w-screen aspect-video"
        src={
          'https://www.youtube-nocookie.com/embed/' +
          trailerVideo?.key +
          '?autoplay=1&mute=1&controls=0&playsinline=1'
        }
        title="YouTube video player"
        allow="autoplay; encrypted-media"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoBackground;
