import UserConstants from '../Constants/UserConstants';
import AlertConstants from '../Constants/AlertConstants';
import UserService from '../Services/UserService';
import AlertActions from './AlertActions';
import history from '../Helpers/History';
import ROUTES from '../Routers/Routes';

function login(username, password) {
  function request(user) {
    return { type: UserConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: UserConstants.LOGIN_SUCCESS, user };
  }
  function failure() {
    return { type: UserConstants.LOGIN_FAILURE };
  }

  return (dispatch) => {
    dispatch(request({ username }));
    UserService.login(username, password).then(
      (user) => {
        dispatch(success(user.userVM));
        history.push(ROUTES.HOME);
      },
      (error) => {
        dispatch(failure());
        dispatch(AlertActions.error(error));
      },
    );
  };
}

function logout(dispatch) {
  function request() {
    return { type: UserConstants.LOGOUT };
  }
  dispatch(request());
  UserService.logout();
}

function close() {
  return { type: AlertConstants.CLEAR };
}

function register(user) {
  function request() {
    return { type: UserConstants.REGISTER_REQUEST, user };
  }
  function success() {
    return { type: UserConstants.REGISTER_SUCCESS, user };
  }
  function failure(error) {
    return { type: UserConstants.REGISTER_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request({ user }));

    UserService.register(user).then(
      () => {
        dispatch(success(user));
        history.push('/user/list');
        dispatch(AlertActions.success(`User ${user.name} created successfully.`));
      },
      (error) => {
        dispatch(failure(error));
        dispatch(AlertActions.error(error));
      },
    );
  };
}

function getAll() {
  function request() {
    return { type: UserConstants.GETALL_REQUEST };
  }
  function success(users) {
    return { type: UserConstants.GETALL_SUCCESS, users };
  }
  function failure(error) {
    return { type: UserConstants.GETALL_FAILURE, error };
  }
  return (dispatch) => {
    dispatch(request());

    UserService.getAll().then(
      users => dispatch(success(users)),
      error => dispatch(failure(error)),
    );
  };
}

function getAllRoles() {
  function request() {
    return { type: UserConstants.GET_ALL_ROLES_REQUEST };
  }
  function success(roles) {
    return { type: UserConstants.GET_ALL_ROLES_SUCCESS, roles };
  }
  function failure(error) {
    return { type: UserConstants.roles, error };
  }
  return (dispatch) => {
    dispatch(request());

    UserService.getAllRoles().then(
      roles => dispatch(success(roles)),
      error => dispatch(failure(error)),
    );
  };
}

function enrol(enrolment) {
  function request() {
    return { type: UserConstants.ENROL_REQUEST, enrolment };
  }
  function success() {
    return { type: UserConstants.ENROL_SUCCESS, enrolment };
  }
  function failure(error) {
    return { type: UserConstants.REGISTER_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request({ enrolment }));

    UserService.enrol(enrolment).then(
      () => {
        dispatch(success(enrolment));
        history.push(`/user/${enrolment.userId}/list`);
        dispatch(AlertActions.success('User enrolled successfully.'));
      },
      (error) => {
        dispatch(failure(error));
        dispatch(AlertActions.error(error));
      },
    );
  };
}

function loadUser(id) {
  function request() {
    return { type: UserConstants.GETUSER_REQUEST, id };
  }
  function success(user) {
    return { type: UserConstants.GETUSER_SUCCESS, user };
  }
  function failure(error) {
    return { type: UserConstants.GETUSER_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request(id));

    UserService.getById(id).then(
      (user) => {
        dispatch(success(user));
      },
      (error) => {
        dispatch(failure(id, error));
      },
    );
  };
}

// prefixed function name with underscore because delete is a reserved word in javascript
function deleteUser(id) {
  function request() {
    return { type: UserConstants.DELETE_REQUEST, id };
  }
  function success() {
    return { type: UserConstants.DELETE_SUCCESS, id };
  }
  function failure(error) {
    return { type: UserConstants.DELETE_FAILURE, id, error };
  }

  return (dispatch) => {
    dispatch(request(id));

    UserService.deleteUser(id).then(
      () => {
        dispatch(success(id));
      },
      (error) => {
        dispatch(failure(id, error));
      },
    );
  };
}

function editUser(values) {
  function success() {
    return { type: UserConstants.EDIT_USER_SUCCESS };
  }
  return (dispatch) => {
    UserService.editUser(values).then(
      () => {
        dispatch(success());
        history.push('/user/view');
        dispatch(AlertActions.success(`User ${values.name} edited.`));
      },
      (error) => {
        history.push('/user/view');
        dispatch(AlertActions.error(error));
      },
    );
  };
}

const UserActions = {
  login,
  logout,
  close,
  register,
  getAll,
  deleteUser,
  loadUser,
  enrol,
  getAllRoles,
  editUser,
};

export default UserActions;
