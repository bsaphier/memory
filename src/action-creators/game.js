import {
  SELECT_LEVEL,
  FINISH_GAME,
  RESET_GAME,
  START_GAME,
  LOAD_GAME,
} from '../action-types';
import { shuffleCards } from './cards';
import { toggleModal } from './modals';
import { onPlay } from './sound';
import cardData from '../assets/game-data/cards.json';


let cardId = 0;
/**
 * this function is only needed for testing - otherwise cardId could just be reassigned inline, below
 */
export const resetCardId = () => {
  cardId = 0;
};

/**
 * Create card objects from a list of strings
 * @typedef {{ id: number; symbol: string; match: boolean; }} Card
 * @param {String[]} cardsArray - an array of card symbols (strings)
 * @param {(c: Card) => any} callback - a function to call on every card
 */
export function parseCards(cardsList, callback) {
  return cardsList.map(cardSymbol => {
    const card = { id: cardId, symbol: cardSymbol, match: false };
    cardId += Math.random(); // not a great way to create unique IDs
    if (callback) {
      if (typeof callback === 'function') callback(card);
      else console.error(new TypeError('The second argument of parseCards must be a function.'))
    }
    return card;
  });
}

/**
 * Transforms the card data for easy access in display components
 * @param {Object} cardData
 * @param {Object[]} cardData.levels
 * @param {string[]} cardData.levels[].cards
 * @param {string} cardData.levels[].difficulty
 */
export function parseCardData(cardData) {
  const { levels } = cardData;
  const cardsByLevel = {};
  const cardsById = {};

  resetCardId();

  levels.forEach(level => {
    const cards = parseCards(level.cards, card => (cardsById[card.id] = card));
    cardsByLevel[level.difficulty] = cards;
  });

  return {
    levels: levels.map(level => level.difficulty),
    cardsByLevel,
    cardsById,
  };
}

export const resetGame = () => ({ type: RESET_GAME });

export const startGame = () => ({ type: START_GAME });

export const loadInitialGameData = () => ({ type: LOAD_GAME, payload: parseCardData(cardData) });

/**
 * Redux Thunk action
 * @param {number} elapsedTime - the elapsed time of the game from start to finish
 */
export const finishGame = elapsedTime => (dispatch, getState) => {
  const { game: { highScore, selectedLevel } } = getState();
  const currentHighScore = highScore[selectedLevel];
  dispatch({
    type: FINISH_GAME,
    payload: {
      elapsedTime,
      highScore:
        currentHighScore === 0 || elapsedTime < currentHighScore ? elapsedTime : currentHighScore,
    },
  });
  setTimeout(() => {
    dispatch(toggleModal('success'));
    dispatch(onPlay('success'));
  }, 600);
};

/**
 * Redux Thunk action
 * @param {string} payload - the name of the level
 */
export const selectLevel = payload => dispatch => {
  dispatch(resetGame());
  dispatch(toggleModal('start'));
  dispatch({ type: SELECT_LEVEL, payload });
  dispatch(shuffleCards(payload));
};

export default { loadInitialGameData, selectLevel, finishGame, resetGame, startGame };
