import { useEffect } from "react";
import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import Conversation from "./Conversation";
import Message from "./message";

const Private = () => {

    const [chats, setChats] = useState();
    const { user } = useAuthContext();
    const [currentChat, setCurrentChat] = useState(null);


    useEffect(() => {

        const getChat = async () => {

            fetch(`/chat/${user._id}`, {
                method: "GET"
            })
                .then((response) => {
                
                    if (!response.ok)
                    {
                        throw Error('Fetch request failed')
                    }
                    return response.json()
                }).then((data) => {
                
                    setChats(data);
            })
        }

        getChat()

    }, [])


    return (
       
        <div className="chat-list">
            <div className="row">
                <div className="col col-3">     
                <h3 className="container py-3 px-4 text-danger">Private Room</h3>    
                 {
                   chats &&  chats.map((chat) =>
                     (
                       <div onClick={() => setCurrentChat(chat)}>
                            <Conversation key={ chat._id } chat={chat} />
                     </div>
                     ))
                 }
                </div>

                <div className="col">
                    <div className="container py-2">
                    <Message chat={currentChat} />
                   </div>
                </div>
            </div>
        </div>
     );
}
 
export default Private;