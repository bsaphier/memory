import { TOGGLE_MODAL } from '../action-types';

export default (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case TOGGLE_MODAL:
      return { ...state, [payload]: !state[payload] };

    default:
      return { ...state };
  }
};
