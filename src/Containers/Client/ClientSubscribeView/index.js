/**
 *
 * SubscriptionView
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Tooltip from 'material-ui/Tooltip';
import { CircularProgress } from 'material-ui/Progress';

import history from '../../../Helpers/History';
import Card from '../../../Components/Card';
import ClientActions from '../../../Actions/ClientActions';
import CourseActions from '../../../Actions/CourseActions';
import IconButton from '../../../Styles/IconButton';
import CustomModal from '../../../Components/Modal/index';
import { StyledDelete } from '../../../Styles/Delete';
import { StyledEdit } from '../../../Styles/Edit';

class SubscriptionView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { obj: {} };
    this.props.dispatch(CourseActions.loadCoursesByClientSubscriptions(props.user.clientId));
    this.props.dispatch(ClientActions.getUserEnrolments(this.props.user.clientId));

    this.manipulateData = this.manipulateData.bind(this);
  }

  
  manipulateData = () => {
    let {courses, userEnrolments} = this.props;
    var getEnrolmentsCount = courseId =>
      userEnrolments ? userEnrolments.filter(userEnrolment => userEnrolment.courseId == courseId).length : '';

    const data = [];
    if (courses) {
      courses
      .forEach((course) => {
        const row = {
          courseName: course.name,
          courseDescription: course.description,
          enrolmentsCount: getEnrolmentsCount(course.id),
          price: course.price,
        };
        data.push(row);
      });
    }
    return data;
  };

  render() {
    const columns = [
      {
        Header: 'Course Name',
        accessor: 'courseName',
      },
      {
        Header: 'Course Description',
        accessor: 'courseDescription',
      },
      {
        Header: 'Enrolments Count',
        accessor: 'enrolmentsCount',
      },
      {
        Header: 'Price',
        accessor: 'price',
      },
    ];
    return (
      <div>
        <Card width="800px" title="Client List">
          {!this.props.courses || this.props.courses_loading || this.props.userEnrolments_loading ? (
            <div className="center">
              <CircularProgress color="secondary" />
            </div>
          ) : (
            <div>
              <ReactTable
                columns={columns}
                data={this.manipulateData()}
                filterable
                defaultPageSize={10}
                className="-striped -highlight"
              />
            </div>
          )}
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  courses: state.CourseReducer.courses,
  courses_loading: state.CourseReducer.loading,
  userEnrolments: state.ClientReducer.userEnrolments,
  userEnrolments_loading: state.ClientReducer.loading,
  user: state.LoginReducer.user,
});

const withForm = reduxForm(
  {
    form: 'subscriptionView',
  },
  SubscriptionView,
);

SubscriptionView.propTypes = {
  dispatch: PropTypes.func,
  courses: PropTypes.array,
  courses_loading: PropTypes.bool,
  userEnrolments: PropTypes.array,
  userEnrolments_loading: PropTypes.bool,
  user: PropTypes.object,
};

export default compose(connect(mapStateToProps), withForm)(SubscriptionView);
