

export const AddPop = () => {
    return (
        <section className="fixed inset-0 backdrop-blur-sm bg-gray-200 bg-opacity-50 flex justify-center items-center">
            <div className="flex flex-col justify-between w-[90%] h-[10rem] max-w-2xl bg-gray-100 rounded-lg overflow-hidden shadow-2xl">
                <input
                    type="text"
                    name="text"
                    id=""
                    placeholder="text here..."
                    className="font-Jura overflow-auto p-4 text-xl flex-grow  w-full h-[7rem]"
                />
                <input
                    className="w-full h-[3rem] bg-blue-normal text-white font-bold font-Inter rounded-b-md mt-2"
                    type="button"
                    value="ADD"
                />
            </div>

        </section>

    )
}

