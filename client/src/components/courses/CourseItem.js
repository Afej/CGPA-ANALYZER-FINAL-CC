import React, { useContext } from 'react';
import ResultContext from '../../context/result/resultContext';

const CourseItem = ({ course }) => {
  const resultContext = useContext(ResultContext);

  const { deleteCourse, editCourse } = resultContext;
  const { id, courseName, grade, unit, score } = course;

  const onDelete = () => {
    deleteCourse(id);
  };

  const onEdit = () => {
    editCourse(id);
  };

  return (
    <div className='card bg-light'>
      <div className='grid-2'>
        <div style={{ borderRight: '2px solid #333333 ' }}>
          <h3>Course : {courseName}</h3>
          <h3>Grade : {grade}</h3>
        </div>
        <div>
          <h3>Unit : {unit}</h3>
          <h3>Score : {score}</h3>
        </div>
      </div>
      <p className='text-right'>
        <button className='btn btn-dark btn-sm' onClick={onEdit}>
          <i class='fas fa-pen-fancy'></i>
        </button>
        <button className='btn btn-danger btn-sm' onClick={onDelete}>
          <i class='fas fa-trash-alt'></i>
        </button>
      </p>
    </div>
  );
};

export default CourseItem;
