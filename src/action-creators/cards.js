import { CARDS_DID_NOT_MATCH, CARDS_DID_MATCH, SHUFFLE_CARDS, SELECT_CARD } from '../action-types';


/**
 * Fisher–Yates/Knuth Shuffle algorithm
 * https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
 *
 * @param {any[]} array
 */
export function shuffle(array) {
  let remaining = array.length;
  let currentElement;
  let randomIndex;

  // While there are elements that have not been shuffled
  while (remaining) {
    // Select the index of a remaining element at random
    randomIndex = Math.floor(Math.random() * remaining);
    remaining -= 1;
    // Swap the element at the random index with the the last of the unshuffled elements
    currentElement = array[remaining];
    array[remaining] = array[randomIndex];
    array[randomIndex] = currentElement;
  }

  return array;
}

export const shuffleCards = levelName => (dispatch, getState) => {
  const { cards, game } = getState();
  const level = levelName ? levelName : game.selectedLevel;
  const shuffledCards = shuffle([...cards.cardsByLevel[level]]);
  dispatch({
    type: SHUFFLE_CARDS,
    payload: { level, shuffledCards },
  });
};

export const selectCard = cardId => ({ type: SELECT_CARD, payload: cardId });

export const match = (id1, id2, id3) => ({
  type: CARDS_DID_MATCH,
  payload: id3 ? [id1, id2, id3] : [id1, id2],
});

export const noMatch = () => ({ type: CARDS_DID_NOT_MATCH });

export default { shuffleCards, selectCard, noMatch, match };
