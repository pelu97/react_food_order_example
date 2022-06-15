import React, { ReactNode, useState, useEffect } from "react";

import { MealType } from "../types/MealType";
import { CartItemType } from "../types/CartItemType";



interface CartContextLayout{
    userCart: CartItemType[],
    userCartTotal: number,
    onAddUserCart: (meal: MealType, amount: number) => void,
    onIncrementItem: (id: string) => void
    onDecrementItem: (id: string) => void
}

const CartContext = React.createContext<CartContextLayout>({
    userCart: [],
    userCartTotal: 0,
    onAddUserCart: () => {},
    onIncrementItem: () => {},
    onDecrementItem: () => {}
});



interface CartContextProviderProps{
    children: ReactNode
}

export function CartContextProvider(props: CartContextProviderProps){
    const [userCart, setUserCart] = useState<CartItemType[]>([]);
    const [userCartTotal, setUserCartTotal] = useState(0);

    // effect just for loggin the cart state after updating it
    useEffect(() => {
        console.log(userCart);
        console.log(userCartTotal);
    }, [userCart, userCartTotal]);

    function addUserCartHandler(meal: MealType, amount: number){
        // setUserCart((prevState) => {
        //     return [
        //         ...prevState,
        //         {meal, amount}
        //     ]
        // });

        setUserCart((prevState) => {
            let nextState: CartItemType[] = [];

            const index = prevState.findIndex((item) => {
                return item.meal.id === meal.id;
            });

            if(index > -1){
                // meal is already present in the cart, just need to add to the amount
                nextState = prevState.map((item, i) => {
                    return i === index ?
                        {
                            ...item,
                            amount: item.amount + amount
                        } :
                        item
                    ;
                });
            }
            else{
                // meal is not yet present in the cart
                nextState = [
                    ...prevState,
                    {meal, amount}
                ]
            }

            return nextState;
        });

        setUserCartTotal(((prevState) => {
            return prevState + amount;
        }));

        // console.log(userCart);
    }


    function onIncrementItemHandler(id: string){
        // console.log("Incrementing meal with id: " + id);

        // same logic as addUserCartHandler, but simpler, only incrementing a meal that should already be in the cart
        setUserCart((prevState) => {
            let nextState: CartItemType[] = [];
            console.log(prevState);

            const index = prevState.findIndex((item) => {
                return item.meal.id === id;
            });

            if(index > -1){
                // nextState = [
                //     ...prevState
                // ]
                //
                // nextState[index].amount++;

                nextState = prevState.map((item, i) => {
                    return i === index ?
                        {
                            ...item,
                            amount: item.amount + 1
                        } :
                        item
                    ;
                });
                console.log("Index: " + index + " - New amount: " + nextState[index].amount);
            }
            else{
                // meal should be in the cart for this function to execute. If not found, it's an error
                console.log("Unexpected error, meal not found in cart.");
            }

            return nextState;
        });

        setUserCartTotal(((prevState) => {
            return prevState + 1;
        }));
    }

    function onDecrementItemHandler(id: string){

        // same logic as addUserCartHandler, but simpler, only decrementing a meal that should already be in the cart
        // if the amount is 1, meal should be removed instead of decrementing
        setUserCart((prevState) => {
            let nextState: CartItemType[] = [];

            const index = prevState.findIndex((item) => {
                return item.meal.id === id;
            });

            if(index > -1){
                // only 1 item, remove from the cart completely
                if(prevState[index].amount === 1){
                    nextState = prevState.filter((item) => {
                        return item.meal.id !== id;
                    })
                }
                else{
                    nextState = prevState.map((item, i) => {
                        return i === index ?
                            {
                                ...item,
                                amount: item.amount - 1
                            } :
                            item
                        ;
                    });
                }
            }
            else{
                // meal should be in the cart for this function to execute. If not found, it's an error
                console.log("Unexpected error, meal not found in cart.");
            }

            return nextState;
        });

        setUserCartTotal(((prevState) => {
            return prevState - 1;
        }));
    }



    return(
        <CartContext.Provider value={{
            userCart: userCart,
            userCartTotal: userCartTotal,
            onAddUserCart: addUserCartHandler,
            onIncrementItem: onIncrementItemHandler,
            onDecrementItem: onDecrementItemHandler
        }}>
            {props.children}
        </CartContext.Provider>
    );
}


export default CartContext;
