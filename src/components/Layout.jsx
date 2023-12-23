import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"

export default function Layout() {
    return (
        <>
            <div className="fixed top-0 left-0 right-0 h-16 bg-white z-50"></div>
            <main className="flex  gap-12 pr-12 min-h-[calc(100vh-4rem)] ">
                <Sidebar />
                <Outlet />
            </main>
        </>
    )
}
