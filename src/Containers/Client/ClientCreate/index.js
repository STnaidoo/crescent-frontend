/**
 *
 * ClientCreate
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';

import LinearProgress from '../../../Components/LinearProgress';
import Card from '../../../Components/Card';
import TextField from '../../../Components/TextField';
import Button from '../../../Components/Button';
import ClientActions from '../../../Actions/ClientActions';
import UserActions from '../../../Actions/UserActions';

const validate = () => {
  const errors = {};

  return errors;
};
let clients = [];
const required = value => (value ? undefined : 'Required');
const maxLength = max => value => (value && value.length > max ? `Must be ${max} characters long` : undefined);
const minLength = min => value => (value && value.length < min ? `Must be ${min} characters long` : undefined);
const minLength6 = minLength(6);
const maxLength6 = maxLength(6);
// const number = value => (value && isNaN(Number(value)) ? 'Must be a number' : undefined);
// check for previously existing client name and client code
const clientExists = value => (value && Array.isArray(clients) ? clients.filter(client => client.name === value).length ? 'Client with that name already exists' : undefined : undefined);
const codeExists = value => (value && Array.isArray(clients) ? clients.filter(client => client.clientCode === value).length ? 'Client with that code already exists' : undefined : undefined);

/* eslint-disable react/prefer-stateless-function */
class ClientCreate extends React.Component {
  constructor(props) {
    super(props);
    this.props.dispatch(ClientActions.clearClients());
    this.props.dispatch(UserActions.getAllRoles());
    this.props.dispatch(ClientActions.getAll());
  }

  submit = (values) => {
    // clientExists(values.name);
    // codeExists(values.clientCode);
    const client = Object.assign({}, values);
    const clientRoleId = this.props.roles.find(role => role.name === 'Client').id;
    this.props.dispatch(ClientActions.create(client, clientRoleId));
    this.props.dispatch(ClientActions.getAll());
  };

  loadClients = (values) => {
    this.props.dispatch(ClientActions.loadClients(values.target.value));
  };

  render() {
    // eslint-disable-next-line prefer-destructuring
    clients = this.props.clients;
    // console.log(clients);
    return (
      <Card width="600px" title="Create New Client">
        <form
          onSubmit={this.props.handleSubmit(this.submit)}
          noValidate
          autoComplete="off"
          className="centerForm"
        >
          <div>
            <div>
              <Field
                name="name"
                label="Business Name"
                margin="normal"
                component={TextField}
                validate={[required, clientExists]}
              />
            </div>
            <div>
              <Field
                name="clientCode"
                label="Client Code"
                margin="normal"
                component={TextField}
                validate={[required, maxLength6, minLength6, codeExists]}
              />
            </div>
            <div>
              <Field
                name="vatNumber"
                label="VAT Number"
                margin="normal"
                component={TextField}
                validate={[required]}
              />
            </div>
            <div>
              <Field
                name="accountNumber"
                label="Bank Account Number"
                margin="normal"
                component={TextField}
                validate={[required]}
              />
            </div>
            <div>
              <Field
                name="bank"
                label="Bank Name"
                margin="normal"
                component={TextField}
                validate={[required]}
              />
            </div>
            <div>
              <Field
                name="branchName"
                label="Branch Name"
                margin="normal"
                component={TextField}
                validate={[required]}
              />
            </div>
            <div>
              <Field
                name="branchCode"
                label="Branch Code"
                margin="normal"
                component={TextField}
                validate={[required]}
              />
            </div>
          </div>
          {this.props.client_creating ? (
            <div style={{ width: '400px' }}>
              <LinearProgress color="secondary" />
              Creating Client
            </div>
          ) : (
            <div className="formAlignRight">
              <Button
                className="buttonFormat"
                variant="raised"
                color="primary"
                type="submit"
              >
                Create Client
              </Button>
            </div>
          )}
        </form>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  client_creating: state.ClientReducer.creating,
  roles: state.UserReducer.roles,
  roles_loading: state.UserReducer.loading,
  clients: state.ClientReducer.clients,
  clients_loading: state.ClientReducer.loading,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

ClientCreate.propTypes = {
  clients: PropTypes.array,
  clients_loading: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  client_creating: PropTypes.bool,
  roles: PropTypes.array,
  roles_loading: PropTypes.bool,
};

const withForm = reduxForm(
  {
    form: 'clientCreate',
    validate,
  },
  ClientCreate,
);

export default compose(connect(mapStateToProps, mapDispatchToProps), withForm)(ClientCreate);
