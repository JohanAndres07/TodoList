import React from 'react'

export const Add = () => {
    return (
        <div className='flex items-center justify-between p-2 rounded-full  mx-4 bg-[#EBEBEB] w-[70%] h-[3rem] mb-4'>
            <p className='font-JetbrainsMono text-[#B0A5A5] px-2 w-full cursor-text'>write list...</p>
            <input className='h-[3rem] w-[8rem] bg-blue-normal text-white font-Inter font-bold rounded-full mr-[-.5rem] text-[1.5rem] cursor-pointer' type="button" value="ADD" />
        </div>
    )
}


