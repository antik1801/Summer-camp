import React, { useContext, useState } from "react";
import useUsers from "../../../hooks/useUsers";
import { AuthContext } from "../../../providers/AuthProvider";
import { FaTrash } from "react-icons/fa";
import Loader from "../../../components/Shared/Loader";
import Swal from "sweetalert2";

const ManageUsers = () => {
  //   const { user } = useContext(AuthContext);
  //   console.log(user);
  const [users, refetch, isLoading] = useUsers();
  const [adminDisabled,setAdminDisabled] = useState(false)
  const [instructorDisabled,setInstructorDisabled] = useState(false)
  //   console.log(users);

  const handleDelete = (user) => {
    console.log(user);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://medlife-server-navy.vercel.app/users/${user._id}`, {
            method: 'DELETE'
        })
          .then((res) => res.json())
          .then((data) => {
            refetch();
            console.log(data);
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
          });
      }
    });
  };
  const handleUpdateAdmin = user =>{
    setAdminDisabled(true);
    setInstructorDisabled(false);
    console.log(user)
  }
  const handleUpdateInstructor = user =>{
    setInstructorDisabled(true);
    setAdminDisabled(false);
    console.log(user)

  }

  if (isLoading) {
    return <Loader></Loader>;
  }
  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <th>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src={user.photo}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                </th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="font-bold">{user.name}</div>
                  </div>
                </td>
                <td>
                  <div className="font-bold">{user.email}</div>
                </td>
                <td>
                  <div className={`font-bold ${user.role === 'admin' ? 'text-green-400' : user.role === 'instructor' ? 'text-orange-400' : 'text-blue-400'}`}>{user.role}</div>
                </td>
                <th className="flex flex-col gap-2">
                  <button className="btn btn-ghost bg-green-600" onClick={()=>handleUpdateAdmin(user)} disabled={adminDisabled}>Admin</button>
                  <button className="btn btn-ghost bg-orange-500" onClick={()=>handleUpdateInstructor(user)} disabled={instructorDisabled}>
                    Instructor
                  </button>
                </th>
                <th>
                  <button
                    className="btn btn-ghost"
                    onClick={() => handleDelete(user)}
                  >
                    {" "}
                    <FaTrash size={30} className="text-red-500" />{" "}
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
