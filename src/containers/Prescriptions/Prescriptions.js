import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as prescriptionActions from 'redux/modules/prescription/prescriptions.module.js';
import { isLoaded, fetchAll } from 'redux/modules/prescription/prescriptions.module.js';
import { PrescriptionList } from 'components';

@connect(
  state => ({
    groupedPrescriptions: state.prescriptions.groupedPrescriptions,
    isLoading: state.prescriptions.loading,
    loaded: state.prescriptions.loaded
  }),
  prescriptionActions
)
export default class Prescriptions extends Component {
  static propTypes = {
    groupedPrescriptions: PropTypes.object,
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
    const prescriptionGroups = this.props.groupedPrescriptions;

    return (
      <section>
        <h1>My Prescriptions</h1>
        <PrescriptionList
          title="Requires Attention"
          prescriptions={ prescriptionGroups.requiresAttention }
        />
      </section>
    );
  }
}
