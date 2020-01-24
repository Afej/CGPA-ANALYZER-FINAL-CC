import React, { Fragment, useContext, useEffect } from 'react';
import ResultContext from '../../context/result/resultContext';
import CourseItem from './CourseItem';
import Spinner from '../layouts/Spinner';

const Courses = () => {
  const resultContext = useContext(ResultContext);

  const { courses, getCourses, loading, getCgpa, cgpa } = resultContext;

  useEffect(() => {
    getCourses();
    // eslint-disable-next-line
  }, []);

  const calculateCgpa = e => {
    e.preventDefault();

    const courseUnits = [];
    const sumUnitxGrade = [];

    let result;

    let gradePoint;

    courses.forEach(course => {
      courseUnits.push(course.unit);

      switch (course.grade) {
        case 'a':
          gradePoint = 5;
          break;

        case 'b':
          gradePoint = 4;
          break;

        case 'c':
          gradePoint = 3;
          break;

        case 'd':
          gradePoint = 1;
          break;

        case 'f':
          gradePoint = 0;
          break;

        default:
          break;
      }

      sumUnitxGrade.push(course.unit * gradePoint);
    });

    let totalUnits = courseUnits.reduce((acc, cv) => acc + cv, 0);
    let totalPoints = sumUnitxGrade.reduce((acc, cv) => acc + cv, 0);

    result = (totalPoints / totalUnits).toFixed(3);

    console.log(courseUnits);
    console.log(totalUnits);
    console.log(sumUnitxGrade);
    console.log(totalPoints);
    console.log(result);

    getCgpa(result);
  };

  return (
    <Fragment>
      {courses !== null && !loading ? (
        courses.map(course => <CourseItem key={course._id} course={course} />)
      ) : (
        <Spinner />
      )}

      <div className='text-center'>
        <input
          type='submit'
          value='Calculate CGPA'
          className='btn btn-primary'
          onClick={calculateCgpa}
        />
      </div>

      <p className='text-dark'>CGPA: {cgpa}</p>
    </Fragment>
  );
};

export default Courses;
