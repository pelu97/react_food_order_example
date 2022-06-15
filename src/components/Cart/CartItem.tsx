import { CartItemType } from "../../types/CartItemType";

import classes from "./CartItem.module.css";


interface CartItemProps{
    item: CartItemType,
    onAdd: (id: string) => void,
    onRemove: (id: string) => void
}

function CartItem(props: CartItemProps){
    // console.log(props.item);

    function addMeal(){
        props.onAdd(props.item.meal.id);
    }

    function removeMeal(){
        props.onRemove(props.item.meal.id);
    }

    return(
        <li className={classes["cart-item"]}>
            <h2>{props.item.meal.name}</h2>
            <div className={classes.amount}>{props.item.amount}</div>
            <div className={classes.price}>{props.item.meal.price}</div>
            <div className={classes.actions}>
                <button type="button" onClick={addMeal}>+</button>
                <button type="button" onClick={removeMeal}>-</button>
            </div>
        </li>
    );
}

export default CartItem;
