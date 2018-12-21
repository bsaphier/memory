import {
  SELECT_LEVEL,
  FINISH_GAME,
  RESET_GAME,
  START_GAME,
  LOAD_GAME,
  TOGGLE_SOUND,
} from '../action-types';

const initialState = {
  levels: [],
  mute: false,
  selectedLevel: '',
  playing: false,
  secondsElapsed: 0,
  highScore: {
    easy: 0,
    hard: 0,
    triples: 0,
  },
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_GAME:
      return {
        ...state,
        levels: payload.levels
      };

    case START_GAME:
      return {
        ...state,
        playing: true
      };

    case RESET_GAME:
      return {
        ...state,
        playing: false,
        secondsElapsed: 0
      };

    case FINISH_GAME:
      return {
        ...state,
        playing: false,
        secondsElapsed: payload.elapsedTime,
        highScore: {
          ...state.highScore,
          [state.selectedLevel]: payload.highScore
        }
      };

    case SELECT_LEVEL:
      return {
        ...state,
        playing: false,
        selectedLevel: payload
      };

    case TOGGLE_SOUND:
      return {
        ...state,
        mute: !state.mute
      };

    default:
      return { ...state };
  }
};
