import React, { useState, useContext, useEffect } from 'react';
import ResultContext from '../../context/result/resultContext';
import AlertContext from '../../context/alert/alertContext';

const CourseForm = () => {
  const resultContext = useContext(ResultContext);
  const alertContext = useContext(AlertContext);

  const { setAlert } = alertContext;

  const {
    addCourse,
    current,
    clearCurrentCourse,
    updateCourse
  } = resultContext;

  useEffect(() => {
    if (current !== null) {
      setCourse(current);
    } else {
      setCourse({
        courseName: '',
        unit: '',
        grade: '',
        score: ''
      });
    }
  }, [resultContext, current]);

  const [course, setCourse] = useState({
    courseName: '',
    unit: '',
    grade: '',
    score: ''
  });

  const { courseName, unit, grade, score } = course;

  const onChange = e =>
    setCourse({
      ...course,
      [e.target.name]: e.target.value
    });

  const onSubmit = e => {
    e.preventDefault();
    // switch (course.score) {
    //   case course.score >= '70' && course.score <= '100':
    //     console.log('grade is a');
    //     break;

    //   case course.score >= 60 && course.score <= 69:
    //     console.log('grade is B');
    //     break;

    //   case course.score >= 50 && course.score <= 59:
    //     console.log('Grade is c');
    //     break;

    //   case course.score >= 45 && course.score <= 49:
    //     console.log('grade is d');
    //     break;

    //   case course.score <= 44:
    //     console.log('sorry oh, na F');
    //     break;

    //   default:
    //     console.log('Invalid Score');
    //     break;
    // }

    if (current === null) {
      console.log(course.score);
      addCourse(course);
    } else {
      updateCourse(course);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrentCourse();
  };

  return (
    <form onSubmit={onSubmit} className='py-2'>
      <h2>{current ? 'Edit Course' : 'Add Course'}</h2>
      <div className='grid-2'>
        <input
          type='text'
          placeholder='Course Name'
          name='courseName'
          value={courseName}
          onChange={onChange}
        />
        <input
          type='text'
          placeholder='Unit'
          name='unit'
          value={unit}
          onChange={onChange}
        />
        <label htmlFor='grade'>
          Grade:
          <select name='grade' value={grade} onChange={onChange}>
            <option value=''>{''}</option>
            <option value='a'>A</option>
            <option value='b'>B</option>
            <option value='c'>C</option>
            <option value='d'>D</option>
            <option value='f'>F</option>
          </select>
        </label>

        <input
          type='text'
          placeholder='Score'
          name='score'
          value={score}
          onChange={onChange}
          style={{ paddingBottom: '12px' }}
        />
      </div>
      <div className='text-center'>
        <input
          type='submit'
          value={current ? 'Update Course' : 'Add Course'}
          className='btn btn-primary'
        />
      </div>

      {current && (
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default CourseForm;
