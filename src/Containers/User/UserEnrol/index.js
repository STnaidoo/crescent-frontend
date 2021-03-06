import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { MenuItem } from 'material-ui/Menu';
import Typography from 'material-ui/Typography';

import TextField from '../../../Components/TextField';
import Card from '../../../Components/Card';
import Select from '../../../Components/Select';
import Button from '../../../Components/Button';
import CourseActions from '../../../Actions/CourseActions';
import ClientActions from '../../../Actions/ClientActions';
import UserActions from '../../../Actions/UserActions';
import LinearProgress from '../../../Components/LinearProgress';

let validated = false;
const validate = () => {
  const errors = {};
  return errors;
};
const required = value => (value ? undefined : 'Required');
const number = value => (value && isNaN(Number(value)) ? 'Must be a number' : undefined);

class EnrolmentCreate extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.newCourseId) {
      const newCourseId = this.props.newCourseId;
      this.props.initialize({ course: newCourseId });
    }
    this.props.dispatch(UserActions.getAll());
    this.props.dispatch(CourseActions.getAll());
    this.state = {
      value: this.props.value,
      data: '',
      userId: undefined,
    };
  }

  submit = (values) => {
    if (this.state.selectedDate ? (new Date(this.state.selectedDate)) < (new Date()) : true) { return; }
    const enrolment = Object.assign({}, values);
    this.props.dispatch(UserActions.enrol(enrolment));
  };

  handleSubmitClicked = () => {
    validated = true;
  }

  loadCourses = (values) => {
    this.setState({ userId: values.target.value });
    const user = this.props.users.find(x => x.id === values.target.value);
    this.props.dispatch(CourseActions.loadCoursesByClientSubscriptions(user.clientId));
    this.props.dispatch(ClientActions.getUserEnrolments(user.clientId));
  };

  handleDateChange = (values) => {
    this.setState({ selectedDate: values.target.value });
  };

  enrolAll(userId) {
    this.props.dispatch(UserActions.enrolAll(userId));
  }

  render() {
    const { selectedDate } = this.state;
    const val = this.state.value || null;

    const isValidModule = (module =>
      (Array.isArray(module.moduleMaterialIds) ? module.moduleMaterialIds.length : false)
    );
    const isValidCourse = ((course) => {
      const courseWithModules = (Array.isArray(this.props.courses) ? this.props.courses : [])
        .find(c => c.id === course.id);
      const modules = courseWithModules ? courseWithModules.modules : null;
      return Array.isArray(modules) ? modules.filter(isValidModule).length : false;
    });

    const isUnenrolledCourse = ((course) => {
      if (Array.isArray(this.props.userEnrolments)) {
        const length = this.props.userEnrolments
          .filter(userEnrolment => this.state.userId == userEnrolment.userId)
          .filter(userEnrolment => course.id == userEnrolment.courseId)
          .length;
        return length == 0;
      }
      return false;
    });

    const courses = (Array.isArray(this.props.subscribedCourses) ? this.props.subscribedCourses : [])
      .filter(isValidCourse)
      .filter(isUnenrolledCourse);

    const courseSelect = value => (value ? courses.find(course => course.id == value) ? undefined : 'required' : undefined);

    return (
      <Card width="600px" title="Enrol A User In A Course">
        <form
          onSubmit={this.props.handleSubmit(this.submit)}
          autoComplete="off"
          className="centerForm"
        >
          <div>
            <div>
              {this.props.users_loading ? (
                <div>
                  <LinearProgress color="secondary" />
                  Loading Users
                </div>
              ) : (
                <div>
                  <Field
                    name="user"
                    onChange={this.loadCourses}
                    label="User"
                    component={Select}
                    validate={[required]}
                  >
                    {(Array.isArray(this.props.users) ? this.props.users : [])
                    .filter(user => (this.props.user.role.name === 'Admin' || this.props.user.clientId === user.clientId))
                    .map(user => (
                      <MenuItem value={user.id} key={user.id}>
                        {user.name}
                      </MenuItem>
                    ))}
                  </Field>
                </div>
              )}
              {this.props.subscribedCourses_loading || this.props.userEnrolments_loading ? (
                <div>
                  <LinearProgress color="secondary" />
                  Loading Courses...
                </div>
              ) : this.props.subscribedCourses ? (
                <Field
                  name="course"
                  label="Course"
                  component={Select}
                  validate={[required, courseSelect]}
                >
                  {courses.length ?
                  courses.map(course => (
                    <MenuItem value={course.id} key={course.id}>
                      {course.name}
                    </MenuItem>
                  )) : (
                    <MenuItem disabled>
                      No Course
                    </MenuItem>
                  )}
                </Field>
              ) : (
                <div>
                  <Typography variant="caption" component="p">
                    Choose a user to load subscribed courses
                  </Typography>
                </div>
              )}
              <div>
                <TextField
                  name="deadline"
                  label="Deadline"
                  onChange={this.handleDateChange}
                  margin="normal"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={validated && (selectedDate ? (new Date(selectedDate)) < (new Date()) : true)}
                />
                {validated ? (
                  <Typography variant="caption" component="p" style={{ color: '#f00' }}>
                    { selectedDate ? (new Date(selectedDate)) < (new Date()) ? 'Must be a future day' : undefined : 'Required' }
                  </Typography>
                ) : ''}
              </div>
            </div>
          </div>
          {this.props.user_enrolling ? (
            <div style={{ width: '400px' }}>
              <LinearProgress color="secondary" />
              Enrolling User
            </div>
          ) : (
            <div className="formAlignRight">
              <Button
                onClick={this.handleSubmitClicked}
                className="buttonFormat"
                variant="raised"
                color="primary"
                type="submit"
              >
                Enrol User
              </Button>
            </div>
          )}
          <div className="formAlignRight">
            <Button
              onClick={this.enrolAll(this.props.user.id)}
              className="buttonFormat"
              variant="raised"
              color="primary"
            >
              Enrol In All Courses
            </Button>
          </div>
        </form>
      </Card>
    );
  }
}

EnrolmentCreate.propTypes = {
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  courses: PropTypes.array,
  courses_loading: PropTypes.bool,
  subscribedCourses: PropTypes.array,
  subscribedCourses_loading: PropTypes.bool,
  newCourseId: PropTypes.number,
  userEnrolments: PropTypes.array,
  userEnrolments_loading: PropTypes.bool,
  users: PropTypes.array,
  users_loading: PropTypes.bool,
  user: PropTypes.object,
  user_enrolling: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    courses: state.CourseReducer.courses,
    courses_loading: state.CourseReducer.loading,
    subscribedCourses: state.CourseReducer.subscribedCourses,
    subscribedCourses_loading: state.CourseReducer.subscribedCourses_loading,
    newCourseId: state.CourseReducer.newCourseId,
    userEnrolments: state.ClientReducer.userEnrolments,
    userEnrolments_loading: state.ClientReducer.loading,
    users: state.UserReducer.users,
    users_loading: state.UserReducer.loading,
    user: state.LoginReducer.user,
    user_enrolling: state.UserReducer.enrolling,
  };
}

const withForm = reduxForm(
  {
    form: 'enrolmentCreate',
    validate,
  },
  EnrolmentCreate,
);

export default compose(
  connect(mapStateToProps),
  withForm,
)(EnrolmentCreate);
