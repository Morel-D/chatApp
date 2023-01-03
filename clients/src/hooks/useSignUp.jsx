import { useState } from "react"
import { useAuthContext } from "./useAuthContext";

export const useSignUp = () => {

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const signup = async (userName, email, password, picture) => {

        setLoading(true)
        setError(null)

        const response = await fetch('/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({userName, email, password, picture})
        })

        const data = await response.json();
        console.log(data);

        
        if (!response.ok)
        {
            setLoading(false)
            setError(data.error)
        }
        
        if (response.ok)
        {
            setLoading(false)
            localStorage.setItem('user', JSON.stringify(data));

            dispatch({ type: 'LOGIN', payload: data })

        }
        
    }

    return { loading, error, signup }
}