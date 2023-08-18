import { FC, ReactNode } from "react"
import cls from "./Modal.module.css"

interface ModalProps {
    modalActive: boolean,
    setModalActive: (modalActive: boolean) => void,
    children: ReactNode
}

export const Modal: FC<ModalProps> = ({ modalActive, setModalActive, children }) => {
    return (
        <div className={modalActive ? [cls.modal, cls.modal_active].join(" ") : cls.modal} onClick={() => setModalActive(false)}>
            <div className={cls.modal__content} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}