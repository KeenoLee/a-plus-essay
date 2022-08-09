import React, { useEffect, useState } from 'react';

export function useGetRee<T extends {}>( url:string, method: "POST" | "PUT" | "DELETE", inputData:any ):[T|null,boolean, string, Function]{

    const [ data, setData ] = useState<null | T>(null);
    const [ isLoading, setLoading ] = useState<boolean>(false);
    const [ error, setError ] = useState<string>("");

    async function getData(){
        setLoading(true)

        try {
            const res = await fetch(url, {
                method: method,
                body: inputData
            })

            const result = await res.json();
            setData(result)
            setError("")
            
        } catch (error:any) {
            setError(error.message)
        }
        finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        getData()
    }, []);

    return [ data, isLoading, error, getData ]
}
