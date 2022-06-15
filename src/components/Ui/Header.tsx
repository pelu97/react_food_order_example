
import CartButton from "../Cart/CartButton";

// import mealsImage from "../../assets/img/meals.jpg";
import classes from "./Header.module.css";


function Header(){
    return(
        <div>
            <div className={classes.header}>
                <h2>Delivery Name Placeholder</h2>
                <CartButton/>
            </div>

        </div>

    );
}

export default Header;
