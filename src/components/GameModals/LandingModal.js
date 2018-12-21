import React from 'react';
import PropTypes from 'prop-types';
import ModalContent from '../Modal/ModalContent';
import ModalAction from './../Modal/ModalAction';
import ModalTitle from '../Modal/ModalTitle';
import Modal from '../Modal/Modal';


const LandingModal = ({ active = false, loading, onLoadGameData }) => (
  <Modal active={active}>
    <ModalTitle>{'Welcome!'}</ModalTitle>
    <ModalContent>
      {loading
        ? 'Please wait while the game data loads...'
        : 'To start a new game, dismiss this message and select a difficulty from the toolbar.'}
    </ModalContent>
    <ModalAction action={onLoadGameData} disabled={loading}>
      {'Dismiss'}
    </ModalAction>
  </Modal>
);

LandingModal.propTypes = {
  active: PropTypes.bool,
  loading: PropTypes.bool,
  onLoadGameData: PropTypes.func,
};

export default LandingModal;
