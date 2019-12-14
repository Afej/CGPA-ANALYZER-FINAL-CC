import {
  ADD_COURSE,
  DELETE_COURSE,
  GET_COURSES,
  UPDATE_COURSE,
  SET_CURRENT_COURSE,
  CLEAR_CURRENT_COURSE,
  COURSE_ERROR,
  CLEAR_RESULTS
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_COURSES:
      return {
        ...state,
        courses: action.payload,
        loading: false
      };
    case ADD_COURSE:
      return {
        ...state,
        courses: [...state.courses, action.payload],
        loading: false
      };
    case DELETE_COURSE:
      return {
        ...state,
        courses: state.courses.filter(course => course._id !== action.payload),
        loading: false
      };
    case UPDATE_COURSE:
      return {
        ...state,
        courses: state.courses.map(course =>
          course._id === action.payload._id ? action.payload : course
        ),
        loading: false
      };
    case CLEAR_RESULTS:
      return {
        ...state,
        courses: null,
        error: null,
        current: null
      };
    case SET_CURRENT_COURSE:
      return {
        ...state,
        current: action.payload
      };
    case CLEAR_CURRENT_COURSE:
      return {
        ...state,
        current: null
      };
    case COURSE_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};