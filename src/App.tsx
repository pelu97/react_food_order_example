// import React from 'react';
import { useEffect, useState, useCallback } from "react";

import useHTTP from "./hooks/use-http";
import { CartContextProvider } from "./data/CartContext";
import { MealType } from "./types/MealType";
import Home from "./components/Layout/Home";

// import { DUMMY_MEALS } from "./data/DUMMY_MEALS";

interface ResponseObjectType{
    key: string,
    name: string,
    description: string,
    price: number
}

function App() {
    const [meals, setMeals] = useState<MealType[]>([]);
    const {sendRequest: fetchMeals, isLoading, error} = useHTTP();

    const processMeals = useCallback(function(fetchedMeals: [ResponseObjectType]){
        const newMeals: MealType[] = [];
        for (const mealId in fetchedMeals){
            newMeals.push({
                id: mealId,
                name: fetchedMeals[mealId].name,
                description: fetchedMeals[mealId].description,
                price: fetchedMeals[mealId].price
            });
        }

        setMeals(newMeals);
    }, []);

    useEffect(() =>{
        fetchMeals(
            {url: "https://react-course-http-b0fa6-default-rtdb.firebaseio.com/meals.json"},
            processMeals
        );
    }, [fetchMeals, processMeals]);

    return (
        <div>
            <CartContextProvider>
                <Home menu={meals} isLoading={isLoading} error={error}/>
            </CartContextProvider>
        </div>
    );
}

export default App;
