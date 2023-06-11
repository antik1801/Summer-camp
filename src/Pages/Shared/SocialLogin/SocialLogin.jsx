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
            console.log(loggedInUser);
            navigate(from,{replace:true})
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