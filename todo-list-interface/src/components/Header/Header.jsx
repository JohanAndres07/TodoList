import React from 'react'

export const Header = ({toggleView , currentView}) => {
    return (
        <header className='w-full h-[8rem] md-2 md:border-b-[.016rem] md:border-gray-400 md:mb-10 md:flex md:justify-between md:h-[4rem] '>
            <div className='flex h-[4rem] justify-center  items-center  border-b-[.016rem] border-gray-400 md:border-none'>
                <h1 className='font-bold text-blue-normal text-[2.3rem] mx-2'>TO-DO</h1>
                <p className='font-bold text-[2.3rem]'>LIST</p>
            </div>
            <nav className='flex h-[4rem] justify-center item-center p-4'>
                <input className={`mx-4 pb-2 cursor-pointer font-Jura text-[1.5rem] text-blue-normal ${currentView === 'list' ? 'font-bold border-b-4 border-blue-normal' : ''}`} onClick={()=> toggleView('list')} type="button" value="List" />
                <input className={`mx-4 pb-2 cursor-pointer font-Jura text-[1.5rem] text-blue-normal ${currentView !== 'list' ? 'font-bold border-b-4 border-blue-normal': ''}`} onClick={()=> toggleView('group')} type="button" value="Group" />
            </nav>
        </header>
    )
}

