import React, { useContext, useEffect } from 'react';
import Courses from '../courses/Courses';
import CourseForm from '../courses/CourseForm';
import AuthContext from '../../context/auth/authContext';
// import ResultContext from '../../context/result/resultContext';

const Result = () => {
  const authContext = useContext(AuthContext);
  // const resultContext = useContext(ResultContext);

  // const { semester } = resultContext;

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <h1>Semester One</h1>
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

export default Result;
