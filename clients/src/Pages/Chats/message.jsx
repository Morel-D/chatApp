import { useState } from "react";
import { useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import userPng from "../../Images/user.png";
import { format } from "timeago.js";

const Message = ({ chat }) => {

    const [userData, setUserData] = useState(null);
    const { user } = useAuthContext();
    const [message, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState();

    const userId = chat?.members?.find((id) => id !== user._id);

// feching data for members 

    useEffect(() => {

        fetch(`/user/${userId}`)
            .then((response) => {
            return response.json()
            }).then((data) => {
                setUserData(data)
                // console.log(data);
            })

    }, [chat, user.id])


// fetching data for messages

    useEffect(() => {
        const fetchMessage = () =>
        {
            fetch('/message/' + chat._id)
            .then((response) => {
                return response.json()
            }).then((data) => {
             
                setMessages(data)
            console.log(data)
        })
        }
        
        if (chat !== null)
        {
            fetchMessage()
        }
        
    }, [chat])


// send mesage
    const handleSendMessage = () => 
    {
        
        }
    
    return ( 
        <div className="message">
                    <div className="card py-4 px-5 my-2">
                       <div className="row">
                    {userData && (
                        <div className="col"><img src={userData.picture} id="userpro2" /><label className="lead mx-3">{userData.userName}</label></div>
                    )}
                    
                    {!userData && (
                        <div className="col"><img src={userPng} id="userpro2" /><label className="lead mx-3">No User</label></div>
                        )  }
                        </div>
            </div>
            
            {chat && (
                <div>
                                       <div id="message-form">         
                
                {message && message.map((msg) => ( 
                    
                
                    <div className=
                        {msg.senderId === user._id ? "chat-Messages p-3 d-flex justify-content-end" : "chat-Messages p-3"} id={msg.senderId === user._id ? "msg-box" : "msg-box2"}>
                        <div className="card px-4 py-2 col-3 text-white">
                            <span>{msg.text}</span>
                            <span className="text-end"><small>{format(msg.createdAt)}</small></span>
                        </div>
                    </div>
               
                ))}
                
                    </div>
                    <form action="">
                        <div className="row">
                            <div className="col">
                                <div className="text-center bg-secondary p-2 rounded">
                                   <i class="text-white bi bi-link-45deg"></i>
                                </div>
                            </div>
                            <div className="col">
                                
                            </div>
                            <div className="col col-9">
                                <input type="text" placeholder="Enter your message" className="form-control"/>
                            </div>
                            <div className="col">
                                <button className="btn btn-danger"><i class="bi bi-send"></i> Send</button>
                            </div>
                        </div>
                    </form>
        </div>
            )}

            {!chat && ( <span className="d-flex justify-content-center py-5"><label className="lead">Tap to start the chat</label></span> )}

        </div>
     );
}
 
export default Message;