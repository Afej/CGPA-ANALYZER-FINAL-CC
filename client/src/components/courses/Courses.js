import React, { Fragment, useContext } from 'react';
import ResultContext from '../../context/result/resultContext';
import CourseItem from './CourseItem';

const Courses = () => {
  const resultContext = useContext(ResultContext);

  const { courses } = resultContext;
  return (
    <Fragment>
      {courses.map(course => (
        <CourseItem key={course.id} course={course}></CourseItem>
      ))}
    </Fragment>
  );
};

export default Courses;
