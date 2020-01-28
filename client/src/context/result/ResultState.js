import React, { useReducer } from 'react';
import axios from 'axios';
import ResultContext from './resultContext';
import resultReducer from './resultReducer';
import {
  ADD_COURSE,
  DELETE_COURSE,
  GET_COURSES,
  UPDATE_COURSE,
  COURSE_ERROR,
  SEMESTER_ERROR,
  SET_CURRENT_COURSE,
  CLEAR_CURRENT_COURSE,
  CLEAR_RESULTS,
  GET_RESULT,
  ADD_SEMESTER
} from '../types';

const ResultState = props => {
  const initialState = {
    courses: null,
    current: null,
    error: null,
    semester: null,
    totalUnits: null,
    cgpa: null
  };

  const [state, dispatch] = useReducer(resultReducer, initialState);

  //get courses
  const getCourses = async () => {
    try {
      const res = await axios.get('/api/courses');

      dispatch({ type: GET_COURSES, payload: res.data });
    } catch (err) {
      dispatch({
        type: COURSE_ERROR,
        payload: err.response.msg
      });
    }
  };

  // add course
  const addCourse = async course => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/courses', course, config);

      dispatch({ type: ADD_COURSE, payload: res.data });
    } catch (err) {
      dispatch({
        type: COURSE_ERROR,
        payload: err.response.msg
      });
    }
  };

  // add semestr
  const addSemester = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/semester', config);

      dispatch({ type: ADD_SEMESTER, payload: res.data });
    } catch (err) {
      dispatch({
        type: SEMESTER_ERROR,
        payload: err.response
      });
    }
  };

  // delete course
  const deleteCourse = async id => {
    try {
      await axios.delete(`/api/courses/${id}`);

      dispatch({ type: DELETE_COURSE, payload: id });
    } catch (err) {
      dispatch({
        type: COURSE_ERROR,
        payload: err.response.msg
      });
    }
  };

  // clear results
  const clearResults = () => {
    dispatch({ type: CLEAR_RESULTS });
  };

  // set current course
  const setCurrentCourse = course => {
    dispatch({ type: SET_CURRENT_COURSE, payload: course });
  };

  // clear current course
  const clearCurrentCourse = () => {
    dispatch({ type: CLEAR_CURRENT_COURSE });
  };

  // upadte course
  const updateCourse = async course => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put(`/api/courses/${course._id}`, course, config);

      dispatch({ type: UPDATE_COURSE, payload: res.data });
    } catch (err) {
      dispatch({
        type: COURSE_ERROR,
        payload: err.response.msg
      });
    }
  };

  // calculate result
  const setResult = (result, totalUnits) => {
    dispatch({
      type: GET_RESULT,
      payload: result,
      totalUnits
    });
  };

  return (
    <ResultContext.Provider
      value={{
        courses: state.courses,
        current: state.current,
        error: state.error,
        cgpa: state.cgpa,
        semester: state.semester,
        addCourse,
        deleteCourse,
        updateCourse,
        setCurrentCourse,
        clearCurrentCourse,
        getCourses,
        clearResults,
        setResult,
        addSemester
      }}
    >
      {props.children}
    </ResultContext.Provider>
  );
};

export default ResultState;
