import React from "react";
import useCarts from "../../../hooks/useCarts";
import { FaTrash, FaWallet } from "react-icons/fa";
import CartItems from "./cartItems";
import Loader from "../../../components/Shared/Loader";
import Swal from "sweetalert2";

const Myclasses = () => {
  const [cart, isLoading, refetch] = useCarts();
//   console.log(cart)
    const totalPrice = parseFloat(cart.reduce((sum,item)=>sum+item.price,0)).toFixed(2)
    const totalPriceInFloat = parseFloat(totalPrice).toFixed(2);
  const handlePay = item =>{
    console.log(item.price)
  }
  const handleDelete = item =>{
    console.log(item._id)
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
         fetch(`https://medlife-server-navy.vercel.app/carts/${item._id}`,{
            method:'DELETE',
         })
         .then(res=>res.json())
         .then(data=>{
            if (data.deletedCount>0) {
                refetch();
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                  )
            }
         })
        }
      })
  }
  if (isLoading) {
    return <Loader></Loader>
  }
  return (
    <div className="w-full">
        <div className="flex justify-between">
            <p className="text-3xl font-semibold">Total Price: {totalPriceInFloat}</p>
        </div>
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
                  <button className="btn btn-ghost" onClick={()=>handleDelete(item)}> <FaTrash size={25} className="text-red-500"/> </button>
                </th>
                <th>
                  <button className="btn btn-ghost" onClick={()=>handlePay(item)}> <FaWallet size={25} className="text-green-400" ></FaWallet> </button>
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
