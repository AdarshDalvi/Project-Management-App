import { Link } from "react-router-dom";

export default function Sidebar() {
    return (

        <aside className="sticky min-w-[360px] h-[calc(100dvh-4rem)] top-16 bg-black flex flex-col rounded-tr-2xl   pl-8 pr-10 pt-16">
            <div className="flex justify-between items-center gap-2 mb-12">
                <h2 className="uppercase text-white">Your Projects</h2>
                <Link to={'new-project'}><button className="bg-stone-800 px-4 py-1 text-sm md:text-base rounded text-stone-400 font-semibold hover:bg-stone-600 hover:text-stone-100"> <span className="text-lg">+</span>  New</button></Link>
            </div>
        </aside>
    )
}
