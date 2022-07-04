import { useState, useCallback } from "react";


interface RequestType{
    url: string,
    method?: string,
    headers?: HeadersInit,
    body?: BodyInit
}

// interface SetDataType{
//     setData: (data: [object]) => {}
// }

// interface ResponseObjectType{
//     key: string,
//     name: string,
//     description?: string,
//     price: number
// }

function useHTTP(){
    const [error, setError] = useState<string|null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const sendRequest = useCallback(async function (request: RequestType, setData: (data: [any]) => void){
        setIsLoading(true);
        setError(null);

        try{
            const response = await fetch(request.url, {
                method: request.method ? request.method : "GET",
                headers: request.headers,
                body: request.body
            });

            if(!response.ok){
                throw new Error("Request error: " + response.status + response.statusText);
            }

            const data = await response.json();

            console.log("Request sent " + response.status);

            setData(data);

        }
        catch(error){
            let message;
            if(error instanceof Error){
                message = error.message
            }
            else{
                message = String(error);
            }
            setError("Something went wrong! " + message);
        }

        setIsLoading(false);

    }, []);

    return {
        sendRequest,
        isLoading,
        error
    }
}

export default useHTTP;
