import QuestionConstants from '../Constants/QuestionConstants';
import QuestionService from '../Services/QuestionService';
import AlertActions from './AlertActions';
import history from '../Helpers/History';

function create(question) {
  function request() {
    return { type: QuestionConstants.CREATE_REQUEST, question };
  }
  function success() {
    return { type: QuestionConstants.CREATE_SUCCESS, question };
  }
  function failure(error) {
    return { type: QuestionConstants.CREATE_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request({ question }));
    QuestionService.create(question).then(
      () => {
        dispatch(success(question));
        history.push('/question/create');
        dispatch(AlertActions.success('Question created.'));
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
    return { type: QuestionConstants.GETALL_REQUEST };
  }
  function success(questions) {
    return { type: QuestionConstants.GETALL_SUCCESS, questions };
  }
  function failure(error) {
    return { type: QuestionConstants.GETALL_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());

    QuestionService.getAll().then(
      questions => dispatch(success(questions)),
      (error) => {
        dispatch(failure(error));
        dispatch(AlertActions.error(error));
      },
    );
  };
}

function getByID(id) {
  function request() {
    return { type: QuestionConstants.GETBYID_REQUEST };
  }
  function success(question) {
    return { type: QuestionConstants.GETBYID_SUCCESS, question };
  }
  function failure(question) {
    return { type: QuestionConstants.GETBYID_FAILURE, question };
  }

  return (dispatch) => {
    dispatch(request());

    QuestionService.getById(id).then(
      question => dispatch(success(question)),
      error => dispatch(failure(error)),
    );
  };
}

function deleteQuestion(id) {
  function request() {
    return { type: QuestionConstants.DELETE_REQUEST, id };
  }
  function success() {
    return { type: QuestionConstants.DELETE_SUCCESS, id };
  }
  function failure(error) {
    return { type: QuestionConstants.DELETE_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());

    QuestionService.deleteQuestion(id).then(
      () => {
        dispatch(success(id));
        dispatch(AlertActions.success('Question deleted.'));
      },
      (error) => {
        dispatch(failure(error));
        dispatch(AlertActions.error(error));
      },
    );
  };
}

function editQuestion(values) {
  return (dispatch) => {
    QuestionService.editQuestion(values).then(
      () => {
        history.push('/question/list');
        dispatch(AlertActions.success(`Question ${values.title} edited.`));
      },
      (error) => {
        dispatch(AlertActions.error(error));
      },
    );
  };
}

function clearModules() {
  function clear() {
    return { type: QuestionConstants.CLEAR_QUESTION };
  }
  return (dispatch) => {
    dispatch(clear());
  };
}

const QuestionActions = {
  create,
  getAll,
  getByID,
  deleteQuestion,
  editQuestion,
  clearModules,
};

export default QuestionActions;
