import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { updateSelectedIndex } from "../redux-toolkit/selectedProjectIndex";

export default function Sidebar() {

    const { projects } = useSelector(state => state.project)
    const { selectedIndex } = useSelector(state => state.projectIndex)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const updateIndex = (index) => {
        dispatch(updateSelectedIndex(index))
        navigate(`/project-info/${projects[index].slug}`)
    }

    return (
        <aside className="sticky w-[360px] min-w-[340px] h-[calc(100dvh-4rem)] top-16 bg-black flex flex-col rounded-tr-2xl   pl-8 pr-10 pt-16">
            <div className="flex justify-between items-center gap-2 mb-12">
                <h2 className="uppercase text-white">Your Projects</h2>
                <Link to={'new-project'}><button className="bg-stone-800 px-4 py-1 text-sm md:text-base rounded text-stone-400 font-semibold hover:bg-stone-600 hover:text-stone-100"> <span className="text-lg">+</span>  New</button></Link>
            </div>
            <div className="flex flex-col">
                {
                    projects.map((project, index) => {
                        return (
                            <p key={project.slug} onClick={() => updateIndex(index)} className={`${index === selectedIndex ? 'bg-stone-800' : ''} cursor-pointer w-full overflow-hidden whitespace-nowrap text-ellipsis text-white text-lg font-semibold rounded  py-1 px-3  `}>{project.name}</p>
                        )
                    })
                }
            </div>
        </aside>
    )
}
