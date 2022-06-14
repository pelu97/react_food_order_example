
import CartButton from "../Cart/CartButton";

import classes from "./Header.module.css";

function Header(){
    return(
        <div className={classes.header}>
            <h2>Delivery Name Placeholder</h2>
            <CartButton/>
        </div>
    );
}

export default Header;
