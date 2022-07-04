

import classes from "./Input.module.css";


interface InputProps{
    type?: string,
    id: string
    label: string,
    value?: string,
    min?: string,
    max?: string
    onChange: (value: string) => void,
    onBlur?: () => void,
    overrideStyle?: string,
    isValid?: boolean
}

function Input(props: InputProps){

    let inputClass = classes.input;

    if(props.overrideStyle !== undefined){
        if(props.overrideStyle === "alternative"){
            inputClass = classes["input--alt"]
        }
    }

    // isValid is defined and it's false
    if(props.isValid !== undefined && !props.isValid){
        inputClass = `${inputClass} ${classes.invalid}`;
    }

    return (
        <div className={inputClass}>
            <label htmlFor={props.id}>{props.label}</label>
            <input
                id={props.id}
                type={props.type}
                value={props.value}
                min={props.min}
                max={props.max}
                onChange={(event) => {
                    props.onChange(event.target.value);
                }}
                onBlur={(_) => {
                    if(props.onBlur){
                        console.log("blur");
                        props.onBlur();
                    }
                }}
            />
        </div>
    );
}

export default Input;
