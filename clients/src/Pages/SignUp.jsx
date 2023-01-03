import { useState } from "react"
import {Link} from "react-router-dom"
import { useSignUp } from "../hooks/useSignUp";
import user from "../Images/user.png"

const SignUp = () => {

    // SignUp Details
    const [userName, setUserName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const { loading, error, signup } = useSignUp();

    // Image upload details
    const [image, setImage] = useState(null);
    const [uploadingImg, setUploadingImg] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

 
    const validateImg = (e) => {
        const file = e.target.files[0];

        if (file >= 1048576)
        {
            return alert("The Image is too big")
        } else {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
            }

    }


    const upLoadImage = async () => {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "qwto4hhd");

        try
        {
            setUploadingImg(true);
            const res = await fetch("https://api.cloudinary.com/v1_1/dfyvcsgga/image/upload", {
                method: "post",
                body: data,
            });
            const urlData = await res.json()
            setUploadingImg(false)
            return urlData.url;
        } catch (error)
        {
            setUploadingImg(false);
            console.log(error);
        }
    }

    const handleSignUp = async (e) => {

        e.preventDefault();
        const picture = await upLoadImage(image);
        console.log(picture);

        // 
        await signup(userName, email, password, picture);
    }


    return ( 
        <div className="SignUp">
        <div className="container col-4">
            <h2 className="my-4 text-center">SignUp to <b className="text-danger">CHRONOS</b> </h2>
            
                <form onSubmit={handleSignUp}>
                    
                    <div id ="image_container" className="image_container">
                        <img src={imagePreview || user} id ="pic_user" alt=""/>
                        <label htmlFor="image-upload" id="imageUplod-text">
                        <i class="bi bi-plus-circle-fill text-danger"  id="add-icon"></i>
                        </label>
                        <input type="file" id="image-upload" hidden accept="image/png, image/jpeg" onChange={validateImg} />
                    </div>

                <div className="">
                    <label className="lead">UserName</label>
                        <input className="form-control" type="text"
                            value={userName}
                            onChange={(e) => { setUserName(e.target.value)}}
                        />
                    </div>
                    
                <div className="my-2">
                    <label className="lead">Email</label>
                        <input className="form-control" type="email"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value)}}
                        />
                </div>

                <div className="my-2">
                    <label className="lead">Password</label>
                        <input className="form-control" type="password"
                            value={password}
                            onChange ={(e) => { setPassword(e.target.value)}}
                        />
                </div>
                <div className="my-2">
                        <button className="btn btn-danger form-control">
                            {uploadingImg ? 'Uploading image...' : 'SignUp'  }
                    </button>
                </div>

                <div className="my-3">
                    <Link to="/Login" className="text-danger"> ALREADY HAVE AN ACCOUNT ? </Link>
                    </div>

                    {loading &&  <div class="fa-3x"><i class="fas fa-spinner fa-pulse text-secondary"></i></div>   }

                    {error && <div className="card p-2 text-center text-danger mx-3" id="errorBox"><label><i class="bi bi-exclamation-diamond text-danger"></i> { error } </label></div>  }

                </form>
                
            </div>
    </div>
     );
}
 
export default SignUp;