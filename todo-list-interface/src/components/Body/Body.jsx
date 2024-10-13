import { useState, useEffect } from 'react';
import { Header } from "../Header/Header";
import { Add } from '../Add/Add';
import Plus from '../../assets/images/plus.svg';
import { ToDoItem } from './ToDoItem';
import { ToDoGroup } from './ToDoGroup';
import { AddPop } from '../popUp/AddPop';
import { fetchTasks } from '../services/tasks/FetchTask';
import { fetchGroups } from '../services/groups/FetchGroups';

export const Body = () => {
    const [view, setView] = useState('task');
    const [tasks, setTasks] = useState([]);
    const [groups, setGroups] = useState([]);
    const [showAddPop, setShowAddPop] = useState(false);
    const [state, setState] = useState(false);


    const toggleView = (newView) => {
        setView(newView);
    };

    const handleShowAddPop = () => setShowAddPop(true);
    const handleCloseAddPop = () => setShowAddPop(false);

    const loadTasks = async () => {
        try {
            if (view === 'group') {
                const fetchedGroups = await fetchGroups();
                setGroups(fetchedGroups);
            } else {
                const fetchedTasks = await fetchTasks();
                setTasks(fetchedTasks);
            }

        } catch (errorMessage) {
            console.error('Error fetching tasks:', errorMessage);
        }
    };

    useEffect(() => {
        loadTasks();
    }, [view]);

    return (
        <section>
            <Header toggleView={toggleView} currentView={view} />

            <div>
                <div className="hidden md:flex justify-center items-center cursor-pointer">
                    <Add view={view} reload={loadTasks} />
                </div>
                <div className="flex flex-col justify-center items-center py-4">
                    {view === 'task' ? (
                        tasks.length > 0 ? (
                            tasks
                                .filter(task => !task.group)
                                .map((task) => (
                                    <ToDoItem key={task._id} task={task} reload={loadTasks} />
                                ))
                        ) : ("")
                    ) : (
                        groups.length > 0 ? (
                            groups.map((group) => (
                                <ToDoGroup key={group._id} group={group} view={view} reload={loadTasks} state={state} setState={setState}/>
                            ))
                        ) : ("")

                    )}
                </div>
            </div>

            <div className="fixed md:hidden bottom-10 right-6">
                <img
                    className="w-12 h-12 border rounded-full bg-blue-normal cursor-pointer p-2"
                    src={Plus}
                    alt="plus"
                    onClick={handleShowAddPop}
                />
            </div>

            {showAddPop && <AddPop onClose={handleCloseAddPop} view={view} reload={loadTasks} groupId={""} state={state} setState={setState} />}
        </section>
    );
}
