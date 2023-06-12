import React, { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { useForm } from "react-hook-form";

const AddClass = () => {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  return (
    <div className="w-full">
      <div className=" min-h-screen bg-base-200">
        <div className="">
          <div className="card w-full shadow-2xl bg-base-100">
            <h1 className="text-5xl font-bold my-6 text-center">
              Please add a class!
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="card-body grid grid-cols-1 md:grid-cols-2">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Course Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Course"
                    className="input input-bordered"
                    name="name"
                    {...register("name", { required: true })}
                  />
                   {errors.name && <span className="text-red-600">This field is required</span>}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Course Cover Photo</span>
                  </label>
                  <input
                    type="text"
                    placeholder="cover photo"
                    className="input input-bordered"
                    name="photo"
                    {...register("photo", { required: true })}
                  />
                   {errors.photo && <span className="text-red-600">This field is required</span>}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Instructor</span>
                  </label>
                  <input
                    type="text"
                    defaultValue={user?.displayName}
                    className="input input-bordered"
                    {...register("instructor", { required: true })}
                    readOnly
                  />
                   {errors.instructor && <span className="text-red-600">This field is required</span>}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Instructor Email</span>
                  </label>
                  <input
                    type="text"
                    defaultValue={user?.email}
                    className="input input-bordered"
                    {...register("instructorMail", { required: true })}
                    readOnly
                  />
                    {errors.instructorMail && <span className="text-red-600">This field is required</span>}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Available Seat</span>
                  </label>
                  <input
                    type="number"
                    placeholder="seats"
                    className="input input-bordered"
                    {...register("seats", { required: true })}
                  />
                    {errors.seats && <span className="text-red-600">This field is required</span>}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Price</span>
                  </label>
                  <input
                    type="number"
                    placeholder="price"
                    className="input input-bordered"
                    {...register("price", { required: true })}
                  />
                  {errors.price && <span className="text-red-600">This field is required</span>}
                </div>
              </div>
              <div className="text-center mb-10">
                <button type="submit" className="btn btn-primary">
                  ADD
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddClass;
