import React from "react";
import usePaymentHistory from "../../../hooks/usePaymentHistory";

const MyPaymentHistory = () => {
  const [payments, refetch, isLoading] = usePaymentHistory();
  console.log(payments);
  return (
    <div className="w-full">
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>
              image
            </th>
            <th>Course</th>
            <th>Instructor</th>
            <th>email</th>
            <th>Payment Date</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {
            payments.map(payment=><tr key={payment._id}>
                <th>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src={payment.picture}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                </th>
                <td>
                  <div className="font-bold">{payment.course}</div>
                </td>
                <td>{payment.instructor}</td>
                <td>{payment.email}</td>
                <th>
                  {payment.paymentDate}
                </th>
              </tr>)
          }
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default MyPaymentHistory;
