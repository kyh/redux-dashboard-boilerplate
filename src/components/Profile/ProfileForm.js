import React, { Component, PropTypes } from 'react';
import { reduxForm, propTypes } from 'redux-form';

import { USER_MODEL } from 'redux/modules/user/user.module.js';

const FORM_NAME = 'profile';

@reduxForm({
  form: FORM_NAME,
  fields: Object.keys(USER_MODEL)
})
export default class ProfileForm extends Component {
  static propTypes = {
    ...propTypes,
    initialValues: PropTypes.object,
    handleSubmit: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.props.initializeForm(this.props.initialValues);
  }

  render() {
    const {
      fields: {
        full_name,
        email,
        phone
      },
      handleSubmit,
      submitting
    } = this.props;

    console.log(this);

    return (
      <form onSubmit={handleSubmit}>
        <label>
          Full Name:
          <input type="text" {...full_name}/>
        </label>
        <label>
          Email:
          <input type="text" {...email}/>
        </label>
        <label>
          Phone:
          <input type="tel" {...phone}/>
        </label>
        <button type="submit" disabled={submitting}>
          Save
        </button>
      </form>
    );
  }
}
