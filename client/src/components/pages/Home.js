import React, { useContext, useEffect } from 'react';
import Courses from '../courses/Courses';
import CourseForm from '../courses/CourseForm';
import AuthContext from '../../context/auth/authContext';

const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);
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
