import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import Courses from '../courses/Courses';
// import CourseForm from '../courses/CourseForm';
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
      <Link to='/results' className='btn btn-lg btn-primary my-2'>
        Calculate CGPA
      </Link>
    </div>
  );
};

export default Home;
