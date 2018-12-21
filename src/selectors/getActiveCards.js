import { createSelector } from 'reselect';


const getCardsByLevel = state => state.cards.cardsByLevel;
const getLevel = state => state.game.selectedLevel;
const getMatches = state => state.cards.matches;

/**
 * mark matched cards
 */
export default createSelector(
  [getCardsByLevel, getMatches, getLevel],
  (cardsByLevel, matches, level) => {
    const allMatchIds = matches.reduce((acc, curr) => acc.concat(curr), [])
    if (level && cardsByLevel[level]) {
      return cardsByLevel[level].map(
        card =>
          allMatchIds.includes(card.id)
            ? Object.assign(card, { match: true })
            : Object.assign(card, { match: false })
      );
    }
    return [];
  }
);
