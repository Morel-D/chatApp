import { useState } from "react";
import { useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

const Conversation = ({ chat}) => {
    
    const [userData, setUserData] = useState();
    const { user } = useAuthContext();

    useEffect(() => {

        const userId = chat.members.find((id) => id !== user._id);

        fetch(`/user/${userId}`)
            .then((response) => {
            return response.json()
            }).then((data) => {
            
                setUserData(data)
            }).catch((error) => {
            console.log(error.message)
        })

    }, [])


    return ( 
        <div className="shadow-sm p-3 m-2 box">
            <img src={userData &&    userData.picture} alt="" id="userpro" /> 
                 <label className="text-secondary mx-3 lead">
                    {userData && userData.userName }
                </label>        
        </div>
     );
}
 
export default Conversation;