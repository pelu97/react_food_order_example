import { ReactNode, Fragment } from "react";

import classes from "./Modal.module.css";

interface ModalProps{
    children: ReactNode,
    className?: string,
    onCancel: () => void
}

function Modal(props: ModalProps){

    return (
        <Fragment>
            <div className={`${classes.modal} ${props.className}`}>
                {props.children}
            </div>

            <div className={classes.backdrop} onClick={props.onCancel}/>
        </Fragment>

    );
}

export default Modal;
