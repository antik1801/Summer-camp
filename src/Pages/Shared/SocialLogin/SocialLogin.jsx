import React, { useContext } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { AuthContext } from '../../../providers/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';

const SocialLogin = () => {
    const {googleSignIn} = useContext(AuthContext)
    const navigate = useNavigate();
    const location = useLocation()
    const from = location.state?.from?.pathname || "/"
    const handleGoogleSignIn = () =>{
        googleSignIn()
        .then(result=>{
            const loggedInUser = result.user;
            const savedUser = { name: loggedInUser.displayName, email: loggedInUser.email, role:"user" };
            fetch("https://medlife-server-navy.vercel.app/users", {
                method: "POST",
                headers: {
                  "content-type": "application/json",
                },
                body: JSON.stringify(savedUser),
              })
                .then((res) => res.json())
                .then((data) => {
                  console.log(data);
                  if (data.insertedId) {
                   
                    navigate(from,{replace:true})
                  }
                  navigate(from,{replace:true})
                });
            console.log(loggedInUser);
            
        })
    }
    return (
        <div className='text-center'>
             <div className="divider"></div> 
             <button onClick={handleGoogleSignIn} className="btn btn-circle btn-outline mb-8"> <FaGoogle /> </button>
        </div>
    );
};

export default SocialLogin;