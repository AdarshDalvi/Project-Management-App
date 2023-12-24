
import { simplifyDate } from "../utils/util";

export default function ProjectInfoHeader({ project, deleteCurrentProject }) {
    return (
        <div className='w-full'>
            <div className='flex justify-between mb-2'>
                <h1 className='text-3xl text-stone-700'>{project.name}</h1>
                <button onClick={deleteCurrentProject} className='styledButton'>Delete</button>
            </div>
            <p className="text-stone-500 mb-2">{simplifyDate(project.startDate)} - {simplifyDate(project.endDate)}</p>
            <p className='mb-4 text-stone-600 font-semibold'>{project.description}</p>
        </div>
    );
}
