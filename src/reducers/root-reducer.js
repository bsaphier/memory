import { combineReducers } from 'redux';
import { webAudioReducer } from 'react-redux-webaudio';
import statusReducer from './status-reducer';
import gameReducer from './game-reducer';
import cardsReducer from './cards-reducer';
import modalsReducer from './modals-reducer';

export default combineReducers({
  status: statusReducer,
  game: gameReducer,
  cards: cardsReducer,
  modals: modalsReducer,
  webAudioReducer,
});
