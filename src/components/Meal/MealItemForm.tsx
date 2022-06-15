import { useState } from "react";

import Input from "../Ui/Input";

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

    // <label htmlFor="amount">Amount</label>
    // <input id="amount" type="number" value={amountInput} onChange={(event) => {
    //     onAmountChange(event.target.value);
    // }}/>

    return(
        <form className={classes.form}>
            <Input id="amount" label="Amount" type="number" value={amountInput.toString()} onChange={onAmountChange}/>
            <button type="button" onClick={(event) => {
                event.preventDefault();
                onAddHandler();
            }}>Add</button>
        </form>
    );
}

export default MealItemForm;
