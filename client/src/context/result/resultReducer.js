import { ADD_COURSE, DELETE_COURSE, GET_COURSE, UPDATE_COURSE } from '../types';

export default (state, action) => {
  switch (action.type) {
    case ADD_COURSE:
      return {
        ...state,
        courses: [...state.courses, action.payload]
      };
    case DELETE_COURSE:
      return {
        ...state,
        courses: state.courses.filter(course => course.id !== action.payload)
      };
    default:
      return state;
  }
};
