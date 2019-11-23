import React, { useReducer } from 'react';
import uuid from 'uuid';
import ResultContext from './resultContext';
import resultReducer from './resultReducer';
import { ADD_COURSE, DELETE_COURSE, GET_COURSE, UPDATE_COURSE } from '../types';

const ResultState = props => {
  const initialState = {
    courses: [
      {
        id: 1,
        courseName: 'Maths',
        grade: 'a',
        unit: '4',
        score: '70'
      },
      {
        id: 2,
        courseName: 'English',
        grade: 'c',
        unit: '3',
        score: '57'
      },
      {
        id: 3,
        courseName: 'Physics',
        grade: 'a',
        unit: '4',
        score: '85'
      },
      {
        id: 4,
        courseName: 'chemistry',
        grade: 'b',
        unit: '4',
        score: '65'
      }
    ]
  };

  const [state, dispatch] = useReducer(resultReducer, initialState);

  //actions

  //add course
  const addCourse = course => {
    course.id = uuid.v4();
    dispatch({ type: ADD_COURSE, payload: course });
  };

  // delete course
  const deleteCourse = id => {
    dispatch({ type: DELETE_COURSE, payload: id });
  };

  return (
    <ResultContext.Provider
      value={{
        courses: state.courses,
        addCourse,
        deleteCourse
      }}
    >
      {props.children}
    </ResultContext.Provider>
  );
};

export default ResultState;
