import { useContext } from "react";

import CartContext from "../../data/CartContext";
import CartItem from "./CartItem";
import Modal from "../Ui/Modal";

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

    function addMeal(id: string){
        context.onIncrementItem(id);
    }

    function removeMeal(id: string){
        context.onDecrementItem(id);
    }


    return(
        <Modal onCancel={cancelHandler}>
            <div>
                <h3>Cart Modal</h3>
                <ul className={classes["cart-items"]}>
                    {context.userCart.map((item) => {
                        return <CartItem item={item} key={item.meal.id} onAdd={addMeal} onRemove={removeMeal}/>;
                    })}
                </ul>
                <div className={classes.total}>
                    <div>Total Amount</div>
                    <div>{`$${context.userCartTotal.price.toFixed(2)}`}</div>
                </div>
                <div className={classes.actions}>
                    <button className={classes["button--alt"]} onClick={cancelHandler}>Cancel</button>
                    <button className={classes.button} onClick={confirmHandler}>Order</button>
                </div>
            </div>
        </Modal>

    );
}

export default CartModal;
