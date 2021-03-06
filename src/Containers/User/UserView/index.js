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
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Tooltip from 'material-ui/Tooltip';
import { CircularProgress } from 'material-ui/Progress';

import history from '../../../Helpers/History';
import Card from '../../../Components/Card';
import UserActions from '../../../Actions/UserActions';
import IconButton from '../../../Styles/IconButton';
import CustomModal from '../../../Components/Modal/index';
import { StyledDelete } from '../../../Styles/Delete';
import { StyledEdit } from '../../../Styles/Edit';

class UserView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { obj: {} };
  }

  componentDidMount() {
    this.props.dispatch(UserActions.getAll());
  }

  handleDelete = (obj) => {
    this.setState({ obj });
    this.child.handleOpen();
    history.push('/loading');
  };

  confirmDelete = obj => () => {
    this.props.dispatch(UserActions.deleteUser(obj.id));
    this.child.handleClose();
  };

  handleEdit = (editObj) => {
    this.props.dispatch(UserActions.loadUser(editObj.id));
    history.push('/user/edit');
  };

  manipulateData = (users) => {
    const data = [];
    if (Array.isArray(users)) {
      users
        .filter(user => (!(user.role.name === 'Admin' && this.props.user.role.name === 'Client')))
        .forEach((user) => {
          const newUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            client: user.client.name,
            role: user.role.name,
          };
          data.push(newUser);
        });
    }
    return data;
  };

  render() {
    const users = this.manipulateData(this.props.users);
    const columns = [
      {
        Header: 'User',
        accessor: 'name',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Client',
        accessor: 'client',
      },
      {
        Header: 'Role',
        accessor: 'role',
      },
      {
        Header: 'Edit/Delete',
        accessor: 'edit/delete',
        Filter: <div />,
        Cell: row => (
          <div>
            <Tooltip id="tooltip-delete" title="Edit">
              <IconButton
                aria-label="Edit"
                onClick={() => this.handleEdit(row.original)}
              >
                <StyledEdit />
              </IconButton>
            </Tooltip>
            <Tooltip id="tooltip-delete" title="Delete">
              <IconButton
                aria-label="Delete"
                onClick={() => this.handleDelete(row.original)}
              >
                <StyledDelete />
              </IconButton>
            </Tooltip>
          </div>
        ),
      },
    ];
    return (
      <div>
        <Card width="800px" title="User List">
          {this.props.users_loading ? (
            <div className="center">
              <CircularProgress color="secondary" />
            </div>
          ) : (
            <div>
              <ReactTable
                columns={columns}
                data={users}
                filterable
                defaultPageSize={10}
                className="-striped -highlight"
              />
            </div>
          )}
        </Card>
        <CustomModal
          obj={this.state && this.state.obj}
          /* eslint-disable no-return-assign */
          onRef={ref => (this.child = ref)}
          onClick={this.confirmDelete(this.state.obj)}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.LoginReducer.user,
  users: state.UserReducer.users,
  users_loading: state.UserReducer.loading,
});

const withForm = reduxForm(
  {
    form: 'userView',
  },
  UserView,
);

UserView.propTypes = {
  dispatch: PropTypes.func,
  user: PropTypes.object,
  users: PropTypes.array,
  users_loading: PropTypes.bool,
};

export default compose(
  connect(mapStateToProps),
  withForm,
)(UserView);
