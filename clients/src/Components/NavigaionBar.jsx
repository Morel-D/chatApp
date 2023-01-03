import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import logo3 from "../Images/Logo3.png"


const NavigationBar = () => {

    const { user } = useAuthContext();
    const { logout } = useLogout();

    const handleLogout = (e) =>
    {
        // e.preventDefault();
        logout()
    }
    

    return (

    <nav class="navbar bg-light p-3">
       <div class="container-fluid">
                <Link to="/">
                    <img src={logo3} id="logo" alt=""/> 
                </Link>
                {user && 
                    <form class="d-flex" role="search">

                    <label class="mx-5 lead" data-bs-toggle="dropdown" aria-expanded="false">
                            {user.userName}
                            {/* <img src={user.picture} className="img-fluid mx-2" id="profile"/>           */}
                    </label>
                    <ul class="dropdown-menu">
                        <li><button class="btn dropdown-item" onClick={handleLogout}>Logout</button></li>
                        <li><a class="dropdown-item">View Profile</a></li>
                    </ul>
            </form>
                }
        </div>    
    </nav>
        
       
    );
}
 
export default NavigationBar;