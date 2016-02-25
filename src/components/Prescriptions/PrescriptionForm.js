import React, { Component, PropTypes } from 'react';
import { reduxForm, propTypes } from 'redux-form';
import prescriptionValidator from './prescription.validation.js';

import TinyAutocomplete from '../Autocomplete/Autocomplete.js';

const FORM_NAME = 'prescription';

@reduxForm({
  form: FORM_NAME,
  fields: ['name', 'pharmacy', 'paper'],
  validate: prescriptionValidator
})
export default class PrescriptionForm extends Component {
  static propTypes = {
    ...propTypes,
    initialValues: PropTypes.object,
    handleSubmit: PropTypes.func.isRequired,
    drugs: PropTypes.array
  };

  componentWillMount() {
    this.props.initializeForm(this.props.initialValues);
  }

  render() {
    const {
      fields: { name, pharmacy, paper },
      handleSubmit,
      submitting
    } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <label>
          Prescription:
          <TinyAutocomplete autocompleteType="drugs" inputProps={name} />
          {
            name.error && name.touched &&
            <div className="text-danger">{name.error}</div>
          }
        </label>
        <label>
          Pharmacy:
          <input type="text" placeholder="Pharmacy name" {...pharmacy}/>
          {
            pharmacy.error && pharmacy.touched &&
            <div className="text-danger">{pharmacy.error}</div>
          }
        </label>
        <label>
          <input type="checkbox" {...paper}/> Paper Prescription
        </label>
        <button type="submit" disabled={submitting}>
          Add new Prescription
        </button>
      </form>
    );
  }
}
