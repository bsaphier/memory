import React from 'react';
import PropTypes from 'prop-types';
import styles from './Timer.module.css';


export const formatTime = time => {
  if (time < 0) return '--:--';
  const minute = Math.floor((time % 3600) / 60);
  const second = time % 60;
  const hour = Math.floor(time / 3600);
  const ss = second < 10 ? `0${second}` : second;
  const mm = minute < 10 ? `0${minute}` : minute;
  return hour > 0
    ? `${hour}:${mm}:${ss}`
    : `${minute}:${ss}`;
};

export const Time = ({ time }) => <div className={styles.timer}>{formatTime(time)}</div>;

Time.propTypes = { time: PropTypes.number };

class Timer extends React.Component {
  state = { secondsElapsed: 0 };

  startTimer = () => {
    this.interval = setInterval(this.tick, 1000);
  }

  stopTimer = () => {
    clearInterval(this.interval);
    if (this.props.onStopTimer) {
      this.props.onStopTimer(this.state.secondsElapsed);
    }
    this.setState({ secondsElapsed: 0 });
  }

  hardStopTimer = () => {
    clearInterval(this.interval);
    this.setState({ secondsElapsed: 0 });
  }

  tick = () => {
    const { mute, onTick = () => { } } = this.props;
    this.setState({ secondsElapsed: this.state.secondsElapsed + 1 });
    if (!mute) onTick();
  }

  componentDidUpdate(prevProps) {
    const { running, shouldStop } = this.props;
    if (!prevProps.running && running) {
      this.startTimer();
    }
    if (prevProps.running && !running) {
      this.hardStopTimer();
    }
    if (running && shouldStop) {
      this.stopTimer();
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return <Time time={this.state.secondsElapsed} />;
  }
}

Timer.propTypes = {
  mute: PropTypes.bool,
  onTick: PropTypes.func,
  shouldStop: PropTypes.bool,
  onStopTimer: PropTypes.func,
  running: PropTypes.bool.isRequired,
};

export default Timer;
