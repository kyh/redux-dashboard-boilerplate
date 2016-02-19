/**
 * Prescriptions helpter functions
 */
const RX_STATES = {
  unscheduled: 'unscheduled',
  scheduled: 'scheduled'
};

const RX_SUBSTATES = {
  // Unscheduled states
  active: 'active',
  availableNow: 'availableNow',
  overdue: 'overdue',
  unsubscribed: 'unsubscribed',
  // Scheduled states
  scheduled: 'scheduled',
  onHold: 'onHold'
};

const RX_SUBSTATE_TOOLTIPS = {
  // Unscheduled states
  active: '',
  availableNow: 'This prescription is available for a refill.',
  overdue: 'This prescription is overdue for a refill.',
  unsubscribed: '',
  // Scheduled states
  scheduled: 'This prescription is scheduled for a delivery.',
  onHold: `The scheduled delivery is currently on hold; we\'ll
           contact you about the delivery within the next few days.`
};

// List of errors associated with a delivery
const DELIVERY_ERRORS = ['on_hold_card_error', 'on_hold_needs_card', 'on_hold'];

/**
 * @param {object} lastDelivery - fulfilled delivery object
 * @param {int} daysSupply - number of days the prescription is supplied for
 * @return {date|bool} - projected refill date option, false if there's no last delivery
 */
function _projectedRefillDate(lastDelivery, daysSupply) {
  if (!lastDelivery) return false;

  const fulfilledAt = new Date(lastDelivery.fulfilled_at);
  return fulfilledAt.setDate(fulfilledAt.getDate() + daysSupply);
}

/**
 * @param {Prescription} prescription - Prescription model
 * @return {Prescription} - prescription with {primaryState, subState} attached
 */
function _attachPrescriptionState(prescription) {
  const today = new Date();
  // Set default state to be unscheduled and active
  let state = {
    primaryState: RX_STATES.unscheduled,
    subState: RX_SUBSTATES.active
  };

  const latestActiveDelivery = prescription.latest_active_delivery;

  // If there is an active delivery
  if (latestActiveDelivery) {
    // Set state to be scheduled
    state = {
      primaryState: RX_STATES.scheduled,
      subState: RX_SUBSTATES.scheduled
    };

    // If there is an issue with the active delivery
    if (DELIVERY_ERRORS.indexOf(latestActiveDelivery.status) !== -1) {
      state.subState = RX_SUBSTATES.onHold;
    }
  } else {
    // Remind the user that a drug is available for refills (per our estimated date)
    if (prescription.remind_refill_at && new Date(prescription.remind_refill_at) < today) {
      state.subState = RX_SUBSTATES.availableNow;
    }

    const refillDate = _projectedRefillDate(
      prescription.latest_fulfilled_delivery,
      prescription.days_supply
    );
    // If the last fulfilled delivery has a projected refill date before today
    if (refillDate && refillDate < today) {
      state.subState = RX_SUBSTATES.overdue;
    }

    if (prescription.notify_of_refills === false) {
      state.subState = RX_SUBSTATES.unsubscribed;
    }
  }

  return {
    ...prescription,
    state
  };
}

/**
 * @param {Prescription} prescription - Prescription model
 * @return {Prescription} - Prescription with {tooltip} attached
 */
function _attachPrescriptionTooltip(prescription) {
  return {
    ...prescription,
    tooltip: RX_SUBSTATE_TOOLTIPS[prescription.state.subState]
  };
}

/**
 * Public methods and prescription configuration
 */
export const PRESCRIPTION_GROUPS = {
  scheduled: [],
  requiresAttention: [],
  unscheduled: [],
  inactive: [],
  hasCoupons: false
};

export const PRESCRIPTIONS_ENDPOINT = '/prescriptions';

/**
 * Prescription Model
 * This is a subset of the full Prescription Model from the back end
 * (https://github.com/tinyrx/ops/blob/master/app/models/prescription.rb)
 */
export const PRESCRIPTION_MODEL = {
  name: '',
  user_copay: null,
  pharmacy: '',
  paper: false
};

/**
 * Wrapper around attaching RX_STATES, RX_SUBSTATES and any tooltip.
 *
 * @param {Prescription} prescription - Prescription model
 * @return {Prescription} - Prescription with {primaryState, subState, tooltip} attached
 */
export function attachPrescriptionUiInfo(prescription) {
  let transformedPrescription = _attachPrescriptionState(prescription);
  transformedPrescription = _attachPrescriptionTooltip(transformedPrescription);

  return transformedPrescription;
}

/**
 * @param {array} prescriptions - array of Prescription model
 * @return {object} - prescriptions added to the appropriate group
 */
export function groupPrescriptions(prescriptions) {
  return prescriptions.reduce((group, prescription) => {
    if (prescription.user_price && !group.hasCoupons) {
      group.hasCoupons = true;
    }

    switch (prescription.state.subState) {
      case RX_SUBSTATES.overdue:
      case RX_SUBSTATES.onHold:
      case RX_SUBSTATES.availableNow:
        group.requiresAttention.push(prescription);
        break;
      case RX_SUBSTATES.scheduled:
        group.scheduled.push(prescription);
        break;
      case RX_SUBSTATES.unsubscribed:
        group.inactive.push(prescription);
        break;
      default:
        // RX_SUBSTATES.active
        group.unscheduled.push(prescription);
    }

    return group;
  }, { ...PRESCRIPTION_GROUPS });
}
