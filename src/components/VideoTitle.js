import React from 'react'

const VideoTitle = ({ title, overview }) => {
    return (
        <div className='pt-[15%] px-24 absolute text-white bg-gradient-to-r from-black w-screen aspect-video '>
            <h1 className='text-2xl font-bold mx-2'>{title}</h1>
            <p className='w-1/3 text-sm text-balance mx-2 '>{overview}</p>
            <div className='my-3'>
                <button className='px-10 py-3  mx-2 text-xl text-black bg-white rounded-lg hover:bg-opacity-50 hover:text-white'>Play</button>
                <button className='px-10 py-3  mx-2 text-xl text-white bg-gray-500 hover:text-black hover:bg-white rounded-lg '>More Info</button>

            </div>

        </div>
    )
}

export default VideoTitle
