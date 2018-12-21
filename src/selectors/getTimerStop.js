import { createSelector } from 'reselect';
import getActiveCards from './getActiveCards';


const getGamePlaying = ({ game }) => game.playing;
const getMatches = ({ cards }) => cards.matches;

/**
 * select whether the timer should be signaled to stop running
 */
export default createSelector(
  [getGamePlaying, getMatches, getActiveCards],
  (playing, matches, activeCards) => {
    const matchIds = matches.reduce((acc, curr) => acc.concat(curr), []);
    const numCardsByLevel = activeCards.length;
    return numCardsByLevel === matchIds.length;
  }
);
