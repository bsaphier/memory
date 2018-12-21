import {
  CARDS_DID_NOT_MATCH,
  CARDS_DID_MATCH,
  SHUFFLE_CARDS,
  LOAD_TRIPLES,
  SELECT_CARD,
  RESET_GAME,
  LOAD_GAME,
} from '../action-types';

const initialState = {
  cardsByLevel: {},
  cardsById: {},
  matches: [],
  selectedCards: [],
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SELECT_CARD:
      return {
        ...state,
        selectedCards: state.selectedCards.concat(payload)
      };

    case CARDS_DID_MATCH:
      return {
        ...state,
        selectedCards: [],
        matches: state.matches.concat([payload])
      };

    case CARDS_DID_NOT_MATCH:
      return { ...state, selectedCards: [] };

    case SHUFFLE_CARDS:
      return {
        ...state,
        cardsByLevel: {
          ...state.cardsByLevel,
          [payload.level]: payload.shuffledCards
        }
      };

    case LOAD_GAME:
      return {
        ...state,
        cardsById: payload.cardsById,
        cardsByLevel: payload.cardsByLevel
      };

    case RESET_GAME:
      return {
        ...state,
        matches: [],
        selectedCards: []
      };

    case LOAD_TRIPLES:
      return {
        ...state,
        cardsById: {
          ...state.cardsById,
          ...payload.cardsById
        },
        cardsByLevel: {
          ...state.cardsByLevel,
          triples: payload.cardsByLevel
        }
      };

    default:
      return { ...state };
  }
}
