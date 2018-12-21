import React from 'react';
import PropTypes from 'prop-types';


const GameBoardHeaderSecondary = ({ cardTotal, matchTotal, className, isTriples }) => (
  <div className={className}>
    <span>
      {'You have found'}
      <b>{` ${matchTotal} of ${cardTotal / (isTriples ? 3 : 2)} `}</b>
      {'matches'}
    </span>
  </div>
);

GameBoardHeaderSecondary.propTypes = {
  isTriples: PropTypes.bool,
  cardTotal: PropTypes.number,
  className: PropTypes.string,
  matchTotal: PropTypes.number,
};

export default GameBoardHeaderSecondary;
