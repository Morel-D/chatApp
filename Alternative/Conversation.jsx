import { useState } from "react";
import { useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

const Conversation = ({ chat, currentId }) => {
    
    const [userData, setUserData] = useState();
    const { user } = useAuthContext();

    useEffect(() => {

        const userId = chat.members.find((id) => id !== user._id);
        
        const getUser = async () => {

            const response = await fetch(`/user/${userId}`);

            const data = await response.json()
            
            if (response.ok)
            {
                setUserData(data)
                console.log(data)
            }          

        }

        getUser();

    }, [])


    return ( 
        <div className="shadow-sm bg-body p-3 m-2">
            {/* <img src={userData.picture} alt="" id="userpro" />  */}
                 <label className="text-secondary mx-2">
                    {/* <b>{ userData.userName }</b> */}
                </label>        
        </div>
     );
}
 
export default Conversation;