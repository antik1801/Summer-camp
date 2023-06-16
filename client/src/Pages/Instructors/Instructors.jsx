import React, { useEffect, useState } from "react";
import useUsers from "../../hooks/useUsers";

const Instructors = () => {
  const [instructors, setInstructors] = useState([]);
  useEffect(() => {
    fetch("https://medlife-server-navy.vercel.app/allInstructors")
      .then((res) => res.json())
      .then((data) => {
        setInstructors(data);
      });
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 my-10">
      {instructors.map((instructor) => (
       <div key={instructor._id} className="card w-96 bg-base-100 shadow-xl">
       <figure className="px-10 pt-10">
         <img src={instructor.photo} alt="Shoes" className="rounded-xl  max-h-[220px]" />
       </figure>
       <div className="card-body items-center text-center">
         <h2 className="card-title">{instructor.name}</h2>
         <p>{instructor.email}</p>
       </div>
     </div>
      ))}
    </div>
  );
};

export default Instructors;
