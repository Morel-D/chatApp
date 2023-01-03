import Message from "./Chats/message";
import Private from "./Chats/Private";

const Chat = () => {
    return ( 
      
        <div className="row">
            
            <div className="col">
                <div className="groups" id="groups">
                    <Private />
                </div>
            </div>
            </div>
         
     );
}
 
export default Chat;