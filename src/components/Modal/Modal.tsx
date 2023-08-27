import { useContext } from "react"
import cls from "./Modal.module.css"
import { ModalContext } from "../../context/modalContext"
import { IModalContext } from "../../types"


export const Modal = () => {
    const modal = useContext(ModalContext) as IModalContext

    return (
        <div className={modal.isActive ? [cls.modal, cls.modal_active].join(" ") : cls.modal} onClick={modal.destroy}>
            <div className={cls.modal__content} onClick={(e) => e.stopPropagation()}>
                {modal.content}
            </div>
        </div>
    )
}