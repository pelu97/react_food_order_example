import { ReactNode, Fragment } from "react";
import ReactDOM from "react-dom";

import classes from "./Modal.module.css";

interface ModalProps{
    children: ReactNode,
    className?: string,
    onCancel: () => void
}

function Modal(props: ModalProps){
    const modal = (
        <div className={`${classes.modal} ${props.className}`}>
            {props.children}
        </div>
    );

    const backdrop = (
        <div className={classes.backdrop} onClick={props.onCancel}/>
    );

    // <Fragment>
    //     <div className={`${classes.modal} ${props.className}`}>
    //         {props.children}
    //     </div>
    //
    //     <div className={classes.backdrop} onClick={props.onCancel}/>
    // </Fragment>

    return (
        <Fragment>
            {ReactDOM.createPortal(
                backdrop,
                document.getElementById("backdrop-root")!
            )}

            {ReactDOM.createPortal(
                modal,
                document.getElementById("overlay-root")!
            )}
        </Fragment>

    );
}

export default Modal;
