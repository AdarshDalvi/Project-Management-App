import { ImCheckboxChecked } from 'react-icons/im'
import { ImCheckboxUnchecked } from 'react-icons/im'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { useDispatch } from "react-redux"
import { updateTask, deleteTask } from "../../redux-toolkit/projectSlice"


export default function TaskCard({ taskId, name, status, slug }) {

    const dispatch = useDispatch()
    return (
        (
            <div className="flex items-center">
                {
                    status
                        ? <ImCheckboxChecked className="cursor-pointer" onClick={() => dispatch(updateTask({ slug, taskId }))} />
                        : <ImCheckboxUnchecked className="cursor-pointer" onClick={() => dispatch(updateTask({ slug, taskId }))} />
                }
                <p className="flex-1 whitespace-nowrap ml-6 mr-5 overflow-hidden text-ellipsis">{name}</p>
                <RiDeleteBin5Line className="cursor-pointer" onClick={() => dispatch(deleteTask({ slug, taskId }))} />
            </div>
        )
    )
}
