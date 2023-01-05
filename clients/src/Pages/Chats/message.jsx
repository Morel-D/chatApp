import { useState } from "react";
import { useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import userPng from "../../Images/user.png";
import { format } from "timeago.js";
import { useRef } from "react";

const Message = ({ chat, setSendMsg, receiveMsg }) => {

    const [userData, setUserData] = useState(null);
    const { user } = useAuthContext();
    const [message, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState();
    const scroll = useRef();

    const userId = chat?.members?.find((id) => id !== user._id);


    useEffect(() => {
        if (receiveMsg !== null && receiveMsg?.chat._id === chat?._id)
        {
            console.log("Data recieved in child chatBox :", receiveMsg)
            setMessages([...message, receiveMsg]);
        }
        
    })

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
            // console.log(data)
        })
        }
        
        if (chat !== null)
        {
            fetchMessage()
        }
        
    }, [chat])


// send mesage
    const handleSendMessage = (e) => {
        e.preventDefault();

        const sendMessage = {
            senderId: user._id,
            chatId: chat._id,
            text: newMessage
        }

        fetch('/message', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(sendMessage)
        }).then((data) => {
            if (data.ok) {
                setNewMessage('')
            }
        })
        

        // send message to socket server
        setSendMsg({ ...message, userId })


    };
        
    // always scroll the message
    useEffect(() => {
         scroll.current?.scrollIntoView({ behavior: "smooth" })
    }, [message])
    
    return ( 
        <div className="message">
                    <div className="card py-4 px-5 my-2">
                       <div className="row">
                    {userData && (
                        <div className="col"><img src={userData.picture} id="userpro2" /><label className="lead mx-3">{userData.userName}</label>
                            {/* <small className="text-danger"><i>Online</i></small> */}
                        </div>
                    )}
                    
                    {!userData && (
                        <div className="col"><img src={userPng} id="userpro2" /><label className="lead mx-3">No User</label>
                       
                        </div>
                        )  }
                        </div>
            </div>
            
            {chat && (
                <div>
                                       <div ref={scroll}  id="message-form">         
                
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
                    <form onSubmit={handleSendMessage}>
                        <div className="row">
                            <div className="col">
                                <div className="text-center bg-secondary p-2 rounded">
                                   <i class="text-white bi bi-link-45deg"></i>
                                </div>
                            </div>
                            <div className="col">
                                
                            </div>
                            <div className="col col-9">
                                <input type="text" placeholder="Enter your message" className="form-control"
                                    value={newMessage}
                                    onChange ={(e) => { setNewMessage(e.target.value)}}
                                />
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