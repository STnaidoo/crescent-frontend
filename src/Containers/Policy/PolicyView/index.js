import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';
// import { CircularProgress } from 'material-ui/Progress';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Tooltip from 'material-ui/Tooltip';

import history from '../../../Helpers/History';
import Card from '../../../Components/Card';
import PolicyActions from '../../../Actions/PolicyActions';
import { StyledDelete } from '../../../Styles/Delete';
import { StyledEdit } from '../../../Styles/Edit';
import IconButton from '../../../Styles/IconButton';
import CustomModal from '../../../Components/Modal/index';

class PolicyView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { obj: {} };
  }

  componentWillMount() {
    this.props.dispatch(PolicyActions.getAll());
  }

  handleDelete = (obj) => {
    this.setState({ obj });
    this.child.handleOpen();
  };

  confirmDelete = obj => () => {
    this.props.dispatch(PolicyActions.deletePolicy(obj.id));
    this.child.handleClose();
  };

  handleEdit = (editObj) => {
    this.props.dispatch(PolicyActions.loadPolicy(editObj.id));
    history.push('/policy/edit');
  };

  render() {
    const { policies } = this.props;
    const columns = [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Description',
        accessor: 'description',
      },
      {
        Header: 'Edit/Delete',
        accessor: 'edit/delete',
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
        <Card width="800px" title="Policy List">
          <div>
            {Array.isArray(policies) && (
              <ReactTable
                columns={columns}
                data={policies}
                filterable
                defaultPageSize={10}
                className="-striped -highlight"
              />
            )}
          </div>
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
  policies: state.PolicyReducer.policies,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

const withForm = reduxForm(
  {
    form: 'policyView',
  },
  PolicyView,
);

PolicyView.propTypes = {
  policies: PropTypes.array,
  dispatch: PropTypes.func,
};

export default compose(connect(mapStateToProps, mapDispatchToProps), withForm)(PolicyView);
