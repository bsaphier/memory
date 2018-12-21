import { connect } from 'react-redux';
import { onPlay } from '../action-creators/sound';
// import { finishGame } from '../action-creators/game';
import getTimerStop from '../selectors/getTimerStop';
import Timer from '../components/Timer/Timer';


const mapStateToProps = state => ({
  running: state.game.playing,
  shouldStop: getTimerStop(state),
});

const mapDispatchToProps = dispatch => ({
  onTick: () => dispatch(onPlay('tick')),
  // onStopTimer: finalTime => dispatch(finishGame(finalTime)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
