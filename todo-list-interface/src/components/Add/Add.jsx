import { useState } from 'react';
import { createTask } from '../services/tasks/CreateTask';
import { createGroup } from '../services/groups/CreateGroups';

export const Add = ({ view, reload }) => {
    const [inputValue, setInputValue] = useState("");


    const handleChange = (event) => {
        setInputValue(event.target.value);
    };
    const click = async () => {
        try {
            if(view !== 'task'){
                await createGroup(inputValue);
            }else{
                await createTask(inputValue);
            }
            setInputValue(""); 
            reload();
        } catch (errorMessage) {
            setError(errorMessage); 
            console.error('Error to create task:', errorMessage);
        }
    };

    return (
        <div className='flex items-center justify-between p-2 rounded-full mx-4 bg-[#EBEBEB] w-[70%] h-[3rem] mb-4 lg:mx-[25%]'>
            <input className='font-JetbrainsMono bg-[#EBEBEB] px-4 w-full h-full cursor-text focus:outline-none'
                type="text"
                value={inputValue}
                onChange={handleChange}
                placeholder={`write ${view}...`}
            />
            <input className='h-[3rem] w-[8rem] bg-blue-normal text-white font-Inter font-bold rounded-full mr-[-.5rem] text-[1.5rem] cursor-pointer' 
                type="button" 
                value="ADD" 
                onClick={click} 
            />
        </div>
    );
};
