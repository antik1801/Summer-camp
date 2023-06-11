import React, { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { FaUserAlt } from 'react-icons/fa';

const Avaratr = ({img,title}) => {
  const {user} = useContext(AuthContext)
  return (
    <div className="avatar offline">
      <div className="w-12 rounded-full">
        <img referrerPolicy="no-referrer" src={user?.photoURL ? user?.photoURL : <FaUserAlt size={25} />} title={title}/>
      </div>
    </div>
  );
};

export default Avaratr;
