import { useState } from "react";
import {Link} from "react-router-dom"
import { useLogin } from "../hooks/useLogin";

const Login = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const { login, error } = useLogin();

    const handleLogin = async (e) => {
        e.preventDefault();

        await login(email, password);

    }

    return ( 
        <div className="Login my-5">
            <div className="container col-4">
                <h2 className="my-4">Login to <b className="text-danger">CHRONOS</b> </h2>
                
                <form onSubmit={handleLogin}>
                    <div className="my-4">
                        <label className="lead">Email</label>
                        <input className="form-control" type="email"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                            required
                        />
                    </div>

                    <div className="my-4">
                        <label className="lead">Password</label>
                        <input className="form-control" type="password"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                            required
                        />
                    </div>
                    <div className="my-4">
                        <button className="btn btn-danger form-control">Login</button>
                    </div>

                    <div className="my-3">
                        <Link to="/SignUp" className="text-danger"> DON'T HAVE AN ACCOUNT ? </Link>
                    </div>

                    {error && <div className="card p-2 text-center text-danger mx-3" id="errorBox"><label><i class="bi bi-exclamation-diamond text-danger"></i> { error } </label></div>  }
                </form>
            </div>
        </div>
     );
}
 
export default Login;