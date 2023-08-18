import { FC, ReactNode } from "react";
import cls from "./Drawer.module.css";

interface DrawerProps {
    isActive: boolean;
    onClose: () => void;
    children?: ReactNode
}

export const Drawer: FC<DrawerProps> = (props) => {
    const { isActive, onClose, children } = props;
    const {
        drawer,
        animate,
        hidden,
        overlay,
        overlayOpen,
        overlayHidden,
        right
    } = cls;

    return (
        <>
            <div
                className={`${overlay} ${!isActive && overlayHidden} ${isActive && overlayOpen
                    }`}
                onClick={onClose}
                aria-hidden="true"
            />
            <div
                className={`${drawer} ${isActive && animate} ${!isActive && hidden
                    } ${right}`}
            >
                {children}
            </div>
        </>
    );
};
