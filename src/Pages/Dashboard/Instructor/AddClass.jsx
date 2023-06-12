import React, { useContext } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';

const AddClass = () => {
    const {user} = useContext(AuthContext);
    return (
        <div className='w-full'>
            <div className=" min-h-screen bg-base-200">
  <div className="">
    <div className="card w-full shadow-2xl bg-base-100">
  <h1 className="text-5xl font-bold my-6 text-center">Please add a class!</h1>
      <div className="card-body grid grid-cols-1 md:grid-cols-2">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Course Name</span>
          </label>
          <input type="text" placeholder="Course" className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Course Cover Photo</span>
          </label>
          <input type="text" placeholder="cover photo" className="input input-bordered" />
         
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Instructor</span>
          </label>
          <input type="text" defaultValue={user?.displayName} className="input input-bordered" readOnly/>
         
        </div> 
        <div className="form-control">
          <label className="label">
            <span className="label-text">Instructor Email</span>
          </label>
          <input type="text" defaultValue={user?.email} className="input input-bordered" readOnly/>
         
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Available Seat</span>
          </label>
          <input type="number" placeholder="seats" className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Price</span>
          </label>
          <input type="number" placeholder="price" className="input input-bordered" />
        </div>
      </div>
      <div className='text-center mb-10'>
      <button className='btn btn-primary'>ADD</button>
      </div>
    </div>
  </div>
</div>
        </div>
    );
};

export default AddClass;