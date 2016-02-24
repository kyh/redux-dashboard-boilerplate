import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class PrescriptionList extends Component {
  static propTypes = {
    prescriptions: PropTypes.array.isRequired,
    selectPrescription: PropTypes.func,
    title: PropTypes.string
  };

  renderTitle(title) {
    if (!title) return null;
    return <h4>{title}</h4>;
  }

  render() {
    return (
      <section>
        { this.renderTitle(this.props.title) }
        {
          this.props.prescriptions.map((prescription) =>
            <Link to={ `/prescription/${prescription.id}` } key={prescription.id}>
              <pre>
                { JSON.stringify(prescription, null, '\t') }
              </pre>
            </Link>
          )
        }
      </section>
    );
  }
}
