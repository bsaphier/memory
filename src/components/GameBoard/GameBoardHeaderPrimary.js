import React from 'react';
import PropTypes from 'prop-types';
import volumeOffUrl from '../../assets/icons/baseline-volume_off-24px.svg';
import volumeOnUrl from '../../assets/icons/baseline-volume_up-24px.svg';
import Timer from '../../containers/Timer';
import LabeledValue from '../LabeledValue/LabeledValue';
import { Time } from '../Timer/Timer';
import Icon from '../Icon/Icon';
import styles from './GameBoard.module.css';


const GameBoardHeaderPrimary = ({ soundOff, highScore, muteTimer, className, onTimerMute }) => (
  <div className={className}>
    <LabeledValue label="Elapsed Time" labelShort="Time" style={{ position: 'relative' }}>
      <div className={styles.timerWrapper}>
        <Timer mute={muteTimer} />
        <button className={styles.muteTimerButton} onClick={onTimerMute} disabled={soundOff}>
          <Icon src={muteTimer || soundOff ? volumeOffUrl : volumeOnUrl} />
        </button>
      </div>
    </LabeledValue>
    <LabeledValue label="Best Time" labelShort="Best">
      <Time time={highScore || 0} />
    </LabeledValue>
  </div>
);

GameBoardHeaderPrimary.propTypes = {
  soundOff: PropTypes.bool,
  muteTimer: PropTypes.bool,
  highScore: PropTypes.number,
  className: PropTypes.string,
  onTimerMute: PropTypes.func,
};

export default GameBoardHeaderPrimary;
