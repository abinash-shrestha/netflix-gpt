import React from 'react'

const GptSearchBar = () => {
    return (
        <div className='pt-[6%] flex justify-center'>
            <form className='bg-black w-1/2 grid grid-cols-12 rounded-lg bg-opacity-75 px-6 py-2'>
                <input type='text' className='p-4 m-4 text-gray-500 col-span-9 rounded-lg' placeholder='What would you like to watch today' />
                <button className='px-3 py-1 m-6 bg-red-500 rounded-md text-white col-span-3 '>Search</button>

            </form>


        </div>
    )
}

export default GptSearchBar
