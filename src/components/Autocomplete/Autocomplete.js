import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Autocomplete from 'react-autocomplete';
import { createAutocomplete, styles } from './autocomplete.helper.js';


@connect((state) => {
  return { drugs: state.drugs.drugs };
})
export default class TinyAutocomplete extends Component {
  static propTypes = {
    autocompleteType: PropTypes.string,
    inputProps: PropTypes.object,
    drugs: PropTypes.array
  };

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      loading: false
    };

    this.getAutocompleteResults = createAutocomplete(props.autocompleteType, props.drugs);
  }

  onAutocompleteSelect = (value) => {
    this.setState({ items: [] });
    this.props.inputProps.onChange(value);
  };

  onAutocompleteChange = (event, value) => {
    this.setState({ loading: true });
    this.props.inputProps.onChange(value);
    this.getAutocompleteResults(value, (items) => {
      this.setState({ items, loading: false });
    });
  };

  getItemValue = (item) => {
    return item.name;
  };

  renderItem = (item, isHighlighted) => {
    return (
      <div style={isHighlighted ? styles.highlightedItem : styles.item}
        key={item.id}
      >{item.name}</div>
    );
  };

  render() {
    return (
      <Autocomplete
        items={ this.state.items }
        getItemValue={ this.getItemValue }
        onSelect={ this.onAutocompleteSelect }
        onChange={ this.onAutocompleteChange }
        renderItem={ this.renderItem }
        inputProps={ this.props.inputProps }
      />
    );
  }
}
