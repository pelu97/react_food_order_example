import { MealType } from "../../types/MealType";

import MealItem from "./MealItem";
import Card from "../Ui/Card";

import classes from "./MealList.module.css";


interface MealListProps{
    meals: MealType[]
}

function MealList(props: MealListProps){
    return(
        <Card className={classes.meals}>
            <ul>
                {
                    props.meals.map((meal) => {
                        return <MealItem meal={meal} key={meal.id}/>
                    })
                }
            </ul>
        </Card>
    );
}

export default MealList;
