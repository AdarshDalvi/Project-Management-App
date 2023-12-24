import { useDispatch } from "react-redux"
import { useForm } from "react-hook-form";
import { nanoid } from "@reduxjs/toolkit";
import { addNewTask } from "../../redux-toolkit/projectSlice";

function NewTaskForm({ slug }) {
    const dispatch = useDispatch()
    const { register, handleSubmit, reset, formState: { errors } } = useForm()

    const handleFormSubmit = (data) => {
        const task = {
            taskId: nanoid(),
            name: data.taskName,
            status: false
        }
        dispatch(addNewTask({ slug, task }))
        reset()
    }

    return (
        <div className='border-t-[2.5px] border-stone-300 pt-4 mb-6'>
            <h2 className="font-bold text-stone-800 mb-4">Tasks</h2>
            <form className='flex gap-5' onSubmit={handleSubmit(handleFormSubmit)}>
                <input name="taskName" {...register('taskName', {
                    required: 'Task Name is required!',
                    minLength: {
                        value: 3,
                        message: 'Please enter a minimum of 3 characters'
                    }
                })} type="text" className='border rounded bg-stone-200 focus:outline-blue-700 px-4 py-1.5' />
                <button className="styledButton font-semibold text-stone-700" type="submit">Add Task</button>
            </form>
            {errors.taskName?.message && <span className="text-red-500">{errors.taskName.message}</span>}
        </div>
    )

}

export default NewTaskForm