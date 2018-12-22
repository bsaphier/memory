import { connect } from 'react-redux';
import { onPlay } from '../action-creators/sound';
import { resetGame } from '../action-creators/game';
import { toggleModal } from '../action-creators/modals';
import SuccessModal from '../components/GameModals/SuccessModal';


const modalId = 'success';

const mapStateToProps = state => ({
  active: state.modals[modalId],
  time: state.game.secondsElapsed,
  level: state.game.selectedLevel,
  highScore: state.game.highScore[state.game.selectedLevel],
});

const mapDispatchToProps = dispatch => ({
  onClose: () => {
    dispatch(onPlay('typewriter'));
    dispatch(toggleModal(modalId));
  },
  onPlayAgain: () => {
    dispatch(onPlay('typewriter'));
    dispatch(resetGame());
    dispatch(toggleModal(modalId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SuccessModal);
