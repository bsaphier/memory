import React from 'react';
import PropTypes from 'prop-types';
import styles from './Card.module.css';


const CardFront = props => {
  const className = `${styles.card} ${styles.front} ${props.empty ? styles.highlighted : ''}`;
  return props.condensed ? (
    <div className={className} data-condensed>
      {props.symbol}
    </div>
  ) : (
    <div className={className}>{props.symbol}</div>
  );
};

CardFront.propTypes = {
  condensed: PropTypes.bool,
  symbol: PropTypes.string,
  empty: PropTypes.bool,
};

export default CardFront;
