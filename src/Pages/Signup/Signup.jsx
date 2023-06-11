import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { AuthContext } from "../../providers/AuthProvider";
import Loader from "../../components/Shared/Loader";
const img_hosting_token= import.meta.env.VITE_img_api_key

const Signup = () => {
  const {createUser,loading,setLoading,updateUserProfile} = useContext(AuthContext);
  const { register,reset, formState: { errors }, handleSubmit } = useForm();
  const image_hosting_url=`https://api.imgbb.com/1/upload?key=${img_hosting_token}`
  const navigate = useNavigate();
  // console.log(image_hosting_url)
  const onSubmit = (data) => {
    // image process
    //TODO : photo upload
    // const formData = new FormData()
    // formData.append("photo", data.photo[0])
    // fetch(image_hosting_url,{
    //   method:'POST',
    //   body: formData,
    // })
    // .then(res=>res.json())
    // .then(data=>{
    //   console.log(data)
    // })
    // .catch(error=>{
    //     toast.error(error.message)
    // })
    if (data.password !== data.confirm) {
      return toast.error("password & confirm password are not same")
    }
    const photo = data.photo;
    const name = data.name;
    console.log(photo,name)
    createUser(data.email,data.password)
    .then(result=>{
      reset();
      const loggedUser = result.user;
      updateUserProfile(loggedUser,name,photo)
      .then(()=>{
        toast.success('User successfully created')
        useNavigate("/");
      })
      .catch(error=>{
        console.log(error)
        toast.error(error.message)
      })

    })
    .catch(error=>{

      setLoading(false)
      toast.error(error.message)
      console.log(error)
      navigate("/")
    })
    console.log(data);

    // name photo


    // user create 

    // user information database - users - role: 'user'
  };
  if (loading) {
    return <Loader></Loader>
  }
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Signup now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          
          <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Name"
                className="input input-bordered"
                {...register("name", {required: true})}
              />
              {errors.name?.type === 'required' && <p className="text-red-500">This field is required</p> }
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                {...register("email", {required: true})}
              />
              {errors.email?.type === 'required' && <p className="text-red-500">This field is required</p> }
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">photo url</span>
              </label>
              <input
                type="text"
                name="photo"
                className="input input-bordered"
                {...register("photo",{required:true})}
              />
              {errors.photo?.type === 'required' && <p className="text-red-500">This field is required</p> }
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="********"
                className="input input-bordered"
                {...register("password", {required: true})}
              />
              {errors.password?.type === 'required' && <p className="text-red-500">This field is required</p> }
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="********"
                className="input input-bordered"
                {...register("confirm",{required:true})}
              />
              {errors.confirm?.type === 'required' && <p className="text-red-500">This field is required</p> }
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">Signup</button>
            </div>
            </form>
          </div>
         
          <label className="label">
            <a className="label-text-alt">
              Already have an account? Please <Link to="/login"> <span className="text-xl text-orange-500">Login</span></Link>
            </a>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Signup;
