import { useNavigate } from "react-router-dom"

export default function Home() {
    const navigate = useNavigate()
    const navigateTo = () => {
        const link = '/new-project'
        navigate(link)
    }
    return (
        <div className="flex-container flex-1 justify-center items-center text-center">
            <img src="/logo.png" className="w-20" alt="create new project app-logo" />
            <h2 className="text-stone-600 font-bold mt-4">No Project Selected</h2>
            <p className="font-semibold text-stone-500 text-base md:text-lg">Select a project or get started with a new one</p>
            <button onClick={navigateTo} className="bg-stone-700 text-stone-400 px-6 py-2 rounded font-semibold mt-6 hover:bg-stone-500 hover:text-stone-300 text-lg">Create new project</button>
        </div>
    )
}
