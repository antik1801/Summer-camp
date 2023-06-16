import React, { useContext, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { useForm } from "react-hook-form";
import Loader from "../../../components/Shared/Loader";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const img_hosting_token = import.meta.env.VITE_img_api_key;
const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}
`;

const AddClass = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [axiosSecure] = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("image", data.image[0]);
    fetch(img_hosting_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageResponse) => {
        if (imageResponse.success) {
          const imgURL = imageResponse.data.display_url;
          console.log(imgURL);
          const courseItem = {
            price: parseFloat(data.price),
            course: data.name,
            seats: parseInt(data.seats),
            students: parseInt(0),
            instructor: data.instructor,
            instructor_email: data.instructorMail,
            status: "pending",
            details: data.details,
            picture: imgURL,
          };
          axiosSecure
            .post(`/instructor/addCourses`, courseItem)
            .then((data) => {
              console.log("After posting new data item", data.data);
              if (data.data.insertedId) {
                Swal.fire(
                  "Course Added!",
                  "Your course is pending!",
                  "success"
                );
                setLoading(false);
                reset();
              }
            });
        }
      });
  };
  if (loading) {
    return <Loader></Loader>;
  }
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
                  {errors.name && (
                    <span className="text-red-600">This field is required</span>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Course Cover Photo</span>
                  </label>
                  <input
                    type="file"
                    placeholder="cover photo"
                    className="file-input file-input-bordered w-full max-w-xs"
                    name="image"
                    {...register("image", { required: true })}
                  />
                  {errors.image && (
                    <span className="text-red-600">This field is required</span>
                  )}
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
                  {errors.instructor && (
                    <span className="text-red-600">This field is required</span>
                  )}
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
                  {errors.instructorMail && (
                    <span className="text-red-600">This field is required</span>
                  )}
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
                  {errors.seats && (
                    <span className="text-red-600">This field is required</span>
                  )}
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
                  {errors.price && (
                    <span className="text-red-600">This field is required</span>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Details</span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered h-24 md:row-span-2"
                    placeholder="Details"
                    {...register("details", { required: true })}
                  ></textarea>
                  {errors.details && (
                    <span className="text-red-600">This field is required</span>
                  )}
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
