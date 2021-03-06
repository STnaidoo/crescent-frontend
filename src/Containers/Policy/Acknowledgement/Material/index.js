// get the requested file and display it

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';
// import { Document, Page } from 'react-pdf/dist/entry.webpack';
import { Document, Page } from 'react-pdf/dist/entry.noworker';
import Card from '../../../../Components/Card';

/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

class AcknowledgementMaterialView extends Component {
  state = {
    numPages: null,
    pageNumber: 1,
  }

  onMaterialLoad = ({ numPages }) => {
    this.setState({ numPages });
  };

  render() {
    const { user } = this.props;
    const { pageNumber, numPages } = this.state;
    console.log(this.props.material);

    return (
      <div>
        <Card width="800px" title="View Material">
          <Document
            file={this.props.material}
            noData="No PDF file specified"
            onLoadSuccess={this.onMaterialLoad}
          >
            {
              Array.from(
                new Array(numPages),
                (el, index) => (
                  <Page
                    key={`page_${index + 1}`}
                    pageNumber={index + 1}
                  />
                ),
              )
            }
          </Document>
        </Card>
      </div>

    );
  }
}

const mapStateToProps = state => ({
  user: state.LoginReducer.user,
  material: state.PolicyReducer.material,
});

const withForm = reduxForm(
  {
    form: 'acknowledgementMaterialView',
  },
  AcknowledgementMaterialView,
);

AcknowledgementMaterialView.propTypes = {
  user: PropTypes.object,
  material: PropTypes.object,
};

export default compose(connect(mapStateToProps), withForm)(AcknowledgementMaterialView);
