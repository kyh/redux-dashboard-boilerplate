import React, { Component, PropTypes } from 'react';
import { reduxForm, propTypes } from 'redux-form';

const FORM_NAME = 'prescription';

@reduxForm({
  form: FORM_NAME,
  fields: ['name', 'pharmacy', 'paper']
})
export default class PrescriptionForm extends Component {
  static propTypes = {
    ...propTypes,
    prefill: PropTypes.object,
    handleSubmit: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.props.initializeForm(this.props.prefill);
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
          <input type="text" placeholder="Prescription name" {...name}/>
        </label>
        <label>
          Pharmacy:
          <input type="text" placeholder="Pharmacy name" {...pharmacy}/>
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
