

import classes from "./Input.module.css";


interface InputProps{
    type?: string,
    id: string
    label: string,
    value?: string,
    onChange: (value: string) => void
}

function Input(props: InputProps){
    return (
        <div className={classes.input}>
            <label htmlFor={props.id}>{props.label}</label>
            <input type={props.type} value={props.value} onChange={(event) => {
                props.onChange(event.target.value);
            }}/>
        </div>
    );
}

export default Input;
