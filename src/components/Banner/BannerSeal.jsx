import React from 'react';

const BannerSeal = ({headings, subheadings}) => {
    return (
        <div>
            <h1 className='text-5xl font-bold  mb-5'>{headings}</h1>
            <h2 className='text-3xl font-semibold'>{subheadings}</h2>
        </div>
    );
};

export default BannerSeal;