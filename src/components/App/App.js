import React from 'react';
import { Provider } from 'react-redux';
import { RRWAEngine } from 'react-redux-webaudio';
import { preLoadAudio } from '../../action-creators/sound';
import Game from '../Game/Game';
import store from '../../store';


const App = () => {
  /**
   * Start fetching the audio data before anything is rendered
   */
  store.dispatch(preLoadAudio());
  
  return (
    <Provider store={store}>
      {/**
        * server-side rendering would crash the RRWAEngine
        * so only render if the window object is available
        */
      global.window ? <RRWAEngine store={store} /> : null}
      <Game />
    </Provider>
  );
};

export default App;
