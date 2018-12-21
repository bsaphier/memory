import React from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';


const Modal = ({ active, onClose, onHover = () => {}, children }) => {
  const containerStyle = active ? `${styles.modal} ${styles.active}` : styles.modal;
  return (
    <div className={containerStyle}>
      <div className={styles.contentWrapper}>{children}</div>
      {onClose ? (
        <div
          role="presentation"
          className={styles.closeButton}
          onClick={onClose}
          onMouseEnter={onHover}
        >
          {'×'}
        </div>
      ) : null}
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func,
  onHover: PropTypes.func,
  active: PropTypes.bool.isRequired,
};

export default Modal;
