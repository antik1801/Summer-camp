import React, { useContext, useEffect, useRef, useState } from "react";
import { FaEye } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from "../../providers/AuthProvider";
import { toast } from 'react-toastify';
import Loader from "../../components/Shared/Loader";
import Swal from "sweetalert2";

const Login = () => {
  const {signIn,loading,setLoading} = useContext(AuthContext);
  const captchaRef= useRef(null)
  const [disabled,setDisabled] = useState(true)
  const navigate = useNavigate();
  const location = useLocation()
  const from = location.state?.from?.pathname || "/"
  useEffect(()=>{
    loadCaptchaEnginge(6); 
  },[])
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data)
    signIn(data.email, data.password)
    .then(result=>{
      const user = result.user;
      reset();
      console.log(user)
      toast.success("user successfully loggedin")
      Swal.fire(
        'Congradulation!',
        'User successfully created!',
        'success'
      )
      navigate(from,{replace:true})
    })
    .catch(error=>{
      setLoading(false)
      toast.error(error.message)
    })
  
  };
  if (loading) {
    return <Loader></Loader>
  }
  const handleValidateCaptcha = (e) =>{
    e.preventDefault();
    const user_captcha_value = captchaRef.current.value;
    if(validateCaptcha(user_captcha_value)){
      setDisabled(false)
    }else{
      setDisabled(true)
    }
  
  }
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  placeholder="email"
                  className="input input-bordered"
                  {...register("email",{required: true}) }
                />
                {errors.email?.type === 'required' && <p className="text-red-700">This field is required</p>}
              </div>
              <div className="form-control relative">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="text"
                  placeholder="password"
                  className="input input-bordered"
                  {...register("password",{required: true})}
                />
                {errors.password?.type === 'required' && <p className="text-red-700">This field is required</p>}
              </div>
              <div className="form-control relative">
                <label className="label">
                < LoadCanvasTemplate />
                </label>
                <input
                  type="text"
                  placeholder="type the text"
                  className="input input-bordered"
                  ref={captchaRef}
                  {...register("capcha",{required: true})}
                  
                />
                {errors.password?.type === 'required' && <p className="text-red-700">This field is required</p>}
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">Login</button>
              </div>
            </div>
          </form>
          <label className="label">
            <a className="label-text-alt link link-hover">
              New in MEDLAND? please <Link to="/signup"> <span className="text-xl text-orange-600">Signup now</span></Link>
            </a>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Login;
