import React, { useContext, useEffect } from 'react';
import Courses from '../courses/Courses';
import CourseForm from '../courses/CourseForm';
import AuthContext from '../../context/auth/authContext';
import ResultContext from '../../context/result/resultContext';

const Semester = () => {
  const authContext = useContext(AuthContext);
  const resultContext = useContext(ResultContext);

  let { semester } = resultContext;

  semester = semester.length;

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='card bg-secondary'>
      <h1>Semester {semester} </h1>
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

export default Semester;
