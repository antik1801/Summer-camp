import React from 'react';
import Banner from '../Banner/Banner';
import SectionTitle from '../../Shared/SectionTitle';
import PopularCourses from '../PopularCourse/PopularCourses';
import PopularInstructors from '../PopularInstructors/PopularInstructors';
import BannerHero from '../../../components/Shared/BannerHero';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            {/* <BannerHero></BannerHero> */}
            <SectionTitle heading="All Popular courser" subheading="Course"></SectionTitle>
            <div className='w-full mx-auto'>
            <PopularCourses></PopularCourses>
            <SectionTitle heading="All Popular Instructs" subheading="Instructors"></SectionTitle>
            <PopularInstructors></PopularInstructors>
            </div>
        </div>
    );
};

export default Home;