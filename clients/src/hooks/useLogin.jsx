import { useState } from "react"
import { useAuthContext } from "./useAuthContext"


export const useLogin = () => {

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)
    const { dispatch } = useAuthContext()


    const login = async (email, password) => {
        setLoading(true)
        setError(null)


        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email, password})
        })

        const data = await response.json();
        console.log(data)

        if (!response.ok)
        {
            setLoading(false)
            setError(data.error)
        }
        
        if (response.ok)
        {
            // save data to local storage
            localStorage.setItem('user', JSON.stringify(data))

            // update the auth context
            dispatch({type: 'LOGIN', payload: data })
        }
    }

    return { login, loading, error}


}