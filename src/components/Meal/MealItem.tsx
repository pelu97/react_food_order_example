import { useContext } from "react";
import { MealType } from "../../types/MealType";

import CartContext from "../../data/CartContext";

import MealItemForm from "./MealItemForm";

import classes from "./MealItem.module.css";

interface MealItemProps{
    meal: MealType
}

function MealItem(props: MealItemProps){

    const context = useContext(CartContext);

    function addToCartHandler(amount: number){
        context.onAddUserCart(props.meal, amount);
    }



    return(
        <li className={classes.meal}>
        <div>
            <h3>{props.meal.name}</h3>
            <div className={classes.description}>
                {props.meal.description}
            </div>
            <div className={classes.price}>
                {`$${props.meal.price.toFixed(2)}`}
            </div>
        </div>

            <MealItemForm id={props.meal.id} onAdd={addToCartHandler}/>
        </li>
    );
}

export default MealItem;
