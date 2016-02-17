import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as prescriptionActions from 'prescription/prescription.actions.js';
import { isLoaded, fetchAll } from 'prescription/prescription.actions.js';

@connect(
  state => ({
    prescriptionList: state.prescription.prescriptions,
    isLoading: state.prescription.loading,
    loaded: state.prescription.loaded,
    statusText: state.prescription.statusText
  }),
  prescriptionActions
)
export default class PrescriptionList extends Component {
  static propTypes = {
    prescriptionList: PropTypes.array,
    isLoading: PropTypes.bool,
    loaded: PropTypes.bool,
    statusText: PropTypes.array
  };

  static reduxAsyncConnect(params, store) {
    const {dispatch, getState} = store;
    if (!isLoaded(getState())) {
      return dispatch(fetchAll());
    }
  }

  render() {
    return (
      <section>
        <h1>My Prescriptions</h1>
        <pre>
          { this.props.prescriptions }
        </pre>
      </section>
    )
  }
}
