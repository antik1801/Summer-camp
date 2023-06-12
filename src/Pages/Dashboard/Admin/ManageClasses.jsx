import React from "react";
import usePendingClasses from "../../../hooks/usePendingClasses";
import { FaTrash,  } from 'react-icons/fa';

const ManageClasses = () => {
  const [pendingClasses,refetch] = usePendingClasses();
//   console.log(pendingClasses);
    const handleDelete = item =>{
        console.log(item)
    }
    const handleApprovedClass = item =>{
        console.log(item)
    }
    const handleSendFeedBack = item =>{
        console.log(item)
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
                <tr>
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
                <button className="btn btn-ghost bg-green-500" onClick={()=>handleApprovedClass(classes)}>Accept</button>
                <button className="btn btn-ghost bg-red-500" onClick={()=>handleDelete(classes)}><FaTrash></FaTrash></button>
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
