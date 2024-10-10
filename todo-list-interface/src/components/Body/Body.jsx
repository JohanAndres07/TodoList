import {ToDoGroup} from './ToDoGroup';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Header } from "../Header/Header";
import { Add } from '../Add/Add';
import Plus from '../../assets/images/plus.svg';
import { ToDoItem } from './ToDoItem';
import { AddPop } from '../popUp/AddPop'; 

export const Body = () => {
    const [view, setView] = useState('task');
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState('');
    const [showAddPop, setShowAddPop] = useState(false); 

    const toggleView = (newView) => {
        setView(newView);
    };


    const handleShowAddPop = () => {
        setShowAddPop(true);
    };


    const handleCloseAddPop = () => {
        setShowAddPop(false);
    };

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');

        if (!userId || !token) {
            setError('No userId or token found in localStorage.');
            return;
        }

        const fetchTasks = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/tasks/`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    userId
                });

                const { tasks } = response.data;
                setTasks(tasks);
                console.log(tasks)
            } catch (error) {
                if (error.response) {
                    setError(`Failed to fetch tasks: ${error.response.data.message}`);
                } else {
                    setError('Failed to fetch tasks: Network error');
                }
                console.error(error);
            }
        };

        fetchTasks();
    }, []);

    return (
        <section>
            <Header toggleView={toggleView} currentView={view} />

            {error && <p className="text-red-500">{error}</p>}

            {view === 'task' ? (
                <div>
                    <div className="hidden md:flex justify-center items-center cursor-pointer">
                        <Add view={view} />
                    </div>
                    <div className="flex flex-col justify-center items-center py-4">
                        <ToDoItem />
                    </div>
                </div>
            ) : (
                <div>
                    <div className="hidden md:flex justify-center items-center cursor-pointer">
                        <Add view={view} />
                    </div>
                    <div className="flex flex-col justify-center items-center py-4">
                        <ToDoGroup/>
                    </div>
                </div>
            )}

            <div>
                <img
                    className="md:hidden w-10 h-10 border rounded-full bg-blue-normal cursor-pointer p-[.5rem] absolute bottom-10 right-6"
                    src={Plus}
                    alt="plus"
                    onClick={handleShowAddPop}  
                />
            </div>

            {showAddPop && <AddPop onClose={handleCloseAddPop} />}
        </section>
    );
};
