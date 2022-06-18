import { useState } from "react";

import Input from "../Ui/Input";

import classes from "./MealItemForm.module.css";


interface MealItemFormProps{
    id: string,
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
        <form className={classes.form} onSubmit={(event) => {
            event.preventDefault();
            onAddHandler();
        }}>
            <Input id={"amount" + props.id} label="Amount" type="number" value={amountInput.toString()} min="1" max="10" onChange={onAmountChange}/>
            <button type="submit">Add</button>
        </form>
    );
}

export default MealItemForm;
