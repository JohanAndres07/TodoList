import { AddPop } from '../popUp/AddPop';
import { useState, useRef, useEffect } from 'react';
import Plus from '../../assets/images/plus.svg';
import Angle from '../../assets/images/angle-up.svg';
import deleteIcon from '../../assets/images/deleteGroup.svg';
import PencilSquare from '../../assets/images/pen-square.svg';
import { ToDoItem } from './ToDoItem';
import { fetchTasksByGroup } from '../services/tasks/FetchTaskByGroup';
import { deleteGroup } from '../services/groups/DeleteGroup';
import { updateGroup } from '../services/groups/UpdateGroup';

export const ToDoGroup = ({ group, view, reload , state , setState}) => {
    const [angleDown, setAngleDown] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [groupName, setGroupName] = useState(group.name);
    const inputRef = useRef(null);
    const [showAddPop, setShowAddPop] = useState(false);

    const handleShowAddPop = () => {
        setState(true);
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

    const updateGroups = async () => {
        try {
            await updateGroup(group._id, groupName, group.tasks);
            reload();
        } catch (error) {
            console.error('Error updating group:', error);
        }
    };
    const deleteGroups = async () => {
        try {
            await deleteGroup(group._id);
            reload();
        } catch (error) {
            console.error('Error deleting group:', error);
        }
    };

    const getTaskBygroup = async () => {
        try {
            const tasks = await fetchTasksByGroup(group._id);
            setTasks(tasks);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    useEffect(() => {
        getTaskBygroup();
    }, [group]);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    const handleInputChange = (e) => {
        setGroupName(e.target.value);
    };

    const handleSave = () => {
        setIsEditing(false);
        updateGroups();
    };

    return (
        <article className='flex flex-col w-[90%] max-w-xl border-2 border-black rounded-t-md mx-auto my-4'>
            <div className='flex h-10 py-1 px-2 text-white bg-blue-normal justify-between items-center'>
                <input
                    ref={inputRef}
                    type="text"
                    value={groupName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`font-Jura text-base md:text-lg pl-2 transition-colors duration-300 focus:outline-none ${isEditing ? 'bg-white border-b-2 border-blue-500 text-black' : 'bg-transparent'}`}
                />
                <div className='flex items-center space-x-2'>
                    <img
                        className='h-5 w-5 md:h-6 md:w-6 cursor-pointer'
                        src={PencilSquare}
                        alt="edit"
                        onClick={isEditing ? handleSave : handleEdit}
                    />
                    <img
                        className='h-5 w-5 md:h-6 md:w-6 cursor-pointer'
                        src={Plus}
                        alt="plus"
                        onClick={handleShowAddPop}
                    />
                    <img
                        className='h-5 w-5 md:h-6 md:w-6 cursor-pointer'
                        src={deleteIcon}
                        alt="delete"
                        onClick={deleteGroups}
                    />
                    <img
                        className={`h-5 w-5 md:h-6 md:w-6 cursor-pointer transition-transform duration-300 ${!angleDown ? 'rotate-180' : ''}`}
                        src={Angle}
                        onClick={toggleAngle}
                        alt="toggle"
                    />
                </div>
            </div>

            {showAddPop && <AddPop onClose={handleCloseAddPop} view={view} reload={reload} groupId={group._id} state={state} setState={setState} />}

            {angleDown ? null : (
                <div className='p-4 flex flex-col justify-center items-center'>
                    {tasks.map((task) => (
                        <ToDoItem key={task._id} task={task} reload={getTaskBygroup}/>
                    ))}
                </div>
            )}
        </article>

    );
};
