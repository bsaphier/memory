import { createSelector } from 'reselect';


const getStatuses = state => state.status;

/**
 * return true if anything is loading
 */
export default createSelector([getStatuses], statuses =>
  Object.values(statuses).some(status => status)
);
