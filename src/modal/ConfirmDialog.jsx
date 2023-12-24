import { IoMdAlert } from "react-icons/io";

export default function ConfirmDialog({ confirmDelete, cancelDelete }) {
    return (
        <>
            <div className="flex flex-col w-full justify-center items-center py-8 bg-black">
                <IoMdAlert className="text-yellow-500 text-8xl" />
            </div>
            <h2 className="text-xl mt-4 mb-2">
                Confirm Delete
            </h2>
            <h3 className="px-4 mb-4 text-center text-base font-semibold ">Do you want to delete this project permanently?</h3>
            <div className="flex w-full justify-center gap-8 mt-4">
                <button className="styledButton" onClick={cancelDelete}>Cancel</button>
                <button className="confirmButton" onClick={confirmDelete}>Delete</button>
            </div>
        </>
    )
}
