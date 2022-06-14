import { MealType } from "../../types/MealType";

import MealList from "../Meal/MealList";
import Header from "../Ui/Header";
import Card from "../Ui/Card";

// import classes from "./Home.module.css";

interface HomeProps{
    menu: MealType[]
}

function Home(props: HomeProps){
    return(
        <div>
            <Header/>

            <Card>
                <h2>Delivery Slogan Placeholder</h2>

                <p>Choose your favorite meal from our broad selection of available dishes and enjoy a delicious lunch or dinner at home.</p>
            </Card>


            <MealList meals={props.menu}/>
        </div>
    );
}

export default Home;
