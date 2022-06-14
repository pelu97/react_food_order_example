import { useContext } from "react";

import CartContext from "../../data/CartContext";
import CartItem from "./CartItem";

import classes from "./CartModal.module.css";


interface CartModalProps{
    onCancel: () => void
}

function CartModal(props: CartModalProps){
    const context = useContext(CartContext);

    function cancelHandler(){
        props.onCancel();
    }

    function confirmHandler(){
        console.log("Placing order...");
    }

    return(
        <div>
            <div className={classes.modal}>
                <h3>Cart Modal</h3>
                <ul>
                    {context.userCart.map((item) => {
                        return <CartItem item={item} key={item.meal.id}/>;
                    })}
                </ul>

                <button onClick={cancelHandler}>Cancel</button>
                <button onClick={confirmHandler}>Order</button>
            </div>
            <div className={classes.backdrop} onClick={cancelHandler}/>
        </div>

    );
}

export default CartModal;
