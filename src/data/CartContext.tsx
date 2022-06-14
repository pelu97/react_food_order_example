import React, { ReactNode, useState, useEffect } from "react";

import { MealType } from "../types/MealType";
import { CartItemType } from "../types/CartItemType";



interface CartContextLayout{
    userCart: CartItemType[],
    onAddUserCart: (meal: MealType, amount: number) => void
}

const CartContext = React.createContext<CartContextLayout>({
    userCart: [],
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
        setUserCart((prevState) => {
            return [
                ...prevState,
                {meal, amount}
            ]
        });

        setUserCartTotal(((prevState) => {
            return prevState + amount;
        }));

        // console.log(userCart);
    }

    return(
        <CartContext.Provider value={{
            userCart: userCart,
            onAddUserCart: addUserCartHandler
        }}>
            {props.children}
        </CartContext.Provider>
    );
}


export default CartContext;
