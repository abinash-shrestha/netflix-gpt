import React from 'react';

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="pt-[15%] px-6 md:px-24 absolute text-white bg-gradient-to-r from-black w-screen aspect-video ">
      <h1 className="text-xl md:text-4xl font-bold mx-2 md:mb-2">{title}</h1>
      <p className="hidden md:inline-block w-1/3 text-sm text-balance mx-2 ">
        {overview}
      </p>
      <div className="my-3 md:my-4">
        <button className="text-sm px-5 py-1 mx-1 md:px-10 md:py-3 md:mx-2  md:text-xl text-black bg-white rounded-lg hover:bg-opacity-50 hover:text-white">
          Play
        </button>
        <button className="hidden md:inline-block text-sm px-5 py-1 mx-1 md:px-10 md:py-3 md:mx-2  md:text-xl text-white bg-gray-500 hover:text-black hover:bg-white rounded-lg ">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
