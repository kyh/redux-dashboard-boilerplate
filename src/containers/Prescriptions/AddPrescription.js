import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { PrescriptionForm } from 'components';
import {
  isDrugsLoaded, fetchDrugs, createPrescription
} from 'redux/modules/prescription/prescription.module.js';

@connect(
  (state) => {
    const user = state.auth.user;
    return ({
      initialValues: {
        name: '',
        pharmacy: user ? user.default_pharmacy : ''
      }
    });
  },
  { createPrescription }
)
export default class Prescriptions extends Component {
  static propTypes = {
    createPrescription: PropTypes.func,
    initialValues: PropTypes.object
  };

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  static reduxAsyncConnect(params, store) {
    const { dispatch, getState } = store;
    if (!isDrugsLoaded(getState())) {
      return dispatch(fetchDrugs());
    }
  }

  handleSubmit = (data) => {
    return this.props.createPrescription(data)
      .then(() => this.context.router.push('/'));
  };

  render() {
    return (
      <section>
        <h1>Add New Prescription</h1>
        <PrescriptionForm
          prefill={this.props.initialValues}
          onSubmit={this.handleSubmit}
        />
      </section>
    );
  }
}
