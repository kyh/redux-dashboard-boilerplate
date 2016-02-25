export const styles = {
  item: {
    padding: '2px 6px',
    cursor: 'default'
  },

  highlightedItem: {
    color: 'white',
    background: 'hsl(200, 50%, 50%)',
    padding: '2px 6px',
    cursor: 'default'
  },

  menu: {
    border: 'solid 1px #ccc'
  }
};

const AUTOCOMPLETE_LIMIT = 20;

// Drugs
function _matchDrugsToTerm(drug, query) {
  return drug.search.toLowerCase().indexOf(query.toLowerCase()) !== -1;
}

function _sortDrugs(a, b, query) {
  const aTitle = a.name.toLowerCase();
  const bTitle = b.name.toLowerCase();

  const aPresent = aTitle.indexOf(query) !== -1;
  const bPresent = bTitle.indexOf(query) !== -1;

  if (aPresent && !bPresent) {
    // Move A before B if the query matches the a.name
    return -1;
  } else if (!aPresent && bPresent) {
    // Move B before A if a.name is not present but B is
    return 1;
  }

  // This handles both drugs containing the query and neither containing it (a noop).
  return aTitle.indexOf(query) - bTitle.indexOf(query);
}

function _filterDrugs(drugs, query, limit) {
  const filtered = drugs.filter((drug) => _matchDrugsToTerm(drug, query));
  const sorted = filtered.sort((a, b) => _sortDrugs(a, b, query));

  return sorted.splice(0, limit);
}

const autocompleteMap = {
  drugs: (value, callback, drugs) => {
    return callback(_filterDrugs(drugs, value, AUTOCOMPLETE_LIMIT));
  }
};

export function autocompleteResults(type, prefill) {
  return (value, callback) => {
    return autocompleteMap[type] ?
      autocompleteMap[type](value, callback, prefill) :
      callback([]);
  };
}
