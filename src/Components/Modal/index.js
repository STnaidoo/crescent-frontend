import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Typography } from 'material-ui';
import ModalPaper from './styles';
import Button from '../Button';

class CustomModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleOpen = this.handleOpen.bind(this);
  }

  state = {
    open: false,
  };

  componentDidMount() {
    this.props.onRef(this);
  }
  componentWillUnmount() {
    this.props.onRef(null);
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  loadRows = (obj, arr) => {
    if (obj) {
      Object.keys(obj).forEach((prop) => {
        if (obj[prop] && !Array.isArray(obj[prop])) {
          arr.push(`${prop}: ${obj[prop]}`);
        }
      });
    }
    return arr;
  };

  render() {
    const style = {
      justifyContent: 'center',
      alignItems: 'center',
    };
    const { obj } = this.props;
    return (
      <Modal
        // eslint-disable-next-line jsx-a11y/aria-props
        aria-="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.state.open}
        onClose={this.handleClose}
        style={style}
      >
        <ModalPaper>
          <Typography variant="title" id="modal-title">
            {'Are you sure you want to delete this:'}
          </Typography>
          <br />
          {this.loadRows(obj, []).map(returnObj => (
            <Typography
              key={returnObj}
              variant="subheading"
              id="simple-modal-description"
            >
              {returnObj}
            </Typography>
          ))}
          <br />
          <div className="justify-content flex-container">
            <Button color="primary" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button
              variant="raised"
              color="primary"
              onClick={this.props.onClick}
            >
              Confirm
            </Button>
          </div>
        </ModalPaper>
      </Modal>
    );
  }
}

CustomModal.propTypes = {
  obj: PropTypes.object,
  onRef: PropTypes.func,
  onClick: PropTypes.func,
};

export default CustomModal;
