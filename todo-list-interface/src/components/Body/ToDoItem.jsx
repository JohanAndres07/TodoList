import { useState } from 'react';
import Delete from '/src/assets/images/delete.svg';
import Uncheck from '/src/assets/images/uncheck.svg';
import EditIcon from '/src/assets/images/pencil.svg';
import { EditPop } from '../popUp/EditPop'; 
import { deleteTask } from '../services/tasks/DeleteTask';
import checkIcon from '../../assets/images/check.svg'
import cechkIconProgress from '../../assets/images/inprogress.svg'

export const ToDoItem = ({ task, reload }) => {
    const check = {
        in_progress: cechkIconProgress,
        pending: Uncheck,
        completed: checkIcon
    };

    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing(true); 
    };
    const deleteTasks = async ()=>{
        try{

            await deleteTask(task._id);
            reload();
        }catch(error){
            console.error('Error delete tasks:', errorMessage);
        }
    }
    const handleCloseModal = () => {
        setIsEditing(false); 
    };

    return (
        <div className="flex justify-center w-full">
            <article className="flex items-center justify-between p-3 rounded-full border border-gray-300 shadow-md w-full max-w-xl mx-4 mb-4 lg:mb-6 lg:p-4">
                <img className="w-6 h-6 md:w-8 md:h-8 border-2 border-black rounded-full cursor-pointer" 
                src={check[task.status]} 
                alt="uncheck" />
                <p className="flex-grow text-center mx-2 max-w-[60%] overflow-hidden text-ellipsis whitespace-nowrap h-7 font-JetbrainsMono text-sm md:text-base lg:text-lg">
                    {task.taskName}
                </p>
                <div className="flex space-x-3">
                    <img
                        src={EditIcon}
                        alt="Edit"
                        className="w-[1.125rem] h-[1.125rem] md:w-[1.5rem] md:h-[1.5rem] cursor-pointer"
                        onClick={handleEditClick} 
                    />
                    <img className="w-6 h-6 md:w-8 md:h-8 border rounded-full bg-red-600 cursor-pointer" 
                    src={Delete} 
                    alt="delete"
                    onClick={deleteTasks} />
                </div>
            </article>

            {isEditing && <EditPop task={task} onClose={handleCloseModal} reload={reload}/>}
        </div>
    );
};


