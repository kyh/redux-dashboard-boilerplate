import React, { Component, PropTypes } from 'react';

export default class PrescriptionList extends Component {
  static propTypes = {
    prescriptions: PropTypes.array.isRequired,
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
            <pre key={prescription.id}>
              { JSON.stringify(prescription, null, '\t') }
            </pre>
          )
        }
      </section>
    );
  }
}
