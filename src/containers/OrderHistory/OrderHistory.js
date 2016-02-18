import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as deliveryActions from 'delivery/deliveries.module.js';
import { isLoaded, fetchAll } from 'delivery/deliveries.module.js';

@connect(
  state => ({
    deliveriesList: state.deliveries.deliveries,
    isLoading: state.deliveries.loading,
    loaded: state.deliveries.loaded
  }),
  deliveryActions
)
export default class OrderHistory extends Component {
  static propTypes = {
    deliveriesList: PropTypes.array,
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
    return (
      <section>
        <h1>Order History</h1>
        <section>
          {
            this.props.deliveriesList.map((delivery) =>
              <pre key={delivery.id}>
                { JSON.stringify(delivery, null, '\t') }
              </pre>
            )
          }
        </section>
      </section>
    );
  }
}
