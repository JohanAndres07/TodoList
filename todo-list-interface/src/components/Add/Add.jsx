import { useState } from 'react';
import axios from 'axios';

export const Add = ({ view }) => {
    const [inputValue, setInputValue] = useState("");
    const [error, setError] = useState('');

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const click = async () => {
        const userId = localStorage.getItem('userId'); 
        const token = localStorage.getItem('token'); 

        if (!userId || !token) {
            setError('No userId or token found in localStorage.');
            return;
        }


        const taskData = {
            taskName: inputValue, 
            dueDate: new Date(), 
            status: "pending",
            priority: "medium",
        };
console.log(token);
        try {
            const response = await axios.post(`http://localhost:3000/tasks`, {
                headers: {
                    Authorization: `Bearer ${token}`
                    
                }, taskData,userId,
            });
            console.log('Tarea creada:', response.data); 
            setInputValue(""); 
        } catch (error) {
            if (error.response) {
                setError(`Failed to create task: ${error.response.data.message}`);
            } else {
                setError('Failed to create task: Network error');
            }
            console.error(error); 
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
            {error && <p className="text-red-500">{error}</p>} {/* Mostrar mensaje de error */}
        </div>
    );
};
