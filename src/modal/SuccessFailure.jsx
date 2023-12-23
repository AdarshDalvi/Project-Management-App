import { FaCheckCircle } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";

export default function SuccessFailure({ failure = false, handleButtonCLick, message }) {
    return (
        <>
            <div className={`flex flex-col w-full justify-center items-center py-8 ${failure ? 'bg-red-500' : 'bg-[#12C069]'}`}>
                {failure
                    ? <IoMdCloseCircle className="text-white text-8xl" />
                    : <FaCheckCircle className="text-white text-8xl" />
                }
            </div>
            <h2 className="text-xl mt-4 mb-2">{failure ? 'Failure' : 'Success'}</h2>
            <h3 className="px-4 mb-4 text-center text-base font-semibold ">{message}</h3>
            <button onClick={handleButtonCLick} className="bg-stone-700 rounded-[1rem] px-8 py-2 text-white">Okay</button>
        </>
    )
}
