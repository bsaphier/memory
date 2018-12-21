import { DATA_LOADED, DATA_LOADING } from '../action-types';

const initialState = {
  cards: false,
  audio: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DATA_LOADING:
      return { ...state, [action.payload]: true };

    case DATA_LOADED:
      return { ...state, [action.payload]: false };

    default:
      return { ...state };
  }
};
