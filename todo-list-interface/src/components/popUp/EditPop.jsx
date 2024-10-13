import { useState, useEffect } from 'react';
import React from 'react';
import { updateTask } from '../services/tasks/UpdateTask';

export function EditPop({ task, onClose , reload}) {
    const [text, setText] = useState(task.taskName); 
    const [dueDate, setDueDate] = useState(task.dueDate);
    const [status, setStatus] = useState(task.status);
    const [priority, setPriority] = useState(task.priority);
    useEffect(() => {
        setText(task.taskName);
        setDueDate(task.dueDate ? task.dueDate.slice(0, 10) : ''); 
        setStatus(task.status);
        setPriority(task.priority);
    }, [task]);
    
    const handleBackgroundClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose(); 
        }
    };

    const handleUpdate = async () => {
        try {
            await updateTask(task._id, text, dueDate, status, priority);  
            onClose(); 
            reload();
        } catch (error) {
            console.error('Error updating task:', error.message || 'An error occurred');
        }
    };

    return (
        <section
            className="fixed inset-0 backdrop-blur-sm bg-white bg-opacity-50 flex justify-center items-center"
            onClick={handleBackgroundClick} 
        >
            <div className="flex flex-col w-[90%] max-w-2xl h-auto bg-white rounded-lg shadow-2xl overflow-hidden">
                <div className="flex justify-center items-center h-16 border-b border-gray-300">
                    <h1 className="font-bold text-blue-600 text-2xl mx-2">Edit</h1>
                    <p className="font-bold text-2xl">Task</p>
                </div>

                <div className="flex flex-col p-4 space-y-4">
                    <input
                        type="text"
                        name="text"
                        className="h-12 p-3 w-full mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                        placeholder="Enter task details..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />

                    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                        <div className="flex items-center border border-gray-300 bg-white rounded-lg p-2 shadow-sm w-full">
                            <label htmlFor="status" className="font-medium text-gray-700 ml-2">Status:</label>
                            <select
                                id="status"
                                name="status"
                                className="h-10 w-full ml-2 p-2 bg-white border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                                <option value="in_progress">In Progress</option>
                            </select>
                        </div>

                        <div className="flex items-center border border-gray-300 bg-white rounded-lg p-2 shadow-sm w-full">
                            <label htmlFor="priority" className="font-medium text-gray-700 ml-2">Priority:</label>
                            <select
                                id="priority"
                                name="priority"
                                className="h-10 w-full ml-2 p-2 bg-white border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                    </div>

                    <input
                        type="date"
                        name="dueDate"
                        className="h-12 p-3 w-full mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                </div>

                <div className="flex justify-between px-6 py-4">
                    <input
                        className="w-[45%] h-12 bg-red-500 text-white font-bold rounded-full cursor-pointer hover:bg-red-600 transition ease-in-out duration-300"
                        type="button"
                        value="CANCEL"
                        onClick={onClose} 
                    />
                    <input
                        className="w-[45%] h-12 bg-blue-500 text-white font-bold rounded-full cursor-pointer hover:bg-blue-600 transition ease-in-out duration-300"
                        type="button"
                        value="DONE"
                        onClick={handleUpdate} 
                    />
                </div>
            </div>
        </section>
    );
}
