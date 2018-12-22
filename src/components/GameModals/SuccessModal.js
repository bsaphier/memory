import React from 'react';
import PropTypes from 'prop-types';
import ModalContent from '../Modal/ModalContent';
import ModalAction from '../Modal/ModalAction';
import ModalTitle from '../Modal/ModalTitle';
import Modal from '../Modal/Modal';


const timeBuffer = {
  easy: 15,
  hard: 30,
  triples: 45,
};
const messages = {
  newBest: { title: 'Great Job!', content: 'And you beat your best time!' },
  default: { title: 'Nice work.', content: 'Can you do better?' },
  bad: { title: 'You can do better.', content: 'You have done much better in the past.' },
};

class SuccessModal extends React.Component {
  message = {}

  componentDidUpdate(prevProps) {
    const { time, level, highScore } = this.props;
    if (time > highScore + timeBuffer[level]) {
      this.message = messages.bad;
    } else if (time === highScore && prevProps.highScore > highScore) {
      this.message = messages.newBest;
    } else {
      this.message = messages.default;
    }
  }

  render() {
    const { time, active = false, onClose, onPlayAgain } = this.props;
    return (
      <Modal active={active} onClose={onClose}>
        <ModalTitle>{this.message.title}</ModalTitle>
        <ModalContent>
          <span style={{ display: 'block', marginBottom: '.5em' }}>
            {`You found all the matching cards in ${time} seconds.`}
          </span>
          <span style={{ display: 'block' }}>{this.message.content}</span>
        </ModalContent>
        <ModalAction action={onPlayAgain} focus={active}>
          {'Play Again'}
        </ModalAction>
      </Modal>
    );
  }
}

SuccessModal.propTypes = {
  time: PropTypes.number,
  active: PropTypes.bool,
  level: PropTypes.string,
  onClose: PropTypes.func,
  highScore: PropTypes.number,
  onPlayAgain: PropTypes.func,
};

export default SuccessModal;
