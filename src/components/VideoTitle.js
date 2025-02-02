import React from 'react'

const VideoTitle = ({ title, overview }) => {
    return (
        <div className='pt-[20%] px-24 absolute text-white bg-gradient-to-r from-black w-screen aspect-video'>
            <h1 className='text-2xl font-bold'>{title}</h1>
            <p className='w-1/3 text-base text-balance '>{overview}</p>
            <div className='my-2 ml-0'>
                <button className='px-10 py-3 m-2 text-xl text-black bg-white rounded-lg'>Play</button>
                <button className='px-10 py-3 m-2 text-xl text-white bg-gray-500 rounded-lg'>More Info</button>

            </div>

        </div>
    )
}

export default VideoTitle
