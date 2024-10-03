
import { AddPop } from '../popUp/AddPop'
import { Add } from '../Add/Add'
import Plus from '../../assets/images/plus.svg'
import { ToDoGroup } from './ToDoGroup'
import { ToDoItem } from './ToDoItem'

export const Body = ({ view }) => {

    return (
        <section>
            {view === 'list' ? (
                <div>
                    <div className="hidden md:flex justify-center items-center cursor-pointer">
                        <Add />
                    </div>
                    <div className="flex flex-col justify-center items-center py-4">
                        <ToDoItem />
                    </div>
                </div>

            ) : (
                <div>
                    <div className="hidden md:flex justify-center items-center cursor-pointer">
                        <Add />
                    </div>
                    <div className="flex flex-col justify-center items-center py-4">
                        <ToDoGroup />
                    </div>
                </div>
            )}
            <div>
                <img className=" md:hidden w-10 h-10 border rounded-full bg-blue-normal cursor-pointer p-[.5rem] absolute bottom-10 right-6" src={Plus} alt="plus" />
            </div>
            {/* <AddPop /> */}

        </section>
    )
}

