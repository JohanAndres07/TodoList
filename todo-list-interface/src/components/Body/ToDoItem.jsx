
import Delete from '/src/assets/images/delete.svg'
import Uncheck from '/src/assets/images/uncheck.svg'
import EditIcon from '/src/assets/images/pencil.svg'

export const ToDoItem = () => {
    return (
        <article className="flex items-center justify-between p-2 rounded-full border-[.016rem] mx-4 border-black shadow-md w-[90%] max-w-2xl mb-4">

            <img className="text-black w-6 h-6 border-2 border-black rounded-full cursor-pointer" src={Uncheck} alt="uncheck" />

            <p className="flex-grow text-center mx-2 max-w-[60%] overflow-hidden text-ellipsis whitespace-nowrap h-7 font-JetbrainsMono">
                ir a clase de física
            </p>
            <div className='flex'>
                <img src={EditIcon} alt="Edit" className=" w-[1.125rem] h-[1.125rem] mx-2 cursor-pointer" />

                <img className="text-white w-6 h-6 border rounded-full bg-red-btn cursor-pointer" xmlns="http://www.w3.org/2000/svg" src={Delete} alt="delete" />
            </div>
        </article>
    )
}


