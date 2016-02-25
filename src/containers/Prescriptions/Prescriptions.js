import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { PrescriptionList } from 'components';
import {
  isLoaded,
  fetchAll,
  prescriptionsGroupSelector
} from 'redux/modules/prescription/prescriptions.module.js';

@connect(prescriptionsGroupSelector)
export default class Prescriptions extends Component {
  static propTypes = {
    prescriptionGroups: PropTypes.object,
  };

  static reduxAsyncConnect(params, store) {
    const { dispatch, getState } = store;
    if (!isLoaded(getState())) {
      return dispatch(fetchAll());
    }
  }

  render() {
    const prescriptionGroups = this.props.prescriptionGroups;

    return (
      <section>
        <h1>My Prescriptions</h1>
        <Link to="/new/prescription">Add new prescription</Link>
        {
          prescriptionGroups.requiresAttention.length ?
            <PrescriptionList
              title="Attention Required"
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
