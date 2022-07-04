import { useContext, useState } from "react";

import CartContext from "../../data/CartContext";
import CartItem from "./CartItem";
import Modal from "../Ui/Modal";
import OrderModal from "../Order/OrderModal";

import classes from "./CartModal.module.css";


interface CartModalProps{
    onCancel: () => void
}

function CartModal(props: CartModalProps){
    const context = useContext(CartContext);
    const [orderModalActive, setOrderModalActive] = useState(false);

    const newOrder = context.userCart.map((item) => {
        return {mealId: item.meal.id, amount: item.amount};
    });


    function cancelHandler(){
        props.onCancel();
    }

    function confirmHandler(){
        console.log("Placing order...");
        openOrderModal();
    }

    function addMeal(id: string){
        context.onIncrementItem(id);
    }

    function removeMeal(id: string){
        context.onDecrementItem(id);
    }

    function openOrderModal(){
        setOrderModalActive(true);
    }

    function orderModalCancelHandler(){
        setOrderModalActive(false);
    }

    function orderModalSuccessHandler(){
        setOrderModalActive(false);
        context.onClearCart();
    }

    return(
        <Modal onCancel={cancelHandler}>
            <div>
                <h3>Your Cart</h3>
                <ul className={classes["cart-items"]}>
                    {context.userCart.map((item) => {
                        return <CartItem item={item} key={item.meal.id} onAdd={addMeal} onRemove={removeMeal}/>;
                    })}
                </ul>
                <div className={classes.total}>
                    <span>Total Amount</span>
                    <span>{`$${context.userCartTotal.price.toFixed(2)}`}</span>
                </div>
                <div className={classes.actions}>
                    <button className={classes["button--alt"]} onClick={cancelHandler}>Cancel</button>
                    {
                        context.userCartTotal.amount !== 0
                        ? <button className={classes.button} onClick={confirmHandler}>Order</button>
                        : ""
                    }
                </div>
            </div>

            {orderModalActive &&
                <OrderModal onCancel={orderModalCancelHandler} onSuccess={orderModalSuccessHandler} cartMeals={newOrder} orderTotal={context.userCartTotal}/>
            }
        </Modal>

    );
}

export default CartModal;
