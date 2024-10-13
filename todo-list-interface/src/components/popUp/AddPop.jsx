import React, { useState } from 'react';
import { createTask } from '../services/tasks/CreateTask';
import { createGroup } from '../services/groups/CreateGroups';

export const AddPop = ({ onClose, view, reload, groupId, state, setState }) => {
    const [inputValue, setInputValue] = useState("");

    const handleBackgroundClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const click = async () => {
        try {
            if (view === 'group' && state) {
                await createTask(inputValue, groupId); 
            } else if (view === 'group' && !state) {
                await createGroup(inputValue);
            } else {
                await createTask(inputValue); 
            }
            
            setInputValue("");
            reload();
            onClose();
        } catch (error) {
            console.error('Error to create task:', error);
        }
    };

    return (
        <section
            className="fixed inset-0 backdrop-blur-sm bg-white bg-opacity-50 flex justify-center items-center"
            onClick={handleBackgroundClick}
        >
            <div className="flex flex-col justify-between w-[90%] h-[10rem] max-w-2xl bg-gray-100 rounded-lg overflow-hidden shadow-2xl">
                <input
                    type="text"
                    name="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Write here..."
                    className="font-Jura overflow-auto p-4 text-xl flex-grow w-full h-[7rem]"
                    autoComplete="off"
                />

                <input
                    className="w-full h-[3rem] bg-blue-normal text-white font-bold font-Inter rounded-b-md mt-2"
                    type="button"
                    value="ADD"
                    onClick={click}
                />
            </div>
        </section>
    );
};
