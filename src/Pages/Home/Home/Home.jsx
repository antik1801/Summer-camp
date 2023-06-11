import React from 'react';
import Banner from '../Banner/Banner';
import SectionTitle from '../../Shared/SectionTitle';
import PopularCourses from '../PopularCourse/PopularCourses';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <SectionTitle heading="All Popular courser" subheading="Course"></SectionTitle>
            <div className='w-full mx-auto'>
            <PopularCourses></PopularCourses>
            </div>
        </div>
    );
};

export default Home;