import React from 'react';
import PropTypes from 'prop-types';
import styles from './Card.module.css';


const CardBack = ({ condensed }) =>
  condensed ? (
    <div className={`${styles.card} ${styles.back}`} data-condensed />
  ) : (
    <div className={`${styles.card} ${styles.back}`} />
  );

CardBack.propTypes = { condensed: PropTypes.bool };

export default CardBack;
