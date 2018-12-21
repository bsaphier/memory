import { connect } from 'react-redux';
import { onPlay, onToggleSound } from '../action-creators/sound';
// import { selectTriples, selectLevel } from '../action-creators/game';
import GameToolbar from '../components/GameToolbar/GameToolbar';


const mapStateToProps = state => ({
  levels: state.game.levels,
  soundOff: state.game.mute,
  selectedLevel: state.game.selectedLevel,
});

const mapDispatchToProps = dispatch => ({
  onHover: () => dispatch(onPlay('glassClick')),
  onMute: () => dispatch(onToggleSound()),
  onSelectTriples: levelName => {
    dispatch(onPlay('keyboard'));
    // dispatch(selectTriples()).then(() => {
    //   dispatch(selectLevel(levelName));
    // });
  },
  onSelectLevel: levelName => {
    dispatch(onPlay('keyboard'));
    // dispatch(selectLevel(levelName));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(GameToolbar);
