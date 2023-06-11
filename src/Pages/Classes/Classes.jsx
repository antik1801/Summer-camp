import React, { useContext, useState } from "react";
import usePopularCourse from "../../hooks/usePopularCourse";
import Button from "../../components/Shared/Button";
import Loader from "../../components/Shared/Loader";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";

const Classes = () => {
  const [courses, loading] = usePopularCourse();
  const { user } = useContext(AuthContext);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const approvedCourses = courses.filter((item) => item.status == "approved");
  console.log(approvedCourses);
  if (loading) {
    return <Loader></Loader>;
  }
  const handleAddToCart = (item) => {
    console.log(item);
    setBtnDisabled(true);
    if (user && user.email) {
      const bookedCourse = {
        courseId: item._id,
        course: item.course,
        istructor: item.instructor,
        picture: item.picture,
        price: item.price,
        status: item.status,
        email: user?.email,
        paymentStatus: "pending",
      };
      fetch(`https://medlife-server-navy.vercel.app/carts`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(bookedCourse),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          Swal.fire(
            "Added!",
            "Course successfully added to the cart!",
            "success"
          );
        });
    }
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-3">
      {approvedCourses.map((course) => (
        <div
          key={course._id}
          className={`card w-96 bg-base-100 shadow-xl bottom-4 mb-4 mt-2 ${
            course?.seat === course?.students
              ? "border-red-600"
              : "border-black"
          }`}
        >
          <figure className="px-10 pt-10">
            <img src={course?.picture} alt="Shoes" className="rounded-xl" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">{course?.course}</h2>
            <p>{course?.instructor}</p>
            <div className="flex gap-10">
              <p>Students: {course?.students}</p>
              <p>Seats: {course?.seats}</p>
            </div>
            <p className="text-xl">Price: {course.price}</p>
            <div className="card-actions">
              <button
                className="btn btn-primary"
                onClick={() => handleAddToCart(course)}
              >
                Book now
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Classes;
