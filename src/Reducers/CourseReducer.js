import CourseConstants from "../Constants/CourseConstants";

function CourseReducer(state = {}, action) {
  switch (action.type) {
    case CourseConstants.CREATE_REQUEST:
      return {
        courses: action.courseName
      };
    case CourseConstants.CREATE_SUCCESS:
      return {
        courses: action.courseName
      };
    case CourseConstants.CREATE_FAILURE:
      return {};
    case CourseConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case CourseConstants.GETALL_SUCCESS:
      return Object.assign({}, state, {
        courses: action.courses
      });
    case CourseConstants.GETALL_FAILURE:
      return {
        courses: {}
      };
    default:
      return state;
  }
}

export default CourseReducer;