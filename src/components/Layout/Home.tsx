import { MealType } from "../../types/MealType";

import MealList from "../Meal/MealList";
import Header from "./Header";
import Card from "../Ui/Card";

import classes from "./Home.module.css";

import mealsImage from "../../assets/img/meals.jpg";

interface HomeProps{
    menu: MealType[]
}

function Home(props: HomeProps){
    return(
        <div>
            <Header/>
            <div className={classes["main-image"]}>
                <img alt="Table full of meals" src={mealsImage}/>
            </div>
            <Card className={classes.summary}>
                <h2>Delivery Slogan Placeholder</h2>

                <p>Choose your favorite meal from our broad selection of available dishes and enjoy a delicious lunch or dinner at home.</p>
            </Card>
            <main>
                <MealList meals={props.menu}/>
            </main>
        </div>
    );
}

export default Home;
