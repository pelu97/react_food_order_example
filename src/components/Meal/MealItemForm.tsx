import { useState } from "react";

import classes from "./MealItemForm.module.css";


interface MealItemFormProps{
    onAdd: (amount: number) => void
}

function MealItemForm(props: MealItemFormProps){
    const [amountInput, setAmountInput] = useState(1);


    function onAddHandler(){
        props.onAdd(amountInput);
        setAmountInput(1);
    }

    function onAmountChange(value: string){
        setAmountInput(+value);
    }

    return(
        <form className={classes.form}>
            <label htmlFor="amount">Amount</label>
            <input id="amount" type="number" value={amountInput} onChange={(event) => {
                onAmountChange(event.target.value);
            }}/>
            <button type="button" onClick={(event) => {
                event.preventDefault();
                onAddHandler();
            }}>Add</button>
        </form>
    );
}

export default MealItemForm;
