import { useState } from "react";


type ValidateFunction = ((input: string) => boolean);

function useInput(validateValue: ValidateFunction){
    const [input, setInput] = useState("");
    const [isTouched, setIsTouched] = useState(false);


    const inputIsValid = validateValue(input);
    const inputHasError = !inputIsValid && isTouched;


    function inputChangeHandler(value: string){
        setInput(value);
    }

    function inputBlurHandler(){
        setIsTouched(true);
    }

    function inputResetHandler(){
        setInput("");
        setIsTouched(false);
    }


    return {
        input,
        inputIsValid,
        inputHasError,
        inputChangeHandler,
        inputBlurHandler,
        inputResetHandler
    }
}

export default useInput;
