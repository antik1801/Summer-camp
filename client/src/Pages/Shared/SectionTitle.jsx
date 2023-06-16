import React from 'react';

const SectionTitle = ({heading,subheading}) => {
    return (
        <div className='text-center'>
            <p className='text-yellow-500'>----{subheading}----</p>
            <h3 className='text-3xl uppercase mb-5 border-y-4 py-4'>{heading}</h3>
        </div>
    );
};

export default SectionTitle;