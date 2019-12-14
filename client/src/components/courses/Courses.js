import React, { Fragment, useContext, useEffect } from 'react';
import ResultContext from '../../context/result/resultContext';
import CourseItem from './CourseItem';
import Spinner from '../layouts/Spinner';

const Courses = () => {
  const resultContext = useContext(ResultContext);

  const { courses, getCourses, loading } = resultContext;

  useEffect(() => {
    getCourses();
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      {courses !== null && !loading ? (
        courses.map(course => <CourseItem key={course._id} course={course} />)
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Courses;
