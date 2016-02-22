import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { selectPrescription } from 'redux/modules/prescription/prescription.module.js';

@connect(
  null,
  { selectPrescription }
)
export default class PrescriptionList extends Component {
  static propTypes = {
    prescriptions: PropTypes.array.isRequired,
    selectPrescription: PropTypes.func,
    title: PropTypes.string
  };

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  handleClick = (prescription) => {
    return (event) => {
      event.preventDefault();
      this.props.selectPrescription(prescription);
      this.context.router.push(`/prescription/${prescription.id}`);
    };
  };

  renderTitle = (title) => {
    if (!title) return null;
    return <h4>{title}</h4>;
  };

  render() {
    return (
      <section>
        { this.renderTitle(this.props.title) }
        {
          this.props.prescriptions.map((prescription) =>
            <a href="#" onClick={ this.handleClick(prescription) } key={prescription.id}>
              <pre key={prescription.id}>
                { JSON.stringify(prescription, null, '\t') }
              </pre>
            </a>
          )
        }
      </section>
    );
  }
}
