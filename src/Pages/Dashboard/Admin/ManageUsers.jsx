import React, { useContext, useState } from "react";
import useUsers from "../../../hooks/useUsers";
import { AuthContext } from "../../../providers/AuthProvider";
import { FaTrash } from "react-icons/fa";
import Loader from "../../../components/Shared/Loader";
import Swal from "sweetalert2";

const ManageUsers = () => {
  //   const { user } = useContext(AuthContext);
  
  const [users, refetch, isLoading] = useUsers();
  const [adminDisabled, setAdminDisabled] = useState(false);
  const [instructorDisabled, setInstructorDisabled] = useState(false);

  const handleDelete = (user) => {
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
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            refetch();
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
          });
      }
    });
  };
  const handleUpdateAdmin = (user) => {
    setAdminDisabled(true);
    setInstructorDisabled(false);
    Swal.fire({
      title: "Are you sure?",
      text: "You want this person make admin?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Make Admin!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://medlife-server-navy.vercel.app/users/admin/${user._id}`,
          {
            method: "PATCH",
          }
        )
          .then((res) => res.json())
          .then((data) => {
            refetch()
            if (data.modifiedCount > 0) {
              Swal.fire("Admin!", "User make admin successfull.", "success");
            }
          });
      }
    });
  };
  const handleUpdateInstructor = (user) => {
    setInstructorDisabled(true);
    setAdminDisabled(false);
    Swal.fire({
      title: "Are you sure?",
      text: "You want this person make instructor?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Make Instructor!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://medlife-server-navy.vercel.app/users/instructor/${user._id}`,
          {
            method: "PATCH",
          }
        )
          .then((res) => res.json())
          .then((data) => {
            refetch()
            if (data.modifiedCount > 0) {
              Swal.fire("Instructor!", "User make instructor successfull.", "success");
            }
          });
      }
    });
  };
  const handleUpdateUser = user =>{
    Swal.fire({
      title: "Are you sure?",
      text: "You want this person make user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Make User!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://medlife-server-navy.vercel.app/users/user/${user._id}`,
          {
            method: "PATCH",
          }
        )
          .then((res) => res.json())
          .then((data) => {
            refetch()
            if (data.modifiedCount > 0) {
              Swal.fire("User!", "Admin make user successfull.", "success");
            }
          });
      }
    });
  }

  if (isLoading) {
    return <Loader></Loader>;
  }
  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <p className="text-2xl font-semibold text-center">
          Total Users: +{users.length}
        </p>
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
                  <div
                    className={`font-bold ${
                      user.role === "admin"
                        ? "text-green-400"
                        : user.role === "instructor"
                        ? "text-orange-400"
                        : "text-blue-400"
                    }`}
                  >
                    {user.role}
                  </div>
                </td>
                <th className="flex flex-col gap-2">
                  <button
                    className="btn btn-ghost bg-green-600"
                    onClick={() => handleUpdateAdmin(user)}
                    disabled={user?.role == "admin"}
                  >
                    Admin
                  </button>
                  <button
                    className="btn btn-ghost bg-orange-500"
                    onClick={() => handleUpdateInstructor(user)}
                    disabled={user?.role == "instructor"}
                  >
                    Instructor
                  </button>
                  <button
                    className="btn btn-ghost bg-blue-400"
                    onClick={() => handleUpdateUser(user)}
                    disabled={user?.role == "user"}
                  >
                    User
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
