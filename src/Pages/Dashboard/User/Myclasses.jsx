import React from "react";
import useCarts from "../../../hooks/useCarts";
import { FaTrash, FaWallet } from "react-icons/fa";

const Myclasses = () => {
  const [cart, isLoading, refetch] = useCarts();
  console.log(cart)
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
              <th>Price</th>
              <th>Instructor</th>
              <th>Delete</th>
              <th>Pay</th>
            </tr>
          </thead>
          <tbody>
           {
            cart.map((item,index)=>
                <tr key={item._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src={item.picture}
                        alt="....."
                      />
                    </div>
                  </div>
                </td>
                <td>
                  <div className="flex items-center space-x-3">
  
                      <div className="font-bold">{item.course}</div>
  
                  </div>
                </td>
                <td>
                  <div className="font-bold">{item.price}</div>
                </td>
                <td>{item.istructor}</td>
                <th>
                  <button className="btn btn-ghost"> <FaTrash size={25} className="text-red-500"/> </button>
                </th>
                <th>
                  <button className="btn btn-ghost"> <FaWallet size={25} className="text-green-400"></FaWallet> </button>
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

export default Myclasses;
