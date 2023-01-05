import { useEffect } from "react";
import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import Conversation from "./Conversation";
import Message from "./message";
import { io } from "socket.io-client";
import { useRef } from "react";

const Private = () => {

    const [chats, setChats] = useState();
    const { user } = useAuthContext();
    const [currentChat, setCurrentChat] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [sendMsg, setSendMsg] = useState(null);
    const [receiveMsg, setReceiveMsg] = useState(null)
    const socket = useRef();


    // Send message form the socket server

    useEffect(() => {
        if (sendMsg !== null)
        {
            socket.current.emit('send-message', sendMsg);
        }
        
    }, [sendMsg])


    // receive message from the socket server

    // useEffect(() => {
    //     socket.current.on('receive-message', (data) => {
    //         setReceiveMsg(data)
    //     })
    // }, [])

    useEffect(() => {
        socket.current = io('http://localhost:8800');
        socket.current.emit('new-user-add', user._id)
        socket.current.on('get-users', (users) => {
            setOnlineUsers(users)
            // console.log("Online ", users);
        })
    }, [user])

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