import React from 'react';

const CartItems = ({item, index}) => {
    return (
        <tr>
        <th></th>
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
    );
};

export default CartItems;