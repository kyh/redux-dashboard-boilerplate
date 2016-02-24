import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { isLoaded } from 'redux/modules/prescription/prescriptions.module.js';

import {
  deletePrescription,
  getPrescription,
  selectPrescription
} from 'redux/modules/prescription/prescription.module.js';

@connect(
  (state) => ({
    prescription: state.prescription.selected
  }),
  { deletePrescription }
)
export default class SinglePrescription extends Component {
  static propTypes = {
    prescription: PropTypes.object,
    deletePrescription: PropTypes.func,
  };

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  static reduxAsyncConnect(params, store) {
    const { dispatch, getState } = store;
    const globalState = getState();

    if (!isLoaded(globalState)) {
      return dispatch(getPrescription(params.id));
    }

    const prescriptions = globalState.prescriptions.all;

    return dispatch(selectPrescription(
      prescriptions.find((prescription) =>
        prescription.id === parseInt(params.id, 0)
      ))
    );
  }

  deletePrescription = () => {
    const prescription = this.props.prescription;
    return this.props.deletePrescription(prescription)
      .then(() => this.context.router.push('/'));
  };

  render() {
    const prescription = this.props.prescription;
    if (prescription) {
      return (
        <section>
          <h1>{ prescription.name }</h1>
          <button onClick={this.deletePrescription}>Remove Prescription</button>
          <pre>
            { JSON.stringify(prescription, null, '\t') }
          </pre>
        </section>
      );
    }

    return null;
  }
}
