
import { useState } from 'react'
import Plus from '../../assets/images/plus.svg'
import Angle from '../../assets/images/angle-up.svg'
import PencilSaquare from '../../assets/images/pen-square.svg'
import { ToDoItem } from './ToDoItem'

export const ToDoGroup = () => {
    const [angleDown, setAngleDown] = useState(true);

    const toggleAngle = () => {
        setAngleDown(prev => !prev);
    };
    return (
        <article className='flex flex-col w-[90%] border-2 border-black max-w-2xl rounded-t-[.5rem]'>
            <div className=' flex  h-10 py-[.2rem] px-[.5rem] text-white bg-blue-normal justify-between'>
                <p className='font-Jura text-[1.258rem] pl-2'>Clases</p>
                <div className='flex'>
                    <img className='h-[1.25rem] w-[1.25rem] mx-1 my-1 cursor-pointer' src={PencilSaquare} alt="pencilSquare" />
                    <img className='h-6 w-6 mx-1 my-1 cursor-pointer' src={Plus} alt="plus" />
                    <img 
                        className={`h-6 w-6 mx-1 my-1 cursor-pointer transition-transform duration-300 ${!angleDown ? 'rotate-180' : ''}`} 
                        src={Angle} 
                        onClick={toggleAngle} 
                        alt="angle" 
                    />
                </div>
            </div>
            {angleDown ? null : (
                <div className='p-4 flex flex-col justify-center items-center'>
                    <ToDoItem />
                </div>
            )}
        </article>
    )
}
