import { useContext, useState } from "react";

import CartContext from "../../data/CartContext";
import CartModal from "./CartModal";

import classes from "./CartButton.module.css";


function CartButton() {
    const [modalActive, setModalActive] = useState(false);
    const context = useContext(CartContext);

    function openModal(){
        setModalActive(true);
    }

    function closeModal(){
        setModalActive(false);
    }

    return(
        <div>
            <button className={classes.button} onClick={openModal}>
                Your Cart
                <span className={classes.badge}>{context.userCartTotal}</span>
            </button>
            {modalActive ? <CartModal onCancel={closeModal}/> : ""}
        </div>
    );
}

export default CartButton;