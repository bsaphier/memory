import axios from 'axios';
import {
  SELECT_LEVEL,
  LOAD_TRIPLES,
  FINISH_GAME,
  RESET_GAME,
  START_GAME,
  LOAD_GAME,
} from '../action-types';
import { dataLoading, dataLoaded } from './status';
import { shuffleCards } from './cards';
import { toggleModal } from './modals';
import { onPlay } from './sound';


// these should really be an environment variable
const endpoint = 'https://cards.json';
const triplesEndpoint = 'https:///triples.json';

let cardId = 0;
export const resetCardId = () => {
  /** this function is only needed for testing - otherwise it could just be reassigned inline, below */
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

export const loadInitialGameData = () => dispatch => {
  const dataType = 'cards';
  dispatch(dataLoading(dataType)); // make the state aware that the data is loading
  return axios
    .get(endpoint)
    .then(({ data }) => {
      dispatch({ type: LOAD_GAME, payload: parseCardData(data) });
    })
    .catch(console.error) // error handling should be better than just logging to the console
    .then(() => dispatch(dataLoaded(dataType))); // even if there is an error, make the state aware that the data has finished loading
};

/**
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

export const selectTriples = () => dispatch => {
  const dataType = 'cards';
  dispatch(dataLoading(dataType)); // make the state aware that the data is loading
  return axios
    .get(triplesEndpoint)
    .then(({ data }) => {
      const cardsById = {};
      const cards = parseCards(data.cards);
      cards.forEach(card => (cardsById[card.id] = card));
      dispatch({ type: LOAD_TRIPLES, payload: { cards, cardsById } });
    })
    .catch(console.error) // error handling should be better than just logging to the console
    .then(() => dispatch(dataLoaded(dataType))); // even if there is an error, make the state aware that the data has finished loading
}

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
