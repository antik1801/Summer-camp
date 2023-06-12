import React from "react";
import { useEffect } from "react";
import useInstructorClasses from "../../../hooks/useInstructorClasses";

const InstructorClasses = () => {
  const [courses, refetch] = useInstructorClasses();
  console.log(courses);
  return (
    <div className="w-full">
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Course</th>
            <th>Status</th>
            <th>FeedBack</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {
            courses.map((course,index)=> <tr key={course._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src={course?.picture}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                </td>
                <td>
                    <div>
                      <div className="font-bold">{course?.course}</div>
                    </div>
                </td>
                <td>
                  <p className={`${course.status === 'approved' ? 'text-green-500' : course.status === 'pending' ? 'text-blue-500': 'text-red-500'} font-extrabold`}>{course?.status}</p>
                </td>
                <td>
                    <p className="font-semibold">
                    {course?.feedback ? course?.feedback : course?.status === 'pending' ? "waiting for response": "Amazing"}</p></td>
                <th>
                  <button className="btn btn-ghost btn-xs">details</button>
                </th>
              </tr>)
          }
         
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default InstructorClasses;
