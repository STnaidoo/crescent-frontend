/**
 *
 * UserView
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';
import { CircularProgress } from 'material-ui/Progress';

import Card from '../../../Components/Card';
import Table from '../../../Components/Table';
import UserActions from '../../../Actions/UserActions';

const header = ['ID', 'Name', 'Description', 'View Course Details'];

class UserView extends React.Component {
  constructor(props) {
    super(props);
    this.props.dispatch(UserActions.loadUser(2));
  }

  manipulateData = (courses) => {
    const data = [];
    courses.forEach((course) => {
      const newCourse = {
        id: course.id,
        name: course.name,
        description: course.description,
      };
      data.push(newCourse);
    });
    return data;
  };

  render() {
    const { user } = this.props;
    return (
      <Card width="800px" title="My Course List">
        {user && Array.isArray(user.enrolledCourses) ? (
          <Table
            header={header}
            data={this.manipulateData(user.enrolledCourses)}
          />
        ) : (
          <div className="center">
            <CircularProgress color="secondary" />
          </div>
        )}
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  user: state.UserReducer.user,
});

const withForm = reduxForm(
  {
    form: 'userView',
  },
  UserView,
);

UserView.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func,
};

export default compose(connect(mapStateToProps), withForm)(UserView);
