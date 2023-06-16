import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({content, background, link}) => {
    return (
      <Link to={`/${link}`}><button className={`btn btn-primary`}>{content}</button></Link>
    );
};

export default Button;