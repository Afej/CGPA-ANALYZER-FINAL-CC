import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import Courses from '../courses/Courses';
// import CourseForm from '../courses/CourseForm';
import Semester from './Semester';
import AuthContext from '../../context/auth/authContext';
import ResultContext from '../../context/result/resultContext';

const Result = () => {
  const authContext = useContext(AuthContext);
  const resultContext = useContext(ResultContext);

  const { semester, addSemester } = resultContext;

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  const newSemester = e => {
    e.preventDefault();
    addSemester();
  };

  return (
    <div>
      {semester ? (
        <Semester />
      ) : (
        <Link
          to='/semester'
          className='btn btn-lg btn-primary my-2'
          onClick={newSemester}
        >
          ADD SEMESTER
        </Link>
      )}
    </div>
  );
};

export default Result;
