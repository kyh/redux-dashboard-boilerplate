import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as prescriptionActions from 'prescription/prescriptions.module.js';
import { isLoaded, fetchAll } from 'prescription/prescriptions.module.js';

@connect(
  state => ({
    prescriptionList: state.prescriptions.prescriptions,
    isLoading: state.prescriptions.loading,
    loaded: state.prescriptions.loaded
  }),
  prescriptionActions
)
export default class PrescriptionList extends Component {
  static propTypes = {
    prescriptionList: PropTypes.array,
    isLoading: PropTypes.bool,
    loaded: PropTypes.bool
  };

  static reduxAsyncConnect(params, store) {
    const { dispatch, getState } = store;
    if (!isLoaded(getState())) {
      return dispatch(fetchAll());
    }
  }

  render() {
    return (
      <section>
        <h1>My Prescriptions</h1>
        <section>
          {
            this.props.prescriptionList.map((prescription) =>
              <pre key={prescription.id}>
                { JSON.stringify(prescription, null, '\t') }
              </pre>
            )
          }
        </section>
      </section>
    );
  }
}
