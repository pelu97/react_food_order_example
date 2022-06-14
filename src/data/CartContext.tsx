import React, { ReactNode, useState, useEffect } from "react";

import { MealType } from "../types/MealType";
import { CartItemType } from "../types/CartItemType";



interface CartContextLayout{
    userCart: CartItemType[],
    userCartTotal: number,
    onAddUserCart: (meal: MealType, amount: number) => void
}

const CartContext = React.createContext<CartContextLayout>({
    userCart: [],
    userCartTotal: 0,
    onAddUserCart: () => {}
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
                nextState = [
                    ...prevState
                ]

                nextState[index].amount += amount;
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

    return(
        <CartContext.Provider value={{
            userCart: userCart,
            userCartTotal: userCartTotal,
            onAddUserCart: addUserCartHandler
        }}>
            {props.children}
        </CartContext.Provider>
    );
}


export default CartContext;
