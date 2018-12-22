import React from 'react';
import PropTypes from 'prop-types';
import ModalContent from '../Modal/ModalContent';
import ModalAction from '../Modal/ModalAction';
import ModalTitle from '../Modal/ModalTitle';
import Modal from '../Modal/Modal';


const instructions = {
  default: [
    'Select two cards.',
    'Continue until all matches are found.',
    'Try to beat your best time!',
  ],
  triples: [
    'Select three cards.',
    'Continue until all matches are found.',
    'Try to beat your best time!',
  ],
};

const NewGameModal = ({ level, active = false, onStartGame }) => (
  <Modal active={active}>
    <ModalTitle>{'Ready?'}</ModalTitle>
    <ModalContent>
      <div style={{ marginBottom: '1em' }}>
        <b>{'Instructions'}</b>
      </div>
      {instructions[level === 'triples' ? level : 'default'].map((line, idx) => (
        <div
          key={`instrucLine${+idx}`}
          style={{
            textAlign: 'start',
            fontSize: '0.9em',
            marginBottom: '8px',
            padding: '0 2em',
          }}
        >
          <b style={{ marginRight: '1em' }}>{`${idx + 1})`}</b>
          <span>{line}</span>
        </div>
      ))}
      <div style={{ marginTop: '1.5em' }}>
        {'Click \'Begin\' when you are ready to start playing.'}
      </div>
    </ModalContent>
    <ModalAction action={onStartGame}>{'Begin'}</ModalAction>
  </Modal>
)

NewGameModal.propTypes = {
  active: PropTypes.bool,
  level: PropTypes.string,
  onStartGame: PropTypes.func,
};

export default NewGameModal;
