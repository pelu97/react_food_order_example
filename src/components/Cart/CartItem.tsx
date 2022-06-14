import { CartItemType } from "../../types/CartItemType";

import classes from "./CartItem.module.css";


interface CartItemProps{
    item: CartItemType
}

function CartItem(props: CartItemProps){
    console.log(props.item);
    return(
        <li className={classes["cart-item"]}>
            <h2>{props.item.meal.name}</h2>
            <div className={classes.amount}>{props.item.amount}</div>
        </li>
    );
}

export default CartItem;
