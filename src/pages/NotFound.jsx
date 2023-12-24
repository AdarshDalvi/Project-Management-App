import { useNavigate } from "react-router-dom"

export default function NotFound() {

    const navigate = useNavigate()
    return (
        <div className='flex flex-col h-screen items-center justify-center text-center'>
            <h1 >404</h1>
            <div className='wrapper-not-found'>
                <h2>we are sorry, page not found!</h2>
                <p>the page you are looking for might have been removed or had its name changed or temporary unavailable</p>
                <button className="mt-4 confirmButton" onClick={() => navigate('/')}>Return to homepage</button>
            </div>
        </div>
    )
}