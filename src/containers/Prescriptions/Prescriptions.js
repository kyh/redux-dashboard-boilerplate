import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { isLoaded, fetchAll } from 'redux/modules/prescription/prescriptions.module.js';
import { PrescriptionList } from 'components';

@connect(
  state => ({
    groupedPrescriptions: state.prescriptions,
    isLoading: state.prescriptions.loading,
    loaded: state.prescriptions.loaded
  })
)
export default class Prescriptions extends Component {
  static propTypes = {
    groupedPrescriptions: PropTypes.object,
    selectPrescription: PropTypes.func,
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
        <Link to="/new/prescription">Add new prescription</Link>
        {
          prescriptionGroups.requiresAttention.length ?
            <PrescriptionList
              title="Requires Attention"
              prescriptions={ prescriptionGroups.requiresAttention }
            /> :
            null
        }
        {
          prescriptionGroups.scheduled.length ?
            <PrescriptionList
              title="Scheduled"
              prescriptions={ prescriptionGroups.scheduled }
            /> :
            null
        }
        {
          prescriptionGroups.unscheduled.length ?
            <PrescriptionList
              title="Unscheduled"
              prescriptions={ prescriptionGroups.unscheduled }
            /> :
            null
        }
        {
          prescriptionGroups.inactive.length ?
            <PrescriptionList
              title="Inactive"
              prescriptions={ prescriptionGroups.inactive }
            /> :
            null
        }
      </section>
    );
  }
}
