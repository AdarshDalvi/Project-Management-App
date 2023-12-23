import { useState } from "react";
import { ImCheckboxChecked } from 'react-icons/im'
import { ImCheckboxUnchecked } from 'react-icons/im'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { simplifyDate } from "../utils/util";
import { addNewTask, deleteProject, updateTask, deleteTask } from "../redux-toolkit/projectSlice";
import { useForm } from "react-hook-form";
import { nanoid } from "@reduxjs/toolkit";

export default function ProjectInfo() {


    const [activeTaskState, setActiveTaskState] = useState(0)
    const navStyles = 'border border-black flex-1 text-center py-1'

    const { register, handleSubmit, reset, formState: { errors } } = useForm()

    const { slug } = useParams()
    const { projects } = useSelector(state => state.project)
    const project = projects.find(project => project.slug === slug)
    const dispatch = useDispatch()

    const Task = ({ taskId, name, status }) => {
        return (
            (
                <div className="flex items-center" key={taskId}>
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

    const deleteProject = () => {

    }

    const filterTasksArray = (taskState, tasksArray) => {
        if (taskState === 0) return tasksArray
        if (taskState === 1) {
            return tasksArray.filter(task => task.status === true)
        }
        return tasksArray.filter(task => task.status === false)
    }

    const handleFormSubmit = (data) => {
        const task = {
            taskId: nanoid(),
            name: data.taskName,
            status: false
        }
        dispatch(addNewTask({ slug, task }))
        reset()
    }

    const filteredTaskArray = filterTasksArray(activeTaskState, project.tasks)
    return (
        <div className='flex-wrapper pb-4'>
            <div className='w-full'>
                <div className='flex justify-between mb-2'>
                    <h1 className='text-3xl text-stone-700'>{project.name}</h1>
                    <button className='styledButton'>Delete</button>
                </div>
                <p className="text-stone-500 mb-2">{simplifyDate(project.startDate)} - {simplifyDate(project.endDate)}</p>
                <p className='mb-4 text-stone-600 font-semibold'>{project.description}</p>
            </div>

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
            {
                project.tasks.length > 0
                    ? <div id="tasks" className="flex-1 ">
                        <menu className="flex">
                            <button onClick={() => setActiveTaskState(0)} className={`${activeTaskState === 0 ? 'bg-stone-300' : null} ${navStyles}`}>All</button>
                            <button onClick={() => setActiveTaskState(1)} className={`${activeTaskState === 1 ? 'bg-stone-300' : null} ${navStyles}`}>Completed</button>
                            <button onClick={() => setActiveTaskState(2)} className={`${activeTaskState === 2 ? 'bg-stone-300' : null} ${navStyles}`}>Pending</button>
                        </menu>
                        <div id="task-list" className="max-h-[192px] overflow-y-auto bg-stone-100 flex flex-col gap-2 px-6 py-4">
                            {filteredTaskArray.map(task => {
                                return (
                                    Task(task)
                                )
                            })}
                        </div>
                    </div>
                    : null
            }
        </div>
    )
}
