import { TOGGLE_MODAL } from '../action-types';

/**
 * @param {string} payload - the id of the modal to toggle
 */
export const toggleModal = payload => ({ type: TOGGLE_MODAL, payload });

export default { toggleModal };
