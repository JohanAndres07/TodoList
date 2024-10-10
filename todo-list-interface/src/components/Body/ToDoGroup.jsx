import {AddPop} from '../popUp/AddPop'
import { useState, useRef, useEffect } from 'react';
import Plus from '../../assets/images/plus.svg';
import Angle from '../../assets/images/angle-up.svg';
import PencilSaquare from '../../assets/images/pen-square.svg';
import { ToDoItem } from './ToDoItem';

export const ToDoGroup = () => {


    const [angleDown, setAngleDown] = useState(true);
    const [isEditing, setIsEditing] = useState(false); 
    const [className, setClassName] = useState('Clases'); 
    const inputRef = useRef(null); 
    const [showAddPop, setShowAddPop] = useState(false); 

    const handleShowAddPop = () => {
        setShowAddPop(true);
    };


    const handleCloseAddPop = () => {
        setShowAddPop(false);
    };
    const toggleAngle = () => {
        setAngleDown(prev => !prev);
    };


    const handleEdit = () => {
        setIsEditing(true);
    };


    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus(); 
        }
    }, [isEditing]);


    const handleInputChange = (e) => {
        setClassName(e.target.value);
    };

    const handleSave = () => {
        setIsEditing(false);
    };

    return (
        <article className='flex flex-col w-[90%] border-2 border-black max-w-2xl rounded-t-[.5rem]'>
            <div className='flex h-10 py-[.2rem] px-[.5rem] text-white bg-blue-normal justify-between'>

                <input
                    ref={inputRef} 
                    type="text"
                    value={className}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`font-Jura text-[1.258rem] pl-2 transition-colors duration-300 ${
                        isEditing ? 'bg-white border-b-2 border-blue-500 text-black' : 'bg-transparent'
                    }`}
                />

                <div className='flex'>
                    <img
                        className='h-[1.25rem] w-[1.25rem] mx-1 my-1 cursor-pointer'
                        src={PencilSaquare}
                        alt="pencilSquare"
                        onClick={isEditing ? handleSave : handleEdit} 
                    />
                    <img 
                    className='h-6 w-6 mx-1 my-1 cursor-pointer' 
                    src={Plus} 
                    alt="plus"
                    onClick={handleShowAddPop}/>
                    <img
                        className={`h-6 w-6 mx-1 my-1 cursor-pointer transition-transform duration-300 ${!angleDown ? 'rotate-180' : ''}`}
                        src={Angle}
                        onClick={toggleAngle}
                        alt="angle"
                    />
                </div>
            </div>
            {showAddPop && <AddPop onClose={handleCloseAddPop} />}
            {angleDown ? null : (
                <div className='p-4 flex flex-col justify-center items-center'>
                    <ToDoItem />
                </div>
            )}
        </article>
    );
};
