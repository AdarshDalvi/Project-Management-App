import { forwardRef, useImperativeHandle, useRef, useState } from "react"
import ReactDOM from 'react-dom'

function PopupDialogModal(props, ref) {

    const [content, setContent] = useState('')

    const setDialogContent = (recievedJsx) => {
        setContent(prevContent => recievedJsx)
    }
    const dialogRef = useRef()
    useImperativeHandle(ref, () => {
        return {
            open: () => dialogRef.current.showModal(),
            close: () => dialogRef.current.close(),
            setContent: setDialogContent
        }
    })
    return ReactDOM.createPortal(
        <dialog ref={dialogRef} className="backdrop:bg-stone-700/70 rounded-xl w-full max-w-sm">
            <div className="flex flex-col items-center pb-8">
                {content}
            </div>
        </dialog>,
        document.getElementById('modal')
    )
}

export default forwardRef(PopupDialogModal)
