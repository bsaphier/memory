import axios from 'axios';
import { actionCreators } from 'react-redux-webaudio';
import { TOGGLE_SOUND } from '../action-types';
import { dataLoading, dataLoaded } from './status';
import tickUrl from '../assets/audio/watch_tick.wav';
import cardDragUrl from '../assets/audio/card_drag.wav';
import cardFlipUrl from '../assets/audio/card_flip.wav';
import cardTouchUrl from '../assets/audio/card_touch.wav';
import successUrl from '../assets/audio/success_2.wav';
import keyboardUrl from '../assets/audio/keyboard.wav';
import typewriterUrl from '../assets/audio/typewriter.wav';
import glassClickUrl from '../assets/audio/glass_click.wav';

/**
 * A class to manage audio sources
 */
export class SourceManager {
  /**
   * Create a reference to a data source
   * @param {Object} source
   * @param {string} source.name
   * @param {ArrayBuffer} source.data
   */
  addSource(source) {
    this[source.name] = source.data;
  }

  /**
   * Create an audio event as defined by: https://bsaphier.github.io/react-redux-webaudio/
   * @param {string} name the name of the source to play
   */
  playSound(name) {
    return (audioCtx, getCurrentTime) => {
      const bufferSource = audioCtx.createBufferSource();
      audioCtx
        .decodeAudioData(this[name].slice(0))
        .then(buffer => {
          bufferSource.buffer = buffer;
          bufferSource.connect(audioCtx.destination);
          bufferSource.start(0);
          bufferSource.stop(getCurrentTime() + 3);
        })
        .catch(e => `Error with decoding audio data ${e.err}`);
    };
  }
}

const { emit } = actionCreators;
const sourceManager = new SourceManager();


/**
 * Thunk action that loads all the audio sources
 */
export const preLoadAudio = () => dispatch => {
  const dataType = 'audio';
  dispatch(dataLoading(dataType)); // make the state aware that the data is loading
  
  const requests = [
    { name: 'tick', req: axios.get(tickUrl, { responseType: 'arraybuffer' }) },
    { name: 'success', req: axios.get(successUrl, { responseType: 'arraybuffer' }) },
    { name: 'cardDrag', req: axios.get(cardDragUrl, { responseType: 'arraybuffer' }) },
    { name: 'keyboard', req: axios.get(keyboardUrl, { responseType: 'arraybuffer' }) },
    { name: 'cardFlip', req: axios.get(cardFlipUrl, { responseType: 'arraybuffer' }) },
    { name: 'cardTouch', req: axios.get(cardTouchUrl, { responseType: 'arraybuffer' }) },
    { name: 'glassClick', req: axios.get(glassClickUrl, { responseType: 'arraybuffer' }) },
    { name: 'typewriter', req: axios.get(typewriterUrl, { responseType: 'arraybuffer' }) },
  ];

  return Promise.all(requests.map(request => request.req))
    .then(responses =>
      responses.forEach(({ data }, idx) => {
        sourceManager.addSource({ data, name: requests[idx].name });
      })
    )
    .catch(console.error) // error handling should be better than just logging to the console
    .then(() => dispatch(dataLoaded(dataType))); // even if there is an error, make the state aware that the data has finished loading
};

/**
 * @typedef { 'success' | 'cardDrag' | 'keyboard' | 'cardFlip' | 'cardTouch' | 'glassClick' | 'typewriter' | 'tick' } Sound
 * @param {Sound} sound - the name of the sound to play
 */
export const onPlay = sound => (dispatch, getState) => {
  const { game } = getState();
  if (!game.mute) {
    dispatch(emit(sourceManager.playSound(sound)));
  }
};

/**
 * mute/un-mute all sound
 */
export const onToggleSound = () => ({ type: TOGGLE_SOUND });

export default { onPlay, preLoadAudio, onToggleSound };
