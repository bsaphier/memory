import { createSelector } from 'reselect';


const getLevel = state => state.game.selectedLevel;

/**
 * select the number of rows in to display in the card tables
 */
export default createSelector([getLevel], level => {
  switch (level) {
    case 'easy':
      return 2;
    case 'hard':
      return 4;
    case 'triples':
      return 4;
    default:
      return 2;
  }
});
