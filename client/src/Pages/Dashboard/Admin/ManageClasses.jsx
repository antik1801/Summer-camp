import React from "react";
import usePendingClasses from "../../../hooks/usePendingClasses";
import { FaTrash,  } from 'react-icons/fa';
import Loader from "../../../components/Shared/Loader";
import Swal from "sweetalert2";

const ManageClasses = () => {
  const [pendingClasses,refetch,isLoading] = usePendingClasses();
//   console.log(pendingClasses);
    const handleReject = item =>{
        fetch(`https://medlife-server-navy.vercel.app/rejectedCourses/${item._id}`,{
            method: 'PATCH'
        })
        .then(res => res.json())
        .then(data =>{
            if (data.modifiedCount > 0) {
                refetch()
                Swal.fire("Rejected!", "You have rejected the course.", "error");
            }
           
        })
    }
    const handleApprovedClass = item =>{
        fetch(`https://medlife-server-navy.vercel.app/courses/${item._id}`,{
            method: 'PATCH'
        })
        .then(res => res.json())
        .then(data =>{
            if (data.modifiedCount > 0) {
                refetch()
                Swal.fire("Approved!", "You have approved the course.", "success");
            }
           
        })
    }
    const handleSendFeedBack = item =>{
        console.log(item)
    }
    if (isLoading) {
        return <Loader></Loader>
    }
  return (
    <div className="w-full">
      {" "}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Course</th>
              <th>Instructor</th>
              <th>Instructor mail</th>
              <th>Available seats</th>
              <th>Price</th>
              <th>Status</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {
                pendingClasses.map((classes,index)=>
                <tr key={classes._id}>
              <th>{index + 1}</th>
              <td>
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src={classes.picture}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                </div>
              </td>
              <td>
              <div className="font-bold">{classes.course}</div>
              </td>
              <td>{classes.instructor}</td>
              <td>{classes.instructor_email}</td>
              <td>{classes.seats}</td>
              <td>{classes.price}</td>
              <td>{classes.status}</td>
              <th className="flex flex-col gap-1">
                <button className="btn btn-ghost bg-green-500" onClick={()=>handleApprovedClass(classes)}>Approve</button>
                <button className="btn btn-ghost bg-red-500" onClick={()=>handleReject(classes)}><FaTrash></FaTrash></button>
                <button className="btn btn-ghost bg-blue-500" onClick={()=>handleSendFeedBack(classes)}>Feedback</button>
              </th>
            </tr>
                )
            }
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageClasses;
