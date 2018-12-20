import { DATA_LOADED, DATA_LOADING } from '../action-types';

const validPayloadTypes = {
  cards: 'cards',
  audio: 'audio',
};

/**
 * check that the dataType argument is acceptable.
 * @param {string} dataType
 */
function checkValidity(dataType) {
  if (!Object.values(validPayloadTypes).includes(dataType)) {
    throw new TypeError(`${dataType} is not a valid data type in the status reducer`);
  }
}

export const dataLoading = payload => {
  checkValidity(payload); // payload should ONLY be one of the values in the 'validPayloadTypes' object
  return {
    type: DATA_LOADING,
    payload,
  };
};

export const dataLoaded = payload => {
  checkValidity(payload); // payload should ONLY be one of the values in the 'validPayloadTypes' object
  return {
    type: DATA_LOADED,
    payload,
  };
};

export default { dataLoaded, dataLoading };
