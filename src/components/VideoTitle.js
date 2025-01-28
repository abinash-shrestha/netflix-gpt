import React from 'react'

const VideoTitle = ({ title, overview }) => {
    return (
        <div className='pt-20 pl-10'>
            <h1 className='text-2xl font-bold'>{title}</h1>
            <p className='w-1/3 text-base'>{overview}</p>
            <div className=''>
                <button className='px-10 py-3 m-2 text-xl text-white bg-gray-500 bg-opacity-50 rounded-lg'>Play</button>
                <button className='px-10 py-3 m-2 text-xl text-white bg-gray-500 rounded-lg'>More Info</button>

            </div>

        </div>
    )
}

export default VideoTitle
