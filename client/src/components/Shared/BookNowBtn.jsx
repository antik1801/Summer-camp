import React, { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';

const BookNowBtn = () => {
    const {user} = useContext(AuthContext);
    return (
        <button className='btn'>Book now</button>
    );
};

export default BookNowBtn;