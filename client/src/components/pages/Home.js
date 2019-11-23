import React from 'react';
import Courses from '../courses/Courses';
import CourseForm from '../courses/CourseForm';

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <p>Calculate your cumulative GPA, check your grades.</p>
      <div className='grid-2'>
        <div>
          <CourseForm />
        </div>
        <div>
          <Courses />
        </div>
      </div>
    </div>
  );
};

export default Home;
