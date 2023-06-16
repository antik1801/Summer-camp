import moment from 'moment';
import React from 'react';
import usePaymentHistory from '../../../hooks/usePaymentHistory';
import usePopularCourse from '../../../hooks/usePopularCourse';

const MyEnrolledClasses = () => {
    const [payments, refetch, isLoading] = usePaymentHistory();
    const [courses,loading] = usePopularCourse()
    

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
                  </tr>)
              }
            </tbody>
          </table>
        </div>
        </div>
    );
};

export default MyEnrolledClasses;