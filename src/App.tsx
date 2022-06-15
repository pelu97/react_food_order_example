// import React from 'react';

import { CartContextProvider } from "./data/CartContext";
import Home from "./components/Home/Home";

import { DUMMY_MEALS } from "./data/DUMMY_MEALS";

function App() {
    return (
        <div>
            <CartContextProvider>
                <Home menu={DUMMY_MEALS}/>
            </CartContextProvider>
        </div>
    );
}

export default App;
