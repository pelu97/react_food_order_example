import { useContext, useState, useEffect } from "react";

import CartContext from "../../data/CartContext";
import CartModal from "./CartModal";
import CartIcon from "../Ui/Icons/CartIcon";

import classes from "./CartButton.module.css";


function CartButton() {
    const [modalActive, setModalActive] = useState(false);
    const [animationActive, setAnimationActive] = useState(false);
    const context = useContext(CartContext);

    useEffect(() => {
        // console.log("Setting animation to active");
        setAnimationActive(true);

        setTimeout(() => {
            // console.log("Setting animation to inactive");
            setAnimationActive(false);
        }, 300);

        // return(() => {
        //     setAnimationActive(false);
        //     console.log("Setting animation to inactive");
        // });

        // return (() => {
        //     clearTimeout(timer);
        // });
    }, [context.userCartTotal]);

    function openModal(){
        setModalActive(true);
    }

    function closeModal(){
        setModalActive(false);
    }

    return(
        <div>
            <button className={`${classes.button} ${animationActive ? classes.bump : ""}`} onClick={openModal}>
                <span className={classes.icon}><CartIcon/></span>
                <span>Your Cart</span>
                <span className={classes.badge}>{context.userCartTotal.amount}</span>
            </button>
            {modalActive ? <CartModal onCancel={closeModal}/> : ""}
        </div>
    );
}

export default CartButton;
