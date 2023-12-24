import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteProject } from "../redux-toolkit/projectSlice";
import { updateSelectedIndex } from "../redux-toolkit/selectedProjectIndex";
import NewTaskForm from "../components/TaskComponents/NewTaskForm";
import ProjectInfoHeader from "../components/ProjectInfoHeader";
import TaskCard from "../components/TaskComponents/TaskCard";
import PopupDialogModal from "../modal/PopupDialogModal";
import ConfirmDialog from "../modal/ConfirmDialog";


export default function ProjectInfo() {
    const [activeTaskState, setActiveTaskState] = useState(0)
    const navStyles = 'border border-black flex-1 text-center py-1'

    const { slug } = useParams()
    const { projects } = useSelector(state => state.project)
    const project = projects.find(project => project.slug === slug)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const dialogRef = useRef()

    const deleteCurrentProject = () => {
        dialogRef.current.open()
        dialogRef.current.setContent(<ConfirmDialog cancelDelete={cancelDelete} confirmDelete={confirmDelete} />)

    }

    const confirmDelete = () => {
        dispatch(deleteProject({ slug }))
        dispatch(updateSelectedIndex(null))
        navigate('/', { replace: true })
    }

    const cancelDelete = () => {
        dialogRef.current.close()
    }

    const filterTasksArray = (taskState, tasksArray) => {
        if (taskState === 0) return tasksArray
        if (taskState === 1) {
            return tasksArray.filter(task => task.status === true)
        }
        return tasksArray.filter(task => task.status === false)
    }

    const filteredTaskArray = filterTasksArray(activeTaskState, project.tasks)
    return (
        <>
            <PopupDialogModal ref={dialogRef} />
            <div className='flex-wrapper pb-4'>
                <ProjectInfoHeader project={project} deleteCurrentProject={deleteCurrentProject} />
                <NewTaskForm slug={slug} />
                {
                    project.tasks.length > 0
                        ? <div id="tasks" className="flex-1 ">
                            <menu className="flex">
                                <button onClick={() => setActiveTaskState(0)} className={`${activeTaskState === 0 ? 'bg-stone-300' : null} ${navStyles}`}>All{`(${filterTasksArray(0, project.tasks).length})`}</button>
                                <button onClick={() => setActiveTaskState(1)} className={`${activeTaskState === 1 ? 'bg-stone-300' : null} ${navStyles}`}>Completed{`(${filterTasksArray(1, project.tasks).length})`}</button>
                                <button onClick={() => setActiveTaskState(2)} className={`${activeTaskState === 2 ? 'bg-stone-300' : null} ${navStyles}`}>Pending{`(${filterTasksArray(2, project.tasks).length})`}</button>
                            </menu>
                            {
                                filteredTaskArray.length > 0
                                    ? <div id="task-list" className="max-h-[192px] overflow-y-auto bg-stone-100 flex flex-col gap-2 px-6 py-4">
                                        {filteredTaskArray.map(task => {
                                            return (
                                                <TaskCard
                                                    key={task.taskId}
                                                    taskId={task.taskId}
                                                    name={task.name}
                                                    status={task.status}
                                                    slug={slug}
                                                />
                                            )
                                        })}
                                    </div>
                                    : <div className="flex flex-col h-[200px] items-center justify-center font-semibold">No tasks to show</div>
                            }
                        </div>
                        : <div className="flex flex-col h-[200px] items-center justify-center font-semibold">No tasks to show</div>
                }
            </div>
        </>
    )
}
