import { useState } from "react";
import useInput from "../../hooks/use-input";
import useHTTP from "../../hooks/use-http";

import Modal from "../Ui/Modal";
import Input from "../Ui/Input";

import classes from "./OrderModal.module.css";



interface ResponseObjectType{
    name: string,
    address: string
}


interface OrderModalProps{
    onCancel: () => void,
    onSuccess: () => void,
    cartMeals: {mealId: string, amount: number}[],
    orderTotal: {amount: number, price: number}
}

function OrderModal(props: OrderModalProps){
    const {sendRequest: sendOrder, isLoading, error} = useHTTP();
    const [submit, setSubmit] = useState(false);

    const nameInputHandler = useInput((input) => {
        return (input.trim() !== "");
    });

    const addressInputHandler = useInput((input) => {
        return (input.trim() !== "");
    });

    function cancelHandler(){
        props.onCancel();
    }

    function successHandler(){
        props.onSuccess();
    }

    function createNewOrder(newOrder: {name: string, address: string}, data: [ResponseObjectType]){
        console.log(newOrder);
        console.log(data);
    }

    function formSubmitHandler(){
        console.log("Submit form");
        setSubmit(true);

        if(nameInputHandler.inputIsValid && addressInputHandler.inputIsValid){
            console.log(nameInputHandler.input);
            console.log(addressInputHandler.input);

            const newOrder = {
                name: nameInputHandler.input,
                address: addressInputHandler.input,
                orderTotal: props.orderTotal,
                orderMeals: props.cartMeals
            }
            sendOrder(
                {
                    url: "https://react-course-http-b0fa6-default-rtdb.firebaseio.com/orders.json",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newOrder)
                },
                createNewOrder.bind(null, newOrder)
            );


            nameInputHandler.inputResetHandler();
            addressInputHandler.inputResetHandler();


        }



    }

    // <label htmlFor={"fullname"}>Full Name</label>
    // <input
    //     id="fullname"
    //     type="text"
    //     onChange={(event) => {
    //         nameInputHandler.inputChangeHandler(event.target.value);
    //     }}
    //     onBlur={(event) => {
    //         nameInputHandler.inputBlurHandler();
    //     }}
    // />

    return (
        <Modal onCancel={cancelHandler}>
            <form className={classes.form} onSubmit={(event) => {
                event.preventDefault();
                formSubmitHandler();
            }}>
                {isLoading && <p>Loading...</p>}
                {!isLoading && submit && (error===null) && <p>Order submitted succesfully!</p>}
                {!isLoading && !submit &&
                    <div>
                        <Input
                            label="Full Name"
                            id="fullname"
                            type="text"
                            value={nameInputHandler.input}
                            onChange={nameInputHandler.inputChangeHandler}
                            onBlur={nameInputHandler.inputBlurHandler}
                            overrideStyle="alternative"
                            isValid={!nameInputHandler.inputHasError}
                        />
                        {nameInputHandler.inputHasError && <p className={classes["error-text"]}>Name must not be empty.</p>}

                        <Input
                            label="Address"
                            id="address"
                            type="text"
                            value={addressInputHandler.input}
                            onChange={addressInputHandler.inputChangeHandler}
                            onBlur={addressInputHandler.inputBlurHandler}
                            overrideStyle="alternative"
                            isValid={!addressInputHandler.inputHasError}
                        />
                        {addressInputHandler.inputHasError && <p className={classes["error-text"]}>Address must not be empty.</p>}

                    </div>
                }
                <div className={classes.actions}>
                    {!submit && <button className={classes["button--alt"]} onClick={cancelHandler}>Cancel</button>}
                    {(!submit || error !== null) && <button className={classes.button} disabled={isLoading} type="submit">Confirm Order</button>}
                    {submit && error === null && <button className={classes.button} onClick={successHandler}>Close</button>}
                </div>

            </form>
        </Modal>
    );
}

export default OrderModal;
