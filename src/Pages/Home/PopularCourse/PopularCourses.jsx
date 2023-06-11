import React, { useEffect } from "react";
import usePopularCourse from "../../../hooks/usePopularCourse";
import Button from "../../../components/Shared/Button";
import Loader from "../../../components/Shared/Loader";
// parent Home.jsx
const PopularCourses = () => {
  const [courses,loading] = usePopularCourse();
  if (loading) {
    return <Loader></Loader>
  }
  const approvedCourses = courses.filter(item => item.status == 'approved')
  const sortedPopularCourse = approvedCourses.sort((a,b)=> b.students-a.students)
  console.log(sortedPopularCourse,approvedCourses)
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 justify-center mx-auto">
      {sortedPopularCourse.slice(0,6).map((course) => (
        <div key={course._id} className={`card w-96 bg-base-100 shadow-xl bottom-4 mb-4 mt-2 ${course?.seat === course?.students ? 'border-red-600' : 'border-black'}`}>
          <figure className="px-10 pt-10">
            <img
              src={course?.picture}
              alt="Shoes"
              className="rounded-xl"
            />
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
              <Button content="Buy now" link="/all classes"></Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PopularCourses;
