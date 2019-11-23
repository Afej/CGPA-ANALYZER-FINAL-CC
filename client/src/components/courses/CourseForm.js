import React, { useState, useContext } from 'react';
import ResultContext from '../../context/result/resultContext';

const CourseForm = () => {
  const resultContext = useContext(ResultContext);

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
    resultContext.addCourse(course);
    setCourse({
      courseName: '',
      unit: '',
      grade: '',
      score: ''
    });
  };

  return (
    <form onSubmit={onSubmit} className='py-2'>
      <h2>Add Course</h2>
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
        <input type='submit' value='Add Course' className='btn btn-primary' />
      </div>
    </form>
  );
};

export default CourseForm;
